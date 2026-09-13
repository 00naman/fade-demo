import { scrollToId } from './Chrome';

// Editorial hero, choreographed in depth: the kicker drifts least, the
// headline travels mid-rate, the supporting block exits first and softens.
// The pinned fold remains the single primary motion of this scene.
export default function Hero() {
  return (
    <section className="hero-scrub" data-scrub id="overview">
      <div className="hero-stage bg-paper">
        <div className="hero-bend">
          <div className="hero-copy mx-auto flex h-full w-full max-w-6xl flex-col px-6 pb-10 pt-28 sm:px-10">
            <div className="depth-a flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              <p>Fade — Insurance for AI agents</p>
              <p className="hidden sm:block">A concept demonstration</p>
            </div>

            <div className="flex flex-1 flex-col justify-center py-10">
              <h1 className="depth-b max-w-4xl font-display text-[13vw] font-light leading-[1.02] tracking-[-0.02em] sm:text-7xl lg:text-[5.4rem]">
                Agents take action.
                <br />
                We cover the consequences.
              </h1>
              <div className="depth-c mt-10 grid gap-10 md:grid-cols-[1fr_320px] md:items-end">
                <p className="max-w-md text-[15px] leading-[1.75] text-muted sm:text-base">
                  Fade insures AI agents doing real work — we assess the risk, issue the policy,
                  and handle the claims. You keep shipping.
                </p>
                <div>
                  <button onClick={() => scrollToId('#consult')} className="btn btn-solid w-full sm:w-auto">
                    Request a consultation
                  </button>
                  <p className="mt-5 font-mono text-[12px] text-muted">
                    <span className="mr-2 text-pine">$</span>
                    <code className="whitespace-nowrap">fade cover --agent checkout-assistant</code>
                  </p>
                </div>
              </div>
            </div>

            <div className="depth-c flex items-center justify-between border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
              <p>Underwriting · Policies · Claims</p>
              <p>Scroll</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
