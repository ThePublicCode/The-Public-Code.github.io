import { css } from "lit";

/** Scroll-reveal animation classes. */
export const revealStyles = css`
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: none;
    }
    .reveal-d1 { transition-delay: 0.05s; }
    .reveal-d2 { transition-delay: 0.12s; }
    .reveal-d3 { transition-delay: 0.19s; }
    .reveal-d4 { transition-delay: 0.26s; }
    .reveal-d5 { transition-delay: 0.33s; }
    .reveal-d6 { transition-delay: 0.40s; }
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1;
      transform: none;
    }
  }
`;

/** Button base + variants used across sections. */
export const btnStyles = css`
  bh-cluster {
    --bh-cluster-gap: 12px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: "DM Sans", sans-serif;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    text-decoration: none;
    transition: all 0.15s ease;
    white-space: nowrap;
    letter-spacing: -0.01em;
    padding: 14px 28px;
    font-size: 16px;
  }

  .btn-primary {
    background: var(--green);
    color: var(--cream);
  }
  .btn-primary:hover {
    background: var(--sage);
  }

  .btn-ghost {
    background: transparent;
    color: var(--stone);
    border: 1.5px solid var(--parchment);
  }
  .btn-ghost:hover {
    background: var(--parchment);
    color: var(--charcoal);
  }

  .btn-cream {
    background: var(--cream);
    color: var(--green);
  }
  .btn-cream:hover {
    background: var(--warm-white);
  }

  .btn-ghost-light {
    background: transparent;
    color: var(--moss);
    border: 1.5px solid rgba(255, 255, 255, 0.2);
  }
  .btn-ghost-light:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--cream);
  }
`;

/** DM Mono uppercase section label. */
export const sectionLabelStyles = css`
  .section-label {
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
`;

/** Fraunces section heading (h2). */
export const sectionHeadingStyles = css`
  h2 {
    font-family: "Fraunces", Georgia, serif;
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1.1;
    font-size: clamp(28px, 4vw, 42px);
    color: var(--charcoal);
    margin-bottom: 14px;
  }
`;

/**
 * Activate IntersectionObserver for `.reveal` elements in a shadow root.
 * Returns the observer so callers can disconnect it in `disconnectedCallback`.
 */
export function observeReveal(shadowRoot: ShadowRoot): IntersectionObserver {
  const els = shadowRoot.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => observer.observe(el));
  return observer;
}
