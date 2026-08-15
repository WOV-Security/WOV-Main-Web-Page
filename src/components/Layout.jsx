import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchSolutions } from '../utils/api.js';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'New Releases', href: '/products' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact us', href: '/contact' }
];

function Layout({ children }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const handleRouteChange = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setMenuOpen(false);
    setSolutionsOpen(false);
  };

  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    let mounted = true;
    fetchSolutions()
      .then((data) => {
        if (mounted) setSolutions(data);
      })
      .catch(() => {
        if (mounted) setSolutions([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="sticky top-0 z-50 border-b border-slate-700/80 bg-slate-950/95 backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-red" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" onClick={handleRouteChange} className="flex items-center gap-3 text-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-black text-lg font-semibold text-red shadow-glow">
              W
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">WOV SECURITY</p>
              <p className="text-sm font-semibold text-slate-100">Executive CCTV & Security</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 transition hover:border-red hover:text-red focus:outline-none md:hidden"
              aria-label="Toggle navigation"
            >
              <span className="block h-0.5 w-6 bg-current transition duration-300" />
              <span className="mt-1 block h-0.5 w-6 bg-current transition duration-300" />
              <span className="mt-1 block h-0.5 w-6 bg-current transition duration-300" />
            </button>
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.slice(0, 2).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={handleRouteChange}
                    className={`text-sm font-medium transition duration-300 ${isActive ? 'text-white underline decoration-red underline-offset-8 decoration-2' : 'text-slate-400 hover:text-white'}`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setSolutionsOpen((open) => !open)}
                  className={`text-sm font-medium transition duration-300 ${pathname.startsWith('/solutions') ? 'text-white underline decoration-red underline-offset-8 decoration-2' : 'text-slate-400 hover:text-white'}`}
                >
                  Solutions
                </button>
                {solutionsOpen && (
                  <div className="absolute left-0 top-full z-50 w-72 rounded-[28px] border border-slate-700 bg-slate-950/95 p-4 shadow-glow backdrop-blur-xl">
                    <Link
                      to="/solutions"
                      onClick={handleRouteChange}
                      className="block rounded-3xl px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-900"
                    >
                      All solutions
                    </Link>
                    <div className="mt-3 grid gap-2">
                      {solutions.length > 0 ? (
                        solutions.map((solution) => (
                          <Link
                            key={solution.slug}
                            to={`/solutions/${solution.slug}`}
                            onClick={handleRouteChange}
                            className="block rounded-3xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
                          >
                            {solution.title}
                          </Link>
                        ))
                      ) : (
                        <div className="rounded-3xl px-4 py-3 text-sm text-slate-400">Loading solutions…</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {navItems.slice(2).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={handleRouteChange}
                    className={`text-sm font-medium transition duration-300 ${isActive ? 'text-white underline decoration-red underline-offset-8 decoration-2' : 'text-slate-400 hover:text-white'}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-700 bg-slate-950 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5">
              {navItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleRouteChange}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${pathname === item.href ? 'bg-red/10 text-white' : 'text-slate-300 hover:bg-slate-900'}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/solutions"
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${pathname.startsWith('/solutions') ? 'bg-red/10 text-white' : 'text-slate-300 hover:bg-slate-900'}`}
              >
                Solutions
              </Link>
              {navItems.slice(2).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleRouteChange}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${pathname === item.href ? 'bg-red/10 text-white' : 'text-slate-300 hover:bg-slate-900'}`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Solutions</p>
                  <Link
                    to="/solutions"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-red px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-red-600"
                  >
                    View all
                  </Link>
                </div>
                <Link
                  to="/solutions"
                  onClick={handleRouteChange}
                  className="mt-3 block rounded-2xl px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-900"
                >
                  All solutions
                </Link>
                <div className="mt-3 space-y-2">
                  {solutions.length > 0 ? (
                    solutions.map((solution) => (
                      <Link
                        key={solution.slug}
                        to={`/solutions/${solution.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
                      >
                        {solution.title}
                      </Link>
                    ))
                  ) : (
                    <div className="rounded-2xl px-4 py-3 text-sm text-slate-400">Loading solutions…</div>
                  )}
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-700/80 bg-slate-950 py-16 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-900 px-4 py-3 shadow-glow">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-black text-lg font-semibold text-red">W</div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">WOV SECURITY</p>
                <p className="text-sm text-white">Executive CCTV & Security</p>
              </div>
            </div>
            <p className="max-w-lg text-slate-400">
              Premium surveillance design for luxury estates, hospitality, and executive environments. We deliver discreet, intelligent security that enhances every space.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-semibold transition hover:bg-slate-800 hover:text-white">F</a>
              <a href="#" aria-label="Twitter" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-semibold transition hover:bg-slate-800 hover:text-white">T</a>
              <a href="#" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-semibold transition hover:bg-slate-800 hover:text-white">I</a>
              <a href="#" aria-label="LinkedIn" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-semibold transition hover:bg-slate-800 hover:text-white">L</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.35em] text-slate-500">Quick links</h3>
            <div className="mt-6 grid gap-3 text-sm">
              <Link to="/" className="transition hover:text-white">Home</Link>
              <Link to="/about" className="transition hover:text-white">About us</Link>
              <Link to="/solutions" className="transition hover:text-white">Solutions</Link>
              <Link to="/clients" className="transition hover:text-white">Clients</Link>
              <Link to="/products" className="transition hover:text-white">New Releases</Link>
              <Link to="/contact" className="transition hover:text-white">Contact us</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.35em] text-slate-500">Contact</h3>
            <div className="mt-6 space-y-4 text-sm text-slate-400">
              <p>contact@wovsecurity.com</p>
              <p>+1 800 555 0199</p>
              <p>Los Angeles · New York · London</p>
            </div>
            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400">
              <p className="text-slate-300">Secure consultation</p>
              <p className="mt-2">Need a custom deployment? Reach out to discuss premium CCTV architecture and executive monitoring.</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800/80 px-6 pt-6 text-sm text-slate-500">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} WOV SECURITY. All rights reserved.</p>
            <p>Designed for elite performance and discreet protection.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
