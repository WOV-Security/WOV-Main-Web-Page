import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import { fetchReleases } from '../utils/api.js';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchReleases()
      .then((data) => {
        if (mounted) {
          setProducts(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Unable to load product releases');
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
            <p className="text-sm uppercase tracking-[0.35em] text-red">New Releases</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Latest security releases for elite environments.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Discover our newest security offerings with imagery, features, and curated details for luxury installations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Product showcase"
          title="Premium security products with powerful features and refined design."
          description="Each product is built for high-end spaces, delivering robust capability, elegant integration, and clear pricing."
        />
        {loading ? (
          <div className="mt-12 rounded-[32px] border border-slate-700 bg-slate-900/80 p-16 text-center text-slate-300">
            Loading products…
          </div>
        ) : error ? (
          <div className="mt-12 rounded-[32px] border border-slate-700 bg-slate-900/80 p-16 text-center text-red-300">
            {error}
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="rounded-[32px] border border-slate-700 bg-slate-900 p-0 shadow-glow"
              >
                <div className="overflow-hidden rounded-t-[32px]">
                  <img src={product.image} alt={product.title || product.name} className="h-56 w-full object-cover sm:h-64 lg:h-72" />
                </div>
                <div className="p-8">
                  <p className="text-sm uppercase tracking-[0.30em] text-red">{product.title}</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{product.price}</p>
                  <p className="mt-4 text-slate-300">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductsPage;
