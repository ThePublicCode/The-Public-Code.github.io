import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseElement } from "@bruk-io/bh-01";
import { t, renderToken } from "../tokens/index.js";
import { revealStyles, btnStyles, observeReveal } from "./shared-styles.js";

@customElement("tpc-hero")
export class TpcHero extends BaseElement {
  static styles = [
    BaseElement.styles,
    revealStyles,
    btnStyles,
    css`
      :host {
        display: block;
      }

      section {
        padding-block: 80px 96px;
      }

      .prose {
        max-width: 680px;
        margin-bottom: 40px;
        color: var(--stone);
        font-size: 18px;
        line-height: 1.75;
      }

      .prose h1 {
        color: var(--charcoal);
        font-family: "Fraunces", Georgia, serif;
        font-weight: 900;
        letter-spacing: -0.03em;
        line-height: 1.1;
        font-size: clamp(38px, 6vw, 64px);
        margin-top: 0;
        margin-bottom: 0.5em;
      }

      .prose em {
        color: var(--green);
      }

      .prose p {
        margin-top: 0;
        margin-bottom: 1em;
      }

      .prose p:last-child {
        margin-bottom: 0;
      }

      @media (max-width: 540px) {
        section {
          padding-block: 56px 72px;
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
      <section id="hero" aria-label=${t.hero.ariaLabel}>
        <bh-center max="1040px" gutters="lg">
        <div class="prose reveal reveal-d1">${renderToken(t.hero.body)}</div>
        <bh-cluster class="reveal reveal-d3" align="center">
          <a href="#contact" class="btn btn-primary">${t.hero.cta}</a>
          <a href="#how" class="btn btn-ghost">${t.hero.secondary}</a>
        </bh-cluster>
        </bh-center>
      </section>
    `;
  }
}
