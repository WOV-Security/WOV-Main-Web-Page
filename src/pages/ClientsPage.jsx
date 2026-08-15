import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import { fetchClients } from '../utils/api.js';

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchClients()
      .then((data) => {
        if (mounted) {
          setClients(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Unable to load client roster');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden bg-slate-950 py-24">
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-black/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="text-sm uppercase tracking-[0.35em] text-red">Clients</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Trusted by premium brands and elite operators.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Our clients rely on WOV SECURITY for discreet, high-performance security systems.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Client roster"
          title="A select list of clients who trust our luxury security expertise."
          description="These names represent the premium venues, residences, and executive spaces we support with tailored security solutions."
        />
        {loading ? (
          <div className="mt-12 rounded-[32px] border border-slate-700 bg-slate-900/80 p-16 text-center text-slate-300">
            Loading client roster…
          </div>
        ) : error ? (
          <div className="mt-12 rounded-[32px] border border-slate-700 bg-slate-900/80 p-16 text-center text-red-300">
            {error}
          </div>
        ) : (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
                className="rounded-[32px] border border-slate-700 bg-slate-900/80 px-8 py-10 text-center shadow-glow"
              >
                <p className="text-lg font-semibold text-white">{client.name}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{client.role}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ClientsPage;
