import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchSolutions } from '../utils/api.js';

const HIDE_REVEAL_ZONE = 72;
const HIDE_THRESHOLD = 120;

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
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      if (scrollingDown && currentScrollY > HIDE_THRESHOLD) {
        setHeaderHidden(true);
      } else if (!scrollingDown) {
        setHeaderHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleMouseMove = (event) => {
      if (event.clientY <= HIDE_REVEAL_ZONE) {
        setHeaderHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header
        className={`sticky top-0 z-50 border-b border-slate-700/80 bg-slate-950/95 backdrop-blur-xl transition-transform duration-300 ease-out ${
          headerHidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
          <Link to="/" onClick={handleRouteChange} className="flex items-center text-slate-100">
            <div className="flex h-20 items-center justify-center rounded-2xl bg-white px-4 py-2 shadow-glow">
              <img
                src="https://res.cloudinary.com/dtscqhcop/image/upload/e_trim/v1787590741/wovss_ftfsgf.jpg"
                alt="WOV Security"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 text-slate-100 transition hover:border-red hover:text-red focus:outline-none md:hidden"
              aria-label="Toggle navigation"
            >
              <span className="block h-0.5 w-6 bg-current transition duration-300" />
              <span className="block h-0.5 w-6 bg-current transition duration-300" />
              <span className="block h-0.5 w-6 bg-current transition duration-300" />
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
            <div className="inline-flex items-center rounded-3xl bg-white px-5 py-3 shadow-glow">
              <img
                src="https://res.cloudinary.com/dtscqhcop/image/upload/e_trim/v1787590741/wovss_ftfsgf.jpg"
                alt="WOV Security"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="max-w-lg text-slate-400">
              Premium surveillance design for luxury estates, hospitality, and executive environments. We deliver discreet, intelligent security that enhances every space.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="https://www.facebook.com/share/1PQhXw2Jza/" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 transition hover:bg-slate-800 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/wov_ss?igsi=emNqbHZtN3d6a3hw" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 transition hover:bg-slate-800 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.38-.66.67-1.07 1.34-1.38 2.13-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13-.67-.66-1.34-1.07-2.13-1.38-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.84a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@wovsecurity?_r=1&_t=ZS-999dQuINZPG" aria-label="TikTok" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 transition hover:bg-slate-800 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M16.6 5.82c-.7-.76-1.09-1.76-1.09-2.82h-3.13v13.44a2.6 2.6 0 1 1-1.83-2.48V10.9a5.75 5.75 0 1 0 4.96 5.7V9.28a7.44 7.44 0 0 0 4.36 1.4V7.55a4.4 4.4 0 0 1-3.27-1.73z" />
                </svg>
              </a>
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
              <p>dhanushka@wovss.lk</p>
              <p>+94 77 756 0473</p>
              <p>57B · Bandaranayake Mawatha · Katubadde </p>
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
