import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';

function ContactPage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden bg-slate-950 py-24">
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-1 bg-red" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
            <p className="text-sm uppercase tracking-[0.35em] text-red">Contact us</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Let's create a secure and luxurious environment together.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Connect with WOV SECURITY for bespoke CCTV design, priority service, and premium security consultation tailored to your most refined spaces.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="space-y-10 rounded-[40px] border border-slate-800/80 bg-slate-950 p-6 sm:p-8 md:p-10 shadow-luxe">
            <SectionHeading
              eyebrow="Connect with us"
              title="Send a message and our luxury security team will respond within 24 hours."
              description="We specialize in high-end CCTV installations, executive monitoring, and end-to-end security planning for premium venues."
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[28px] border border-red/10 bg-slate-900 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.30em] text-red">Email</p>
                <p className="mt-3 text-lg font-semibold text-white">contact@wovsecurity.com</p>
                <p className="mt-2 text-sm text-slate-400">Priority response for executive clients.</p>
              </div>
              <div className="rounded-[28px] border border-red/10 bg-slate-900 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.30em] text-red">Phone</p>
                <p className="mt-3 text-lg font-semibold text-white">+1 800 555 0199</p>
                <p className="mt-2 text-sm text-slate-400">White-glove scheduling and support.</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[28px] border border-slate-700 bg-slate-900 px-6 py-7 shadow-sm">
                <p className="text-sm uppercase tracking-[0.30em] text-slate-400">Office hours</p>
                <p className="mt-4 text-xl font-semibold text-white">Mon - Fri, 9am - 6pm</p>
              </div>
              <div className="rounded-[28px] border border-slate-700 bg-slate-900 px-6 py-7 shadow-sm">
                <p className="text-sm uppercase tracking-[0.30em] text-slate-400">Service area</p>
                <p className="mt-4 text-xl font-semibold text-white">Global appointments available</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="rounded-[40px] border border-slate-200/80 bg-black p-6 sm:p-8 md:p-10 text-white shadow-glow">
            <div className="rounded-[32px] border border-red/20 bg-black/80 p-6 sm:p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-red">Submit an inquiry</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Begin your secure project.</h2>
              <p className="mt-4 text-slate-400">Share a few details and our team will craft a tailored assessment for your space.</p>
            </div>
            <form className="mt-10 grid gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none transition focus:border-red focus:ring-2 focus:ring-red/20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none transition focus:border-red focus:ring-2 focus:ring-red/20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Phone</label>
                <input
                  type="tel"
                  placeholder="+1 800 555 0199"
                  className="w-full rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none transition focus:border-red focus:ring-2 focus:ring-red/20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Message</label>
                <textarea
                  rows="5"
                  placeholder="Tell us about your project, space, or timeline."
                  className="w-full rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none transition focus:border-red focus:ring-2 focus:ring-red/20"
                />
              </div>
              <button type="submit" className="inline-flex items-center justify-center rounded-full bg-red px-8 py-4 text-sm font-semibold text-white transition hover:bg-red-600">
                Send inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 xl:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-luxe">
            <p className="text-sm uppercase tracking-[0.30em] text-red">Schedule</p>
            <p className="mt-4 text-3xl font-semibold text-black">Priority consultation</p>
            <p className="mt-3 text-slate-600">Reserve a dedicated session with our security architects to discuss your project scope.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.1 }} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-luxe">
            <p className="text-sm uppercase tracking-[0.30em] text-red">Locations</p>
            <p className="mt-4 text-3xl font-semibold text-black">Global service</p>
            <p className="mt-3 text-slate-600">We support installations, reviews, and remote planning across luxury properties worldwide.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2 }} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-luxe">
            <p className="text-sm uppercase tracking-[0.30em] text-red">Support</p>
            <p className="mt-4 text-3xl font-semibold text-black">24/7 response</p>
            <p className="mt-3 text-slate-600">Our support team is ready to assist your security needs at any stage of the project.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
