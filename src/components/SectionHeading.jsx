function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl space-y-3">
      {eyebrow && <p className="text-sm uppercase tracking-[0.35em] text-current/70">{eyebrow}</p>}
      {title && <h2 className="text-3xl font-semibold font-serif tracking-tight text-current sm:text-4xl">{title}</h2>}
      {description && <p className="text-base leading-8 text-current/70">{description}</p>}
    </div>
  );
}

export default SectionHeading;
