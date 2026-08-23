import { useEffect, useRef, useState } from 'react';

const AUTO_SCROLL_SPEED = 0.6;
const RESUME_DELAY = 1500;

function BrandMarquee({ brands }) {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const resumeTimeout = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const items = [...brands, ...brands];

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
  }, [isPaused]);

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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-950 to-transparent" />
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={pauseAutoScroll}
        onTouchEnd={scheduleResume}
        onDragStart={(event) => event.preventDefault()}
        className="flex cursor-grab select-none gap-6 overflow-x-auto active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="flex h-28 w-56 flex-shrink-0 items-center justify-center rounded-[24px] border border-slate-800 bg-slate-950/90 px-8 shadow-glow"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              draggable={false}
              className="max-h-12 w-full object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                event.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
            <span className="hidden text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandMarquee;
