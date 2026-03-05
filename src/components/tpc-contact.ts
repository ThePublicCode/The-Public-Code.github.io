import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseElement } from "@bruk-io/bh-01";
import { t, renderToken } from "../tokens/index.js";
import { revealStyles, btnStyles, sectionLabelStyles, observeReveal } from "./shared-styles.js";

@customElement("tpc-contact")
export class TpcContact extends BaseElement {
  static styles = [
    BaseElement.styles,
    revealStyles,
    btnStyles,
    sectionLabelStyles,
    css`
      :host {
        display: block;
        background: var(--green);
        --bh-focus-color: var(--cream);
      }

      section {
        padding-block: 80px;
        text-align: center;
      }

      .section-label {
        color: var(--moss);
        margin-bottom: 16px;
      }

      .prose {
        max-width: 560px;
        margin: 0 auto 40px;
        color: var(--moss);
        font-size: 17px;
        line-height: 1.7;
      }

      .prose h2 {
        color: var(--cream);
        font-family: "Fraunces", Georgia, serif;
        font-weight: 900;
        letter-spacing: -0.03em;
        line-height: 1.1;
        font-size: clamp(28px, 4vw, 46px);
        margin-top: 0;
        margin-bottom: 0.5em;
      }

      .prose em {
        font-style: italic;
        color: var(--amber-l);
      }

      .prose p {
        margin-top: 0;
        margin-bottom: 1em;
      }

      .prose p:last-child {
        margin-bottom: 0;
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
      <section id="contact" aria-label=${t.contact.ariaLabel}>
        <bh-center max="1040px" gutters="lg">
        <p class="section-label reveal">${t.contact.label}</p>
        <div class="prose reveal reveal-d1">${renderToken(t.contact.body)}</div>
        <bh-cluster class="reveal reveal-d3" justify="center" align="center">
          <a href="mailto:${t.global.email}" class="btn btn-cream"
            >${t.global.email}</a
          >
          <a href="#how" class="btn btn-ghost-light">${t.contact.secondary}</a>
        </bh-cluster>
        </bh-center>
      </section>
    `;
  }
}
