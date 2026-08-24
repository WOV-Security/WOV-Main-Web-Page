import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import BrandMarquee from '../components/BrandMarquee.jsx';
import Marquee from '../components/Marquee.jsx';
import { fetchHomeProjects, fetchSettings, fetchFeedbacks } from '../utils/api.js';

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
    description: 'White glove execution that preserves the aesthetic of high end venues.'
  },
  {
    title: 'Ongoing Elite Support',
    description: 'Dedicated monitoring and responsive consultation for executive operations.'
  }
];

const stats = [
  { value: '10+', label: 'Years experience' },
  { value: '800+', label: 'Clients served' },
  { value: '1000+', label: 'Projects completed' }
];

const brands = [
  { name: 'Hikvision', logo: 'https://res.cloudinary.com/dtscqhcop/image/upload/e_trim/v1787585611/hikvision_lzpcg6.png' },
  { name: 'EZVIZ', logo: 'https://res.cloudinary.com/dtscqhcop/image/upload/e_trim/v1787585611/ezviz_gr07pz.png' },
  { name: 'Tiandy', logo: 'https://res.cloudinary.com/dtscqhcop/image/upload/e_trim/v1787585611/tiandy_xznkpo.png' },
  { name: 'Karassn', logo: 'https://res.cloudinary.com/dtscqhcop/image/upload/e_trim/v1787585611/karassn_pg4c3k.jpg' },
  { name: 'Uniarch', logo: 'https://res.cloudinary.com/dtscqhcop/image/upload/e_trim/v1787585612/uniarch_wc0uo1.jpg' },
  { name: 'Dahua', logo: 'https://res.cloudinary.com/dtscqhcop/image/upload/e_trim/v1787585611/dahua_k6jddm.png' },
  { name: 'TP LINK', logo: 'https://res.cloudinary.com/dtscqhcop/image/upload/e_trim/v1787585611/tplink_d2qyef.png' }
];

function HomePage() {
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE);
  const [projects, setProjects] = useState([]);
  const [apiFeedbacks, setApiFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackError, setFeedbackError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

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
    fetchFeedbacks()
      .then((data) => {
        if (mounted) {
          setApiFeedbacks(data);
          setFeedbackLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setFeedbackError(err.message || 'Failed to load feedbacks');
          setFeedbackLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (apiFeedbacks.length < 2) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % apiFeedbacks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [apiFeedbacks.length]);

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
                  className="h-[420px] w-full object-cover sm:h-[440px] lg:h-[560px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                  <div className="rounded-[20px] border border-white/10 bg-black/70 p-4 backdrop-blur-xl sm:rounded-[28px] sm:p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-red sm:text-sm sm:tracking-[0.35em]">Signature environment</p>
                    <h2 className="mt-2 text-lg font-semibold text-white sm:mt-4 sm:text-3xl">A refined installation portfolio for premium spaces.</h2>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Experience" />
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
        <SectionHeading eyebrow="Our best projects" />
        <div className="mt-12">
          <Marquee
            items={projects}
            itemKey={(project, index) => `${project.id}-${index}`}
            renderItem={(project, index, key) => (
              <div
                key={key}
                className="group w-72 flex-shrink-0 overflow-hidden rounded-[24px] border border-slate-800 bg-slate-950/90 shadow-glow sm:w-96 sm:rounded-[32px]"
              >
                <div className="relative h-40 overflow-hidden sm:h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    draggable={false}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-red sm:text-sm sm:tracking-[0.30em]">{project.title}</p>
                  <p className="mt-3 text-sm text-slate-300 sm:mt-4 sm:text-base">{project.description}</p>
                </div>
              </div>
            )}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Our brands"
          title="Trusted by leading names across luxury hospitality and residences."
          description="Premium brands that trust WOV SECURITY."
        />
        <div className="mt-12">
          <BrandMarquee brands={brands} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="rounded-[40px] border border-slate-800 bg-slate-950/90 p-10 shadow-glow">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* Left: heading */}
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Client feedback</p>
              <h2 className="mt-4 text-4xl font-semibold text-white">Trusted by premium clients.</h2>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                Real experiences shared by the partners and clients who trust WOV SECURITY to protect what matters most.
              </p>
              {/* Dot navigation */}
              {!feedbackLoading && !feedbackError && apiFeedbacks.length > 1 && (
                <div className="mt-8 flex gap-2">
                  {apiFeedbacks.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      aria-label={`Go to feedback ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        i === activeSlide
                          ? 'w-8 bg-red'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: slider */}
            <div className="relative overflow-hidden">
              {/* Loading skeleton */}
              {feedbackLoading && (
                <div className="space-y-4">
                  {[0, 1].map((i) => (
                    <div key={i} className="animate-pulse rounded-[28px] border border-slate-800 bg-slate-900 p-6">
                      <div className="h-4 w-1/3 rounded bg-slate-700" />
                      <div className="mt-4 h-3 w-full rounded bg-slate-800" />
                      <div className="mt-2 h-3 w-4/5 rounded bg-slate-800" />
                    </div>
                  ))}
                </div>
              )}

              {/* Error state */}
              {feedbackError && !feedbackLoading && (
                <div className="rounded-[28px] border border-red/30 bg-red/10 p-8 text-center">
                  <p className="text-sm uppercase tracking-widest text-red">Unable to load</p>
                  <p className="mt-2 text-slate-400 text-sm">{feedbackError}</p>
                </div>
              )}

              {/* Slider cards */}
              {!feedbackLoading && !feedbackError && apiFeedbacks.length > 0 && (
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {apiFeedbacks.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="min-w-full"
                    >
                      <motion.div
                        layout
                        className="rounded-[28px] border border-slate-800 bg-slate-950 p-8 shadow-glow"
                      >
                        {/* Quote icon */}
                        <svg className="mb-4 h-8 w-8 text-red opacity-70" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M10 8C5.6 8 2 11.6 2 16c0 4.4 3.6 8 8 8 1 0 2-.2 2.8-.6C11.6 25.2 10 27.4 10 30h4c0-3.4 2.6-6 6-6v-4c-2.2 0-4.2.9-5.6 2.4C13.6 21.6 14 20.8 14 20c0-3.4-2-6.4-4-8V8zm16 0c-4.4 0-8 3.6-8 8 0 4.4 3.6 8 8 8 1 0 2-.2 2.8-.6C27.6 25.2 26 27.4 26 30h4c0-3.4 2.6-6 6-6v-4c-2.2 0-4.2.9-5.6 2.4C29.6 21.6 30 20.8 30 20c0-3.4-2-6.4-4-8V8z" />
                        </svg>
                        <p className="text-lg font-semibold text-white leading-snug">{feedback.title}</p>
                        <p className="mt-4 text-slate-300 leading-relaxed">{feedback.description}</p>
                        <div className="mt-6 flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red/20 text-red text-xs font-bold uppercase">
                            {feedback.title ? feedback.title.charAt(0) : 'F'}
                          </div>
                          <span className="text-xs uppercase tracking-[0.25em] text-slate-500">Verified client</span>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {!feedbackLoading && !feedbackError && apiFeedbacks.length === 0 && (
                <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-8 text-center">
                  <p className="text-slate-400 text-sm">No client feedback yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
