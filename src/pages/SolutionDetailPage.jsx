import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import { fetchSolutionBySlug } from '../utils/api.js';

function SolutionDetailPage() {
  const { slug } = useParams();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchSolutionBySlug(slug)
      .then((data) => {
        if (mounted) {
          setSolution(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Unable to load solution');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-red">Solution</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">Loading solution details…</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">Please wait while the page loads.</p>
        </div>
      </div>
    );
  }

  if (error || !solution) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-red">Solution not found</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">We couldn&apos;t find that solution.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            {error || 'Please choose a solution from the dropdown menu or return to the solutions overview.'}
          </p>
          <Link
            to="/solutions"
            className="mt-10 inline-flex rounded-full bg-red px-8 py-4 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            View all solutions
          </Link>
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
            <p className="text-sm uppercase tracking-[0.35em] text-red">{solution.title}</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">{solution.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{solution.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Project examples"
          title={`Projects delivered for ${solution.title}`}
          description="Each project includes a name, short description, and a gallery of premium images from the installation."
        />

        <div className="mt-12 space-y-20">
          {solution.projects.map((project, projectIndex) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: projectIndex * 0.1 }}
              className="rounded-[40px] border border-slate-700 bg-slate-900/80 p-10 shadow-glow"
            >
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.35em] text-red">{project.name}</p>
                <h2 className="text-3xl font-semibold text-white">{project.name}</h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">{project.summary}</p>
              </div>
              <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {project.photos.map((photo) => (
                  <div key={photo} className="aspect-square w-full max-w-[240px] overflow-hidden rounded-[28px] shadow-xl">
                    <img
                      src={photo}
                      alt={`${project.name} photo`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SolutionDetailPage;
