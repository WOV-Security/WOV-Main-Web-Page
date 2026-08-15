import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import { fetchSolutions } from '../utils/api.js';

function SolutionsPage() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchSolutions()
      .then((data) => {
        if (mounted) {
          setSolutions(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Unable to load solutions');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-red">Solutions</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Loading solutions…</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">Connecting to the site content server.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-red">Solutions</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Unable to load solutions.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden bg-slate-950 py-24">
        <div className="absolute right-0 top-12 h-80 w-80 rounded-full bg-black/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="text-sm uppercase tracking-[0.35em] text-red">Solutions</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Choose the security solution that fits your premium space.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Select a solution from the list below to view real projects, gallery imagery, and its application in luxury environments.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Solutions overview"
          title="Browse our specialized security solutions."
          description="Each solution leads to a dedicated page showcasing projects, descriptions, and premium installation imagery."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {solutions.map((solution, index) => {
            const project = solution.projects[0];
            const previewPhotos = project?.photos.slice(0, 5) || [];
            const [heroPhoto, ...thumbPhotos] = previewPhotos;
            const variant = index % 4;

            const renderMedia = () => {
              switch (variant) {
                case 1:
                  return (
                    <div className="grid gap-3 sm:grid-cols-[1fr_0.95fr]">
                      <div className="overflow-hidden rounded-[28px] bg-slate-950">
                        {heroPhoto ? (
                          <img src={heroPhoto} alt={project?.name || solution.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="h-72 bg-slate-800" />
                        )}
                      </div>
                      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                        {thumbPhotos.map((photo, thumbIndex) => (
                          <div key={photo + thumbIndex} className="overflow-hidden rounded-[24px] bg-slate-950 h-32">
                            <img src={photo} alt={`${project?.name || solution.title} photo ${thumbIndex + 1}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                case 2:
                  return (
                    <div className="grid gap-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {previewPhotos.slice(0, 4).map((photo, thumbIndex) => (
                          <div key={photo + thumbIndex} className="overflow-hidden rounded-[24px] bg-slate-950 h-32">
                            <img src={photo} alt={`${project?.name || solution.title} photo ${thumbIndex + 1}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                          </div>
                        ))}
                      </div>
                      <div className="overflow-hidden rounded-[28px] bg-slate-950">
                        {heroPhoto ? (
                          <img src={heroPhoto} alt={project?.name || solution.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="h-72 bg-slate-800" />
                        )}
                      </div>
                    </div>
                  );
                case 3:
                  return (
                    <div className="grid gap-3">
                      <div className="overflow-hidden rounded-[28px] bg-slate-950">
                        {heroPhoto ? (
                          <img src={heroPhoto} alt={project?.name || solution.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="h-72 bg-slate-800" />
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {thumbPhotos.slice(0, 3).map((photo, thumbIndex) => (
                          <div key={photo + thumbIndex} className="overflow-hidden rounded-[24px] bg-slate-950 h-28">
                            <img src={photo} alt={`${project?.name || solution.title} photo ${thumbIndex + 1}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                default:
                  return (
                    <div className="grid gap-3 sm:grid-cols-[1.6fr_0.9fr]">
                      <div className="overflow-hidden rounded-[28px] bg-slate-950">
                        {heroPhoto ? (
                          <img src={heroPhoto} alt={project?.name || solution.title} className="h-64 w-full object-cover sm:h-80 transition duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="h-64 sm:h-80 bg-slate-800" />
                        )}
                      </div>
                      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                        {thumbPhotos.map((photo, thumbIndex) => (
                          <div key={photo + thumbIndex} className="overflow-hidden rounded-[24px] bg-slate-950 h-32">
                            <img src={photo} alt={`${project?.name || solution.title} photo ${thumbIndex + 1}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
              }
            };

            return (
              <motion.div
                key={solution.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="group overflow-hidden rounded-[32px] border border-slate-700 bg-slate-900/80 shadow-glow transition hover:border-red hover:bg-slate-900"
              >
                <div className="p-8">
                  {renderMedia()}
                  <div className="space-y-4 border-t border-slate-700/80 pt-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-red">Featured project</p>
                    <h2 className="text-3xl font-semibold text-white">{solution.title}</h2>
                    <p className="text-slate-300">{project?.summary || solution.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                      <span>{project?.name}</span>
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-red" />
                      <span>{previewPhotos.length} premium photos</span>
                    </div>
                    <Link
                      to={`/solutions/${solution.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-red hover:text-slate-950"
                    >
                      View projects
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default SolutionsPage;
