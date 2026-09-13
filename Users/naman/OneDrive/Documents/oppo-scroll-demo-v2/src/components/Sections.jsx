import { useEffect, useRef, useState } from 'react';
import { COVERAGE, FAQS, PROCESS, TERMINAL_SCRIPT, WHY } from '../data';

/* Reveal on entry — opacity only. Never hidden without JS (see html.js gate).
   A timeout forces visible even if the observer misfires. */
export function Reveal({ children, className = '', blur = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let done = false;
    const show = () => {
      if (!done) {
        done = true;
        el.classList.add('is-in');
      }
    };
    const fallback = setTimeout(show, 1500);
    if (!('IntersectionObserver' in window)) return () => clearTimeout(fallback);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show();
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => {
      clearTimeout(fallback);
      io.disconnect();
    };
  }, []);
  return (
    <div ref={ref} className={`rv ${blur ? 'rv-blur' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* Marginalia rail: index + label, sticky on desktop. */
function Rail({ index, label, dark = false }) {
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${dark ? 'text-sage' : 'text-pine'}`}>
        {index} — {label}
      </p>
    </div>
  );
}

function SectionTitle({ children, dark = false }) {
  return (
    <Reveal blur>
      <h2
        className={`max-w-2xl font-display text-4xl font-light leading-[1.06] tracking-[-0.015em] sm:text-5xl ${
          dark ? 'text-paper' : 'text-ink'
        }`}
      >
        {children}
      </h2>
    </Reveal>
  );
}

/* ---------------- process ---------------- */

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-28 sm:px-10 sm:py-40 lg:grid-cols-[200px_1fr] lg:gap-16">
        <Rail index="01" label="Process" />
        <div>
          <Reveal>
            <SectionTitle>Apply. We assess. You&apos;re covered.</SectionTitle>
            <p className="mt-5 max-w-xl leading-[1.75] text-muted">
              You describe what your agent does. We handle everything after that.
            </p>
          </Reveal>
          <div className="mt-14">
            {PROCESS.map((s, i) => (
              <Reveal key={s.n}>
                <div className="hrow grid gap-2 py-8 sm:grid-cols-[48px_1fr_1.2fr] sm:gap-8">
                  <span className="font-mono text-[13px] text-pine">0{i + 1}</span>
                  <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="leading-[1.75] text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- coverage ---------------- */

export function Coverage() {
  return (
    <section id="coverage" className="scroll-mt-10 bg-coal text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-28 sm:px-10 sm:py-40 lg:grid-cols-[200px_1fr] lg:gap-16">
        <Rail index="02" label="Coverage" dark />
        <div>
          <Reveal>
            <SectionTitle dark>The policy, in plain words.</SectionTitle>
            <p className="mt-5 max-w-xl leading-[1.75] text-paper/55">
              The failures unique to agents acting on their own — covered up to clear limits, with
              exclusions stated plainly before you sign.
            </p>
          </Reveal>
          <div className="steps-p mt-14" data-steps="5" data-step="0">
            {COVERAGE.map((c, i) => (
              <Reveal key={c.t} className="step-row">
                <div className="hrow-d grid gap-2 py-7 sm:grid-cols-[48px_1fr_1.2fr] sm:gap-8">
                  <span className="font-mono text-[13px] text-sage">0{i + 1}</span>
                  <h3 className="text-lg font-semibold tracking-tight text-paper">{c.t}</h3>
                  <p className="leading-[1.75] text-paper/55">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-paper/40">
              Exclusions listed up front. No surprises — that&apos;s the product.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- demo terminal ---------------- */

const TONE = {
  cmd: 'text-paper',
  dim: 'text-paper/35',
  ok: 'text-sage',
  hi: 'text-paper font-semibold',
};

function Terminal() {
  const boxRef = useRef(null);
  const [done, setDone] = useState(0);
  const [chars, setChars] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDone(TERMINAL_SCRIPT.length);
      setFinished(true);
      return;
    }
    let timers = [];
    let alive = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !alive) return;
        io.disconnect();
        let li = 0;
        let ch = 0;
        setDone(0);
        setChars(0);
        const step = () => {
          if (!alive) return;
          const line = TERMINAL_SCRIPT[li].text;
          ch += 1;
          if (ch >= line.length) {
            li += 1;
            ch = 0;
            setDone(li);
            setChars(0);
            if (li >= TERMINAL_SCRIPT.length) {
              setFinished(true);
              return;
            }
            timers.push(setTimeout(step, 320));
          } else {
            setDone(li);
            setChars(ch);
            timers.push(setTimeout(step, 14));
          }
        };
        timers.push(setTimeout(step, 600));
      },
      { threshold: 0.35 }
    );
    if (boxRef.current) io.observe(boxRef.current);
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, []);

  const renderLine = (line, partial) => {
    const text = partial != null ? line.text.slice(0, partial) : line.text;
    if (line.tone === 'cmd') {
      return (
        <>
          <span className="mr-2 text-muted">$</span>
          <span className={TONE.cmd}>{text}</span>
        </>
      );
    }
    return <span className={TONE[line.tone]}>{text}</span>;
  };

  return (
    <div ref={boxRef} className="border border-ink/70 bg-coal">
      <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 border border-paper/30" />
          <span className="h-2.5 w-2.5 border border-paper/30" />
          <span className="h-2.5 w-2.5 border border-paper/30" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
          Application to covered
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">Demo</span>
      </div>
      <div className="min-h-[280px] px-5 py-6 font-mono text-[13px] leading-8 sm:px-7 sm:text-sm">
        {TERMINAL_SCRIPT.slice(0, done).map((line, i) => (
          <p key={i} className="whitespace-pre-wrap">
            {renderLine(line)}
          </p>
        ))}
        {!finished && done < TERMINAL_SCRIPT.length && (
          <p className="whitespace-pre-wrap">
            {renderLine(TERMINAL_SCRIPT[done], chars)}
            <span className="tcursor ml-0.5 inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] bg-paper/80" />
          </p>
        )}
        {finished && (
          <p>
            <span className="tcursor inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] bg-paper/80" />
          </p>
        )}
      </div>
    </div>
  );
}

export function Demo() {
  return (
    <section id="demo" className="scroll-mt-24 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-28 sm:px-10 sm:py-40 lg:grid-cols-[200px_1fr] lg:gap-16">
        <Rail index="03" label="Run-through" />
        <div>
          <Reveal>
            <SectionTitle>Days, not quarters.</SectionTitle>
            <p className="mt-5 max-w-xl leading-[1.75] text-muted">
              A stylized peek at the journey — the real work happens behind the scenes, and a human
              walks you through all of it.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- inspect: the one dark band ---------------- */

const INSPECT = [
  { t: 'Refunds', d: 'Every payout traced to a reason.' },
  { t: 'Customer data', d: 'Watched from request to deletion.' },
  { t: 'Uptime', d: 'Steady when traffic spikes.' },
  { t: 'Partner actions', d: 'Every outside step logged.' },
  { t: 'Rule changes', d: 'New regulations folded in.' },
  { t: 'Drift', d: 'Behavior today matches day one.' },
];

const UPTIME = [38, 52, 46, 60, 55, 68, 64, 76, 70, 84, 78, 90, 86, 93, 88, 96, 90, 99, 94, 89, 97, 93, 99, 96];

/* One miniature exhibit per grid cell — rendered in the field and again
   inside the loupe at 3×, so every pixel of the slide shows something real. */
function InspectArt({ decorative = false }) {
  return (
    <div aria-hidden={decorative || undefined} className="grid h-full w-full grid-cols-3 grid-rows-2">
      <div className="relative min-h-0 min-w-0 overflow-hidden p-2 sm:p-2.5">
        <span className="absolute left-2 top-1.5 font-mono text-[9px] tracking-[0.18em] text-paper/35">01</span>
        <div className="mt-4 space-y-1.5 font-mono text-[9px] leading-snug sm:text-[10px]">
          <p className="truncate text-paper/70">REF-1042 <span className="text-sage">cleared</span></p>
          <p className="truncate text-paper/70">REF-1043 <span className="text-sage">cleared</span></p>
          <p className="truncate text-paper/70">REF-1044 <span className="text-sage">cleared</span></p>
          <p className="truncate text-paper/35">REF-1045 queued…</p>
        </div>
      </div>
      <div className="relative min-h-0 min-w-0 overflow-hidden p-2 sm:p-2.5">
        <span className="absolute left-2 top-1.5 font-mono text-[9px] tracking-[0.18em] text-paper/35">02</span>
        <div className="mt-4 space-y-2">
          <div className="h-1.5 w-11/12 bg-paper/15" />
          <div className="h-1.5 w-3/5 bg-paper/70" />
          <div className="h-1.5 w-4/5 bg-paper/15" />
          <div className="h-1.5 w-2/5 bg-paper/70" />
          <p className="font-mono text-[9px] text-paper/40">2 fields masked</p>
        </div>
      </div>
      <div className="relative min-h-0 min-w-0 overflow-hidden p-2 sm:p-2.5">
        <span className="absolute left-2 top-1.5 font-mono text-[9px] tracking-[0.18em] text-paper/35">03</span>
        <div className="mt-4 flex h-12 items-end gap-[3px] sm:h-14">
          {UPTIME.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={`w-full ${i === 17 ? 'bg-sage' : 'bg-paper/25'}`} />
          ))}
        </div>
        <p className="mt-1.5 font-mono text-[9px] text-paper/40">30 days</p>
      </div>
      <div className="relative min-h-0 min-w-0 overflow-hidden p-2 sm:p-2.5">
        <span className="absolute left-2 top-1.5 font-mono text-[9px] tracking-[0.18em] text-paper/35">04</span>
        <svg viewBox="0 0 100 70" className="mt-2 h-[calc(100%-1.5rem)] w-full" preserveAspectRatio="xMidYMid meet">
          <g stroke="rgba(250,248,243,0.4)" strokeWidth="1">
            <line x1="18" y1="35" x2="50" y2="14" />
            <line x1="18" y1="35" x2="50" y2="56" />
            <line x1="50" y1="14" x2="82" y2="35" />
            <line x1="50" y1="56" x2="82" y2="35" />
          </g>
          <circle cx="18" cy="35" r="5.5" fill="#141412" stroke="rgba(250,248,243,0.55)" />
          <circle cx="50" cy="14" r="5.5" fill="#141412" stroke="rgba(250,248,243,0.55)" />
          <circle cx="50" cy="56" r="5.5" fill="#141412" stroke="rgba(250,248,243,0.55)" />
          <circle cx="82" cy="35" r="5.5" fill="#9CAF88" />
        </svg>
      </div>
      <div className="relative min-h-0 min-w-0 overflow-hidden p-2 sm:p-2.5">
        <span className="absolute left-2 top-1.5 font-mono text-[9px] tracking-[0.18em] text-paper/35">05</span>
        <div className="mt-4 space-y-1.5 font-mono text-[9px] leading-snug sm:text-[10px]">
          <p className="truncate text-paper/35 line-through">- auto-approve</p>
          <p className="truncate text-paper/80">+ approve + receipt</p>
          <p className="truncate text-paper/40">notify owner</p>
          <p className="truncate text-paper/80">+ weekly review</p>
        </div>
      </div>
      <div className="relative min-h-0 min-w-0 overflow-hidden p-2 sm:p-2.5">
        <span className="absolute left-2 top-1.5 font-mono text-[9px] tracking-[0.18em] text-paper/35">06</span>
        <svg viewBox="0 0 100 62" className="mt-2 h-[calc(100%-1.5rem)] w-full" preserveAspectRatio="xMidYMid meet">
          <path d="M6,50 C26,50 30,16 50,16 C70,16 74,50 94,50" fill="none" stroke="rgba(250,248,243,0.6)" strokeWidth="1.2" />
          <path d="M6,52 C26,52 33,20 50,20 C67,20 74,52 94,52" fill="none" stroke="#9CAF88" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x="6" y="10" fontSize="7" fill="rgba(250,248,243,0.4)" fontFamily="monospace">day 01</text>
          <text x="70" y="10" fontSize="7" fill="#9CAF88" fontFamily="monospace">today</text>
        </svg>
      </div>
    </div>
  );
}

/* Enlarged, cleanly laid-out version of each cell for the loupe —
   same exhibits, readable size, no optical-zoom distortion. */
function InspectDetail() {
  return (
    <>
      <div className="detail detail-0 absolute inset-0 p-4 sm:p-5">
        <p className="font-mono text-[10px] tracking-[0.18em] text-paper/40">01 — REFUNDS</p>
        <div className="mt-3 space-y-2 font-mono text-[13px]">
          <p className="text-paper/80">REF-1042 <span className="text-sage">cleared</span></p>
          <p className="text-paper/80">REF-1043 <span className="text-sage">cleared</span></p>
          <p className="text-paper/80">REF-1044 <span className="text-sage">cleared</span></p>
          <p className="text-paper/40">REF-1045 queued…</p>
        </div>
        <p className="absolute bottom-4 left-4 font-mono text-[10px] text-paper/40 sm:left-5">traced end-to-end</p>
      </div>
      <div className="detail detail-1 absolute inset-0 p-4 sm:p-5">
        <p className="font-mono text-[10px] tracking-[0.18em] text-paper/40">02 — CUSTOMER DATA</p>
        <div className="mt-4 space-y-3">
          <div className="h-2.5 w-11/12 bg-paper/15" />
          <div className="h-2.5 w-3/5 bg-paper/70" />
          <div className="h-2.5 w-4/5 bg-paper/15" />
          <div className="h-2.5 w-2/5 bg-paper/70" />
        </div>
        <p className="absolute bottom-4 left-4 font-mono text-[10px] text-paper/40 sm:left-5">2 fields masked</p>
      </div>
      <div className="detail detail-2 absolute inset-0 p-4 sm:p-5">
        <p className="font-mono text-[10px] tracking-[0.18em] text-paper/40">03 — UPTIME</p>
        <div className="mt-4 flex h-24 items-end gap-1.5 sm:h-28">
          {UPTIME.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={`w-full ${i === 17 ? 'bg-sage' : 'bg-paper/25'}`} />
          ))}
        </div>
        <p className="absolute bottom-4 left-4 font-mono text-[10px] text-paper/40 sm:left-5">30 days · steady</p>
      </div>
      <div className="detail detail-3 absolute inset-0 p-4 sm:p-5">
        <p className="font-mono text-[10px] tracking-[0.18em] text-paper/40">04 — PARTNER ACTIONS</p>
        <svg viewBox="0 0 100 70" className="mt-3 h-[calc(100%-4.5rem)] w-full" preserveAspectRatio="xMidYMid meet">
          <g stroke="rgba(250,248,243,0.4)" strokeWidth="1">
            <line x1="18" y1="35" x2="50" y2="14" />
            <line x1="18" y1="35" x2="50" y2="56" />
            <line x1="50" y1="14" x2="82" y2="35" />
            <line x1="50" y1="56" x2="82" y2="35" />
          </g>
          <circle cx="18" cy="35" r="5.5" fill="#141412" stroke="rgba(250,248,243,0.55)" />
          <circle cx="50" cy="14" r="5.5" fill="#141412" stroke="rgba(250,248,243,0.55)" />
          <circle cx="50" cy="56" r="5.5" fill="#141412" stroke="rgba(250,248,243,0.55)" />
          <circle cx="82" cy="35" r="5.5" fill="#9CAF88" />
        </svg>
      </div>
      <div className="detail detail-4 absolute inset-0 p-4 sm:p-5">
        <p className="font-mono text-[10px] tracking-[0.18em] text-paper/40">05 — RULE CHANGES</p>
        <div className="mt-4 space-y-2.5 font-mono text-[13px]">
          <p className="text-paper/35 line-through">- auto-approve</p>
          <p className="text-paper/85">+ approve + receipt</p>
          <p className="text-paper/45">notify owner</p>
          <p className="text-paper/85">+ weekly review</p>
        </div>
      </div>
      <div className="detail detail-5 absolute inset-0 p-4 sm:p-5">
        <p className="font-mono text-[10px] tracking-[0.18em] text-paper/40">06 — DRIFT</p>
        <svg viewBox="0 0 100 62" className="mt-3 h-[calc(100%-4.5rem)] w-full" preserveAspectRatio="xMidYMid meet">
          <path d="M6,50 C26,50 30,16 50,16 C70,16 74,50 94,50" fill="none" stroke="rgba(250,248,243,0.6)" strokeWidth="1.2" />
          <path d="M6,52 C26,52 33,20 50,20 C67,20 74,52 94,52" fill="none" stroke="#9CAF88" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x="6" y="10" fontSize="7" fill="rgba(250,248,243,0.4)" fontFamily="monospace">day 01</text>
          <text x="70" y="10" fontSize="7" fill="#9CAF88" fontFamily="monospace">today</text>
        </svg>
      </div>
    </>
  );
}

export function Inspect() {
  return (
    <section
      id="inspect"
      data-steps="6"
      data-step="0"
      data-scrub
      className="inspect h-[260vh] scroll-mt-10 bg-coal text-paper"
    >
      <div className="inspect-stage">
        <div className="mx-auto grid h-full max-w-6xl content-center items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/40">
              04 — Evidence
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-light leading-[1.08] tracking-[-0.015em] sm:text-4xl">
              Every pixel accounted for.
            </h2>
            <div className="inspect-field relative mt-8 overflow-hidden border border-paper/20">
              <InspectArt />
              <div className="inspect-grid pointer-events-none absolute inset-0" />
              <div className="inspect-frame" />
            </div>
          </div>
          <div>
            <div className="inspect-track w-40 shrink-0 sm:w-52 lg:w-full">
                <div className="inspect-loupe-fixed relative aspect-square w-full overflow-hidden border border-paper/60 bg-black">
                  <InspectDetail />
                  <span className="absolute left-2 top-2 z-10 font-mono text-[10px] tracking-widest text-paper/70">
                    DETAIL
                  </span>
                </div>
            </div>
            <div className="relative mt-5 h-16">
              {INSPECT.map((c, i) => (
                <div key={c.t} className={`cap cap-${i} absolute inset-0`}>
                  <p className="font-mono text-xs tracking-[0.14em] text-sage">
                    0{i + 1} / 06 — {c.t.toUpperCase()}
                  </p>
                  <p className="mt-1.5 text-[15px] font-medium">{c.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              {INSPECT.map((c, i) => (
                <span key={c.t} className={`dot dot-${i} h-1.5 w-1.5 bg-paper/20`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- why fade ---------------- */

export function Why() {
  return (
    <section id="why" className="scroll-mt-24 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-28 sm:px-10 sm:py-40 lg:grid-cols-[200px_1fr] lg:gap-16">
        <Rail index="05" label="Why Fade" />
        <div>
          <Reveal>
            <SectionTitle>Insurance that acts like a partner.</SectionTitle>
          </Reveal>
          <div className="mt-14">
            {WHY.map((o, i) => (
              <Reveal key={o.n}>
                <div className="hrow grid gap-2 py-8 sm:grid-cols-[48px_1fr_1.2fr] sm:gap-8">
                  <span className="font-mono text-[13px] text-pine">0{i + 1}</span>
                  <h3 className="text-lg font-semibold tracking-tight">{o.title}</h3>
                  <p className="leading-[1.75] text-muted">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- consult ---------------- */

export function Consult() {
  const [sent, setSent] = useState(false);
  return (
    <section id="consult" className="scroll-mt-10 bg-coal text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-28 sm:px-10 sm:py-40 lg:grid-cols-[200px_1fr_1fr] lg:gap-16">
        <Rail index="06" label="Contact" dark />
        <div>
          <Reveal>
            <SectionTitle dark>Let&apos;s cover your agent.</SectionTitle>
            <p className="mt-5 leading-[1.75] text-paper/55">
              Tell us what you&apos;re building. We&apos;ll scope cover for one agent in a single
              call — and take care of everything after that.
            </p>
            <p className="mt-8 font-mono text-[13px] text-sage">consult@fade.example</p>
          </Reveal>
        </div>
        <Reveal>
          {sent ? (
            <div className="border-t border-paper/20 pt-8">
              <p className="font-display text-3xl font-light tracking-tight text-paper">Thanks — we&apos;ll be in touch.</p>
              <p className="mt-4 leading-[1.75] text-paper/55">
                Expect a reply within two business days with a scoped cover plan for your agent.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-8"
            >
              <div>
                <label htmlFor="c-name" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
                  Name
                </label>
                <input
                  id="c-name"
                  required
                  placeholder="Ada Lovelace"
                  className="w-full border-b border-paper/25 bg-transparent py-3 outline-none transition placeholder:text-paper/25 focus:border-sage"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
                  Work email
                </label>
                <input
                  id="c-email"
                  type="email"
                  required
                  placeholder="ada@company.com"
                  className="w-full border-b border-paper/25 bg-transparent py-3 outline-none transition placeholder:text-paper/25 focus:border-sage"
                />
              </div>
              <div>
                <label htmlFor="c-msg" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
                  What is your agent doing?
                </label>
                <textarea
                  id="c-msg"
                  rows={3}
                  required
                  placeholder="A support agent that can issue refunds…"
                  className="w-full resize-none border-b border-paper/25 bg-transparent py-3 outline-none transition placeholder:text-paper/25 focus:border-sage"
                />
              </div>
              <button type="submit" className="btn btn-paper">
                Get covered
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- faq ---------------- */

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="scroll-mt-24 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-28 sm:px-10 sm:py-40 lg:grid-cols-[200px_1fr] lg:gap-16">
        <Rail index="07" label="Questions" />
        <div className="max-w-2xl">
          <Reveal>
            <SectionTitle>Asked often.</SectionTitle>
          </Reveal>
          <Reveal>
            <div className="mt-10">
              {FAQS.map((f, i) => (
                <div key={f.q} className="hrow">
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[16px] font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                      {f.q}
                    </span>
                    <span
                      className={`shrink-0 text-xl font-light leading-none text-muted transition-transform duration-300 ${
                        open === i ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div className={`faq-a ${open === i ? 'open' : ''}`}>
                    <div>
                      <p className="max-w-xl pb-6 text-[15px] leading-[1.75] text-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
