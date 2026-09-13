import { useEffect } from 'react';
import { Nav, Footer } from './components/Chrome';
import Hero from './components/Hero';
import { Process, Coverage, Demo, Inspect, Why, Consult, Faq } from './components/Sections';

// Scroll engine, no libraries. Scroll position is only ever a TARGET — the
// rAF loop eases the live value toward it (lerp), so scrubbed motion settles
// instead of juddering. Text reveals stay discrete (IntersectionObserver +
// short CSS transitions).
export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const LERP = reduced ? 1 : 0.14;
    const bar = document.getElementById('pbar');
    const scrubs = Array.from(document.querySelectorAll('[data-scrub]')).map((el) => ({
      el,
      cur: 0,
      target: 0,
    }));
    const steppers = Array.from(document.querySelectorAll('[data-steps]'));
    let raf = 0;
    let alive = true;

    const measure = () => {
      const vh = window.innerHeight;
      for (const s of scrubs) {
        const r = s.el.getBoundingClientRect();
        const total = r.height - vh;
        s.target = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      }
      for (const el of steppers) {
        const host = el.closest('section') || el;
        const r = host.getBoundingClientRect();
        const total = r.height - vh;
        const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
        const n = parseInt(el.dataset.steps, 10) || 1;
        const st = Math.min(n - 1, Math.floor(p * n));
        if (el._step !== st) {
          el._step = st;
          el.setAttribute('data-step', String(st));
        }
      }
      if (bar) {
        const max = document.documentElement.scrollHeight - vh;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
      kick();
    };
    const tick = () => {
      raf = 0;
      if (!alive) return;
      let settling = false;
      for (const s of scrubs) {
        const d = s.target - s.cur;
        if (Math.abs(d) > 0.0005) {
          s.cur += d * LERP;
          settling = true;
        } else {
          s.cur = s.target;
        }
        s.el.style.setProperty('--p', s.cur.toFixed(4));
      }
      if (settling) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div
        id="pbar"
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-pine"
        style={{ transform: 'scaleX(0)' }}
      />
      <Nav />
      <main>
        <Hero />
        <div className="slide-over bg-paper">
          <Process />
        </div>
        <Coverage />
        <Demo />
        <Inspect />
        <Why />
        <Consult />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
