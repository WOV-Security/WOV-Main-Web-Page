import { useEffect, useRef, useState } from 'react';

const AUTO_SCROLL_SPEED = 0.6;
const RESUME_DELAY = 1500;

function Marquee({ items, renderItem, itemKey, gapClassName = 'gap-6' }) {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const resumeTimeout = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const loopItems = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let frameId;
    const step = () => {
      if (!isDragging.current && !isPaused) {
        const halfWidth = track.scrollWidth / 2;
        track.scrollLeft += AUTO_SCROLL_SPEED;
        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        } else if (track.scrollLeft < 0) {
          track.scrollLeft += halfWidth;
        }
      }
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, items.length]);

  const pauseAutoScroll = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    setIsPaused(true);
  };

  const scheduleResume = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isDragging.current || !trackRef.current) return;
      const delta = event.clientX - dragStartX.current;
      trackRef.current.scrollLeft = dragStartScroll.current - delta;
    };
    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      scheduleResume();
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (event) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    pauseAutoScroll();
    dragStartX.current = event.clientX;
    dragStartScroll.current = trackRef.current.scrollLeft;
  };

  return (
    <div className="relative overflow-hidden">
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={pauseAutoScroll}
        onTouchEnd={scheduleResume}
        onDragStart={(event) => event.preventDefault()}
        className={`flex cursor-grab select-none ${gapClassName} overflow-x-auto active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_6rem,black_calc(100%-6rem),transparent)] [mask-image:linear-gradient(to_right,transparent,black_6rem,black_calc(100%-6rem),transparent)]`}
      >
        {loopItems.map((item, index) => renderItem(item, index, itemKey ? itemKey(item, index) : index))}
      </div>
    </div>
  );
}

export default Marquee;
