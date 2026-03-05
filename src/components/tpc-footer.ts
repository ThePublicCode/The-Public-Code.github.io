import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseElement } from "@bruk-io/bh-01";
import { t } from "../tokens/index.js";
import "./tpc-logo.js";

@customElement("tpc-footer")
export class TpcFooter extends BaseElement {
  static styles = [
    BaseElement.styles,
    css`
      :host {
        display: block;
      }

      footer {
        background: var(--charcoal);
        padding: 32px 24px;
      }

      .left {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .name {
        font-family: "Fraunces", Georgia, serif;
        font-size: 16px;
        font-weight: 700;
        color: var(--cream);
        letter-spacing: -0.02em;
      }

      .right {
        font-family: "DM Mono", monospace;
        font-size: 11px;
        color: #4a4a46;
        letter-spacing: 0.08em;
      }
    `,
  ];

  render() {
    return html`
      <footer role="contentinfo">
        <bh-repel align="center">
          <div class="left">
            <tpc-logo variant="dark"></tpc-logo>
            <span class="name">${t.footer.name}</span>
          </div>
          <div class="right">${t.footer.tagline}</div>
        </bh-repel>
      </footer>
    `;
  }
}
