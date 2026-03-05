import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseElement } from "@bruk-io/bh-01";
import { t, renderToken } from "../tokens/index.js";
import { revealStyles, sectionLabelStyles, sectionHeadingStyles, observeReveal } from "./shared-styles.js";

@customElement("tpc-how")
export class TpcHow extends BaseElement {
  static styles = [
    BaseElement.styles,
    revealStyles,
    sectionLabelStyles,
    sectionHeadingStyles,
    css`
      :host {
        display: block;
        background: var(--warm-white);
        border-top: 1px solid var(--parchment);
      }

      section {
        padding-block: 96px;
      }

      header {
        text-align: center;
        margin-bottom: 64px;
      }

      .section-label {
        color: var(--amber);
      }

      .header-body {
        color: var(--stone);
        font-size: 17px;
        line-height: 1.7;
        max-width: 480px;
        margin: 0 auto;
      }

      .header-body p {
        margin: 0;
      }

      .cols {
        background: var(--parchment);
        border-radius: 16px;
        overflow: hidden;
      }

      .cols bh-split {
        --bh-split-gap: 2px;
      }

      article {
        background: var(--warm-white);
        padding: 40px;
      }

      .col-label {
        margin-bottom: 32px;
      }

      .col-label span {
        padding: 5px 12px;
        border-radius: 100px;
        font-size: 12px;
        font-weight: 600;
      }

      .col-label-np {
        background: #e6f0ed;
        color: var(--green);
      }

      .col-label-eng {
        background: #fdf0e4;
        color: var(--amber);
      }

      .steps ol {
        list-style: none;
        padding: 0;
        margin: 0;
        counter-reset: step;
      }

      .steps li {
        counter-increment: step;
        display: grid;
        grid-template-columns: 34px 1fr;
        gap: 4px 18px;
      }

      .steps li p {
        grid-column: 2;
      }

      .steps li + li {
        margin-top: 28px;
        padding-top: 28px;
        border-top: 1px solid var(--parchment);
      }

      .steps li::before {
        content: counter(step);
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Fraunces", Georgia, serif;
        font-size: 15px;
        font-weight: 700;
        grid-row: 1 / -1;
      }

      .col-np .steps li::before {
        background: var(--green);
        color: var(--cream);
      }

      .col-eng .steps li::before {
        background: var(--amber);
        color: #fff;
      }

      .steps li p:first-child {
        font-weight: 700;
        font-size: 15px;
        color: var(--charcoal);
        margin-bottom: 0;
      }

      .steps li p:last-child {
        font-size: 14px;
        color: var(--stone);
        line-height: 1.65;
        margin: 0;
      }

      @media (max-width: 800px) {
        .cols bh-split {
          grid-template-columns: 1fr !important;
        }
        article + article {
          border-top: 2px solid var(--parchment);
        }
      }

      @media (max-width: 540px) {
        section {
          padding-block: 64px;
        }
        article {
          padding: 28px 24px;
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
      <section id="how" aria-label=${t.how.headline}>
        <bh-center max="1040px" gutters="lg">
        <header class="reveal">
          <p class="section-label">${t.how.label}</p>
          <h2>${t.how.headline}</h2>
          <div class="header-body">${renderToken(t.how.body)}</div>
        </header>
        <div class="cols reveal">
          <bh-split ratio="1/1">
            <article class="col-np">
              <div class="col-label">
                <span class="col-label-np">${t.how.nonprofitsLabel}</span>
              </div>
              <div class="steps">${renderToken(t.how.nonprofits)}</div>
            </article>
            <article class="col-eng">
              <div class="col-label">
                <span class="col-label-eng">${t.how.engineersLabel}</span>
              </div>
              <div class="steps">${renderToken(t.how.engineers)}</div>
            </article>
          </bh-split>
        </div>
        </bh-center>
      </section>
    `;
  }
}
