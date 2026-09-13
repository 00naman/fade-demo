import { useEffect, useState } from 'react';

export function scrollToId(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const LINKS = [
  ['Coverage', '#coverage'],
  ['Process', '#process'],
  ['Inspect', '#inspect'],
  ['Why Fade', '#why'],
  ['Questions', '#faq'],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 420 && y > last + 4);
        last = y;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-paper transition-transform duration-300 ${
        scrolled ? 'bg-paper/95 backdrop-blur-sm' : 'bg-transparent'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <button onClick={() => scrollToId('#overview')} className="flex items-baseline gap-3">
          <span className="font-display text-[22px] font-medium tracking-tight">Fade</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted sm:inline">
            Agent insurance
          </span>
        </button>
        <nav className="hidden items-center gap-7 text-sm text-ink/70 md:flex">
          {LINKS.map(([label, hash]) => (
            <a
              key={hash}
              href={hash}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(hash);
              }}
              className="transition-colors hover:text-ink"
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => scrollToId('#consult')}
          className="border border-ink px-4 py-2 text-[13px] font-medium transition-colors hover:bg-ink hover:text-paper"
        >
          Request cover
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-coal text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-5xl font-light tracking-tight sm:text-6xl">Fade</p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-paper/50">
              Insurance for AI agents doing real work. Assessed, covered, claimed.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/40">Index</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {[
                ['Coverage', '#coverage'],
                ['Process', '#process'],
                ['Inspect', '#inspect'],
                ['Questions', '#faq'],
              ].map(([label, hash]) => (
                <li key={hash}>
                  <a
                    href={hash}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(hash);
                    }}
                    className="text-paper/70 transition-colors hover:text-paper"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/40">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li>
                <a
                  href="#consult"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId('#consult');
                  }}
                  className="text-paper/70 transition-colors hover:text-paper"
                >
                  Request cover
                </a>
              </li>
              <li className="font-mono text-[13px] text-paper/50">consult@fade.example</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-paper/15 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Fade — concept demonstration</p>
          <p>Set in Fraunces, Inter & Space Mono</p>
        </div>
      </div>
    </footer>
  );
}
