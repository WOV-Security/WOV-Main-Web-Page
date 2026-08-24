import Marquee from './Marquee.jsx';

function BrandMarquee({ brands }) {
  return (
    <Marquee
      items={brands}
      itemKey={(brand, index) => `${brand.name}-${index}`}
      renderItem={(brand, index, key) => (
        <div
          key={key}
          className="flex h-32 w-56 flex-shrink-0 items-center justify-center rounded-[24px] border border-slate-800 bg-white p-6 shadow-glow"
        >
          <img
            src={brand.logo}
            alt={brand.name}
            draggable={false}
            className="h-full w-full object-contain transition duration-300 hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
              event.currentTarget.nextElementSibling.style.display = 'block';
            }}
          />
          <span className="hidden text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            {brand.name}
          </span>
        </div>
      )}
    />
  );
}

export default BrandMarquee;
