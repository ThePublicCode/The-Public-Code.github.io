import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseElement } from "@bruk-io/bh-01";
import { t, renderToken } from "../tokens/index.js";
import { revealStyles, sectionLabelStyles, observeReveal } from "./shared-styles.js";

@customElement("tpc-about")
export class TpcAbout extends BaseElement {
  static styles = [
    BaseElement.styles,
    revealStyles,
    sectionLabelStyles,
    css`
      :host {
        display: block;
        border-top: 1px solid var(--parchment);
      }

      section {
        padding-block: 96px;
      }

      bh-split {
        --bh-split-gap: 64px;
        align-items: start;
      }

      .section-label {
        color: var(--amber);
      }

      h2 {
        font-family: "Fraunces", Georgia, serif;
        font-weight: 900;
        line-height: 1.1;
        font-size: 32px;
        color: var(--charcoal);
        margin-bottom: 6px;
        letter-spacing: -0.02em;
      }

      .role {
        font-family: "DM Mono", monospace;
        font-size: 13px;
        color: var(--stone);
        margin-bottom: 28px;
      }

      .prose {
        color: var(--stone);
        font-size: 16px;
        line-height: 1.8;
      }

      .prose p {
        margin-top: 0;
        margin-bottom: 1em;
      }

      .prose p:last-child {
        margin-bottom: 0;
      }

      blockquote {
        background: var(--green);
        border-radius: var(--radius);
        padding: 32px 36px;
        position: relative;
        overflow: hidden;
        margin: 0;
      }

      .quote-mark {
        font-family: "Fraunces", Georgia, serif;
        font-size: 96px;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.08);
        line-height: 0.8;
        position: absolute;
        top: 20px;
        left: 28px;
        pointer-events: none;
        user-select: none;
      }

      blockquote p {
        font-family: "Fraunces", Georgia, serif;
        font-size: 21px;
        font-style: italic;
        font-weight: 400;
        color: var(--cream);
        line-height: 1.6;
        position: relative;
        z-index: 1;
      }

      blockquote strong {
        font-style: normal;
        font-weight: 700;
        color: var(--amber-l);
      }

      bh-grid {
        margin-top: 16px;
      }

      bh-card {
        --bh-card-bg: var(--warm-white);
        --bh-card-border: var(--parchment);
        --bh-card-radius: var(--radius);
        --bh-card-shadow: none;
      }

      dt {
        font-family: "Fraunces", Georgia, serif;
        font-size: 32px;
        font-weight: 900;
        color: var(--green);
        line-height: 1;
        margin-bottom: 4px;
      }

      dd {
        font-size: 13px;
        color: var(--stone);
        line-height: 1.4;
        margin: 0;
      }

      @media (max-width: 800px) {
        bh-split {
          grid-template-columns: 1fr !important;
          --bh-split-gap: 40px;
        }
      }

      @media (max-width: 540px) {
        section {
          padding-block: 64px;
        }
      }
    `,
  ];

  private _observer?: IntersectionObserver;

  firstUpdated() {
    this._observer = observeReveal(this.shadowRoot!);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
  }

  render() {
    return html`
      <section id="about" aria-label=${t.about.ariaLabel}>
        <bh-center max="1040px" gutters="lg">
        <bh-split ratio="1/1">
          <article>
            <p class="section-label reveal reveal-d1">${t.about.label}</p>
            <h2 class="reveal reveal-d2">${t.global.name}</h2>
            <p class="role reveal reveal-d2">
              ${t.about.role}
            </p>
            <div class="prose reveal reveal-d3">${renderToken(t.about.body)}</div>
          </article>
          <aside>
            <blockquote class="reveal reveal-d2">
              <div class="quote-mark" aria-hidden="true">&ldquo;</div>
              ${renderToken(t.about.quote)}
            </blockquote>
            <bh-grid min="140px" gap="sm" class="reveal reveal-d3">
              ${t.about.stats.map(
                (s) => html`
                  <bh-card variant="outlined" padding="md">
                    <dt>${s.value}</dt>
                    <dd>${s.label}</dd>
                  </bh-card>
                `,
              )}
            </bh-grid>
          </aside>
        </bh-split>
        </bh-center>
      </section>
    `;
  }
}
