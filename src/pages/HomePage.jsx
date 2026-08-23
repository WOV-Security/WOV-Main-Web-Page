import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import { fetchHomeProjects, fetchSettings } from '../utils/api.js';

const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80';

const heroItems = [
  { label: '24/7 Surveillance', accent: 'Reliability' },
  { label: 'Executive Monitoring', accent: 'Discretion' },
  { label: 'AI Risk Detection', accent: 'Precision' }
];

const experienceItems = [
  {
    title: 'Bespoke Security Strategy',
    description: 'Tailored CCTV and access solutions designed for discreet luxury environments.'
  },
  {
    title: 'Premium Installation',
    description: 'White-glove execution that preserves the aesthetic of high-end venues.'
  },
  {
    title: 'Ongoing Elite Support',
    description: 'Dedicated monitoring and responsive consultation for executive operations.'
  }
];

const stats = [
  { value: '15+', label: 'Years experience' },
  { value: '70+', label: 'Clients served' },
  { value: '120+', label: 'Projects completed' }
];

const brands = [
  { name: 'Aether Concierge', logo: '/brands/aether-concierge.png' },
  { name: 'Noir Estates', logo: '/brands/noir-estates.png' },
  { name: 'Vantage Hospitality', logo: '/brands/vantage-hospitality.png' },
  { name: 'Meridian Residences', logo: '/brands/meridian-residences.png' },
  { name: 'Solstice Group', logo: '/brands/solstice-group.png' },
  { name: 'Crestwood Holdings', logo: '/brands/crestwood-holdings.png' }
];

const feedbacks = [
  {
    client: 'Aether Concierge',
    quote: '“The installation is flawless, and the monitoring feels effortless.”'
  },
  {
    client: 'Noir Estates',
    quote: '�WOV SECURITY understands luxury spaces and makes protection feel premium.�'
  }
];

function HomePage() {
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchSettings()
      .then((data) => {
        if (mounted && data.heroImage) setHeroImage(data.heroImage);
      })
      .catch(() => {});
    fetchHomeProjects()
      .then((data) => {
        if (mounted) setProjects(data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(209,31,38,0.2),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.4),transparent_30%)] opacity-90" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="space-y-10"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-red">Luxury security designed for refined spaces</p>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Executive CCTV and premium security for elite venues.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                WOV SECURITY delivers tailored surveillance experiences with discreet design, intelligent performance, and white-glove service.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#experience" className="inline-flex items-center justify-center rounded-full bg-red px-8 py-4 text-sm font-semibold text-white transition hover:bg-red-600">
                  View experience
                </a>
                <a href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-900">
                  Contact us
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {heroItems.map((item) => (
                  <motion.div key={item.label} whileHover={{ y: -8 }} className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 text-sm shadow-glow transition">
                    <p className="uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                    <p className="mt-4 text-xl font-semibold text-white">{item.accent}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
              <div className="relative overflow-hidden rounded-[40px] border border-slate-800 bg-slate-950 shadow-glow">
                <img
                  src={heroImage}
                  alt="Luxury CCTV installation"
                  className="h-[320px] w-full object-cover sm:h-[440px] lg:h-[560px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="rounded-[28px] border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
                    <p className="text-sm uppercase tracking-[0.35em] text-red">Signature environment</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white">A refined installation portfolio for premium spaces.</h2>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Experience"
          title="Expertise across luxury installs, executive monitoring, and elite support."
          description="From private residences to hospitality and VIP transport, we deliver tailored security that feels seamless and unobtrusive."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 text-center shadow-glow">
              <p className="text-4xl font-semibold text-white">{stat.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.35em] text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {experienceItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-8 shadow-glow"
            >
              <p className="text-sm uppercase tracking-[0.30em] text-red">{item.title}</p>
              <p className="mt-4 text-slate-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Our best projects"
          title="Showcasing the highest-impact security installations."
          description="A curated selection of work that highlights design, performance, and premium execution."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950/90 shadow-glow"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <p className="text-sm uppercase tracking-[0.30em] text-red">{project.title}</p>
                <p className="mt-4 text-slate-300">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Our brands"
          title="Trusted by leading names across luxury hospitality and residences."
          description="A snapshot of the premium brands who partner with WOV SECURITY for their protection needs."
        />
        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-950 to-transparent" />
          <div className="flex w-max animate-marquee gap-6">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex h-28 w-56 flex-shrink-0 items-center justify-center rounded-[24px] border border-slate-800 bg-slate-950/90 px-8 shadow-glow"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
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
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="rounded-[40px] border border-slate-800 bg-slate-950/90 p-10 shadow-glow">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Client feedback</p>
              <h2 className="mt-4 text-4xl font-semibold text-white">Trusted by premium clients.</h2>
            </div>
            <div className="space-y-4 text-slate-300">
              {feedbacks.map((feedback) => (
                <div key={feedback.client} className="rounded-[28px] border border-slate-800 bg-slate-950 p-6">
                  <p className="font-semibold text-white">{feedback.client}</p>
                  <p className="mt-3 text-slate-300">{feedback.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
