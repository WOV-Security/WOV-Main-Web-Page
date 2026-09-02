import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchSolutions } from '../utils/api.js';
import wovLogo from '../assets/wov-logo.png';

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
        className={`sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.15)] transition-transform duration-300 ease-out ${
          headerHidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
          <Link to="/" onClick={handleRouteChange} className="-ml-2 flex items-center sm:-ml-6">
            <img src={wovLogo} alt="WOV Security" className="h-20 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white text-slate-900 transition hover:border-red hover:text-red focus:outline-none md:hidden"
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
                    className={`text-sm font-medium transition duration-300 ${isActive ? 'text-slate-900 underline decoration-red underline-offset-8 decoration-2' : 'text-slate-700 hover:text-slate-900'}`}
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
                  className={`text-sm font-medium transition duration-300 ${pathname.startsWith('/solutions') ? 'text-slate-900 underline decoration-red underline-offset-8 decoration-2' : 'text-slate-700 hover:text-slate-900'}`}
                >
                  Solutions
                </button>
                {solutionsOpen && (
                  <div className="absolute left-0 top-full z-50 w-72 rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-glow backdrop-blur-xl">
                    <Link
                      to="/solutions"
                      onClick={handleRouteChange}
                      className="block rounded-3xl px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
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
                            className="block rounded-3xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            {solution.title}
                          </Link>
                        ))
                      ) : (
                        <div className="rounded-3xl px-4 py-3 text-sm text-slate-500">Loading solutions…</div>
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
                    className={`text-sm font-medium transition duration-300 ${isActive ? 'text-slate-900 underline decoration-red underline-offset-8 decoration-2' : 'text-slate-700 hover:text-slate-900'}`}
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
            className="max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white md:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5">
              {navItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleRouteChange}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${pathname === item.href ? 'bg-red/10 text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/solutions"
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${pathname.startsWith('/solutions') ? 'bg-red/10 text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Solutions
              </Link>
              {navItems.slice(2).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleRouteChange}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${pathname === item.href ? 'bg-red/10 text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Solutions</p>
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
                  className="mt-3 block rounded-2xl px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
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
                        className="block rounded-2xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        {solution.title}
                      </Link>
                    ))
                  ) : (
                    <div className="rounded-2xl px-4 py-3 text-sm text-slate-500">Loading solutions…</div>
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
              <img src={wovLogo} alt="WOV Security" className="h-20 w-auto object-contain" />
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
              <a href="https://wa.me/94777560473" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 transition hover:bg-slate-800 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
              <a href="mailto:dhanushka@wovss.lk" aria-label="Email" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 transition hover:bg-slate-800 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
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
              <a href="mailto:dhanushka@wovss.lk" className="block transition hover:text-white">dhanushka@wovss.lk</a>
              <a href="https://wa.me/94777560473" target="_blank" rel="noopener noreferrer" className="block transition hover:text-white">+94 77 756 0473</a>
              <p>57B · Bandaranayake Mawatha · Katubeddha </p>
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
