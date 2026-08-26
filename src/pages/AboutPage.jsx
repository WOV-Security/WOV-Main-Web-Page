import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSettings } from '../utils/api.js';

const DEFAULT_ABOUT = {
  aboutPhoto: 'https://res.cloudinary.com/dtscqhcop/image/upload/v1785947761/WhatsApp_Image_2026-08-05_at_21.45.54_xz9ws6.jpg',
  aboutName: 'Dhanushka Sameera',
  aboutRole: 'Founder & Owner',
  aboutBio: 'The visionary leader of WOV SECURITY, focused on premium security design, discreet execution, and exceptional client experience.'
};

const experiences = [
  {
    label: 'Luxury installations',
    description: 'Delivered sophisticated security systems for high end residences, hospitality venues, and executive spaces.'
  },
  {
    label: 'Executive support',
    description: 'White glove consulting, discreet implementation, and ongoing management for premium clients.'
  },
  {
    label: 'Discreet integration',
    description: 'Security solutions that blend into refined interiors while maintaining uncompromised protection.'
  }
];

function AboutPage() {
  const [about, setAbout] = useState(DEFAULT_ABOUT);

  useEffect(() => {
    let mounted = true;
    fetchSettings()
      .then((data) => {
        if (!mounted) return;
        setAbout({
          aboutPhoto: data.aboutPhoto || DEFAULT_ABOUT.aboutPhoto,
          aboutName: data.aboutName || DEFAULT_ABOUT.aboutName,
          aboutRole: data.aboutRole || DEFAULT_ABOUT.aboutRole,
          aboutBio: data.aboutBio || DEFAULT_ABOUT.aboutBio
        });
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
        >
          <div className="rounded-[40px] border border-slate-800 bg-slate-950/90 p-10 shadow-glow">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="mx-auto h-72 w-full max-w-[300px] overflow-hidden rounded-[36px] border border-red/20 bg-slate-900">
                <img
                  src={about.aboutPhoto}
                  alt={about.aboutName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-red">{about.aboutRole}</p>
                <h1 className="mt-4 text-4xl font-semibold">{about.aboutName}</h1>
                <p className="mt-3 max-w-xl text-slate-300">
                  {about.aboutBio}
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-8 shadow-glow">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Vision</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Seamless security for the world’s most refined spaces.</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                We envision elite environments protected by thoughtful, elegant security systems that feel natural and completely reliable.
              </p>
            </div>
            <div className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-8 shadow-glow">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Mission</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Deliver discreet, high-performance security with unmatched service.</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Our mission is to design, deploy, and support luxury security systems that protect people, property, and privacy with absolute confidence.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 text-white">
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Experience</p>
            <h2 className="mt-4 text-4xl font-semibold">Proven experience in premium security delivery.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {experiences.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-8 shadow-glow"
              >
                <p className="text-sm uppercase tracking-[0.30em] text-red">{item.label}</p>
                <p className="mt-5 text-base leading-7 text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
