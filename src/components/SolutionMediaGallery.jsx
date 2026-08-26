import { useRef } from 'react';

function ArrowButton({ direction, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll images left' : 'Scroll images right'}
      className={`absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-950/80 text-white shadow-lg backdrop-blur transition hover:bg-red hover:border-red active:scale-95 ${
        direction === 'left' ? 'left-2' : 'right-2'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        {direction === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}

function SolutionMediaGallery({ photos, altBase, desktopMedia }) {
  const scrollerRef = useRef(null);

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-carousel-item]');
    const step = card ? card.getBoundingClientRect().width + 12 : el.clientWidth * 0.85;
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile: horizontal scroll carousel with arrows */}
      <div className="relative sm:hidden">
        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {photos.map((photo, photoIndex) => (
            <div
              key={photo + photoIndex}
              data-carousel-item
              className="aspect-[4/3] w-[78%] flex-none overflow-hidden rounded-[24px] bg-slate-950"
              style={{ scrollSnapAlign: 'start' }}
            >
              <img
                src={photo}
                alt={`${altBase} photo ${photoIndex + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {photos.length > 1 && (
          <>
            <ArrowButton direction="left" onClick={() => scrollByCard('left')} />
            <ArrowButton direction="right" onClick={() => scrollByCard('right')} />
          </>
        )}
      </div>

      {/* Desktop / tablet: existing grid layouts */}
      <div className="hidden sm:block">{desktopMedia}</div>
    </>
  );
}

export default SolutionMediaGallery;
