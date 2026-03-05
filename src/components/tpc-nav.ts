import { html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { BaseElement, trapFocus } from "@bruk-io/bh-01";
import { t } from "../tokens/index.js";
import "./tpc-logo.js";

@customElement("tpc-nav")
export class TpcNav extends BaseElement {
  static styles = [
    BaseElement.styles,
    css`
      :host {
        display: block;
        position: sticky;
        top: 0;
        z-index: 100;
        --bh-focus-color: var(--cream);
      }

      nav {
        background: var(--green);
        padding: 0 24px;
        height: 60px;
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
      }

      bh-repel {
        height: 100%;
      }

      .nav-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
      }

      .nav-mark {
        width: 34px;
        height: 34px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .nav-name {
        font-family: "Fraunces", Georgia, serif;
        font-weight: 700;
        font-size: 16px;
        color: var(--cream);
        letter-spacing: -0.02em;
      }

      bh-cluster a {
        font-size: 14px;
        font-weight: 500;
        color: var(--moss);
        text-decoration: none;
        transition: color 0.15s;
      }

      bh-cluster a:hover,
      bh-cluster a.active {
        color: var(--cream);
      }

      .nav-cta {
        background: var(--amber);
        color: #fff !important;
        padding: 7px 16px;
        border-radius: 7px;
        font-weight: 600 !important;
        font-size: 13px !important;
        transition: background 0.15s !important;
      }

      .nav-cta:hover {
        background: var(--amber-l) !important;
        color: #fff !important;
      }

      .nav-hamburger {
        display: none;
        cursor: pointer;
        background: none;
        border: none;
        padding: 4px;
      }

      .nav-hamburger span {
        display: block;
        width: 22px;
        height: 2px;
        background: var(--cream);
        margin: 5px 0;
        border-radius: 2px;
        transition: all 0.2s;
      }

      .mobile-menu {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 99;
        background: var(--green);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 32px;
      }

      .mobile-menu.open {
        display: flex;
      }

      .mobile-menu a {
        font-family: "Fraunces", Georgia, serif;
        font-size: 28px;
        font-weight: 700;
        color: var(--cream);
        text-decoration: none;
        letter-spacing: -0.02em;
        transition: color 0.15s;
      }

      .mobile-menu a:hover {
        color: var(--amber-l);
      }

      .mobile-menu a.accent {
        color: var(--amber-l);
      }

      .mobile-close {
        position: absolute;
        top: 16px;
        right: 24px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 28px;
        color: var(--cream);
        line-height: 1;
      }

      @media (max-width: 800px) {
        bh-cluster {
          display: none;
        }
        .nav-hamburger {
          display: block;
        }
      }
    `,
  ];

  @state() private _menuOpen = false;
  @state() private _activeSection = "";

  private _sections: Element[] = [];
  private _scrollHandler = () => this._updateActive();
  private _releaseFocusTrap?: () => void;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("scroll", this._scrollHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("scroll", this._scrollHandler);
    this._releaseFocusTrap?.();
    if (this._menuOpen) {
      document.body.style.overflow = "";
    }
  }

  private static _sectionMap: [string, string][] = [
    ["tpc-hero", "hero"],
    ["tpc-about", "about"],
    ["tpc-how", "how"],
    ["tpc-contact", "contact"],
  ];

  firstUpdated() {
    this._sections = TpcNav._sectionMap
      .map(([tag]) => document.querySelector(tag))
      .filter((el): el is Element => el !== null);
    this._updateActive();
  }

  private _updateActive() {
    let current = "";
    for (const s of this._sections) {
      const el = s as HTMLElement;
      if (window.scrollY >= el.offsetTop - 120) {
        const entry = TpcNav._sectionMap.find(([tag]) => tag === el.tagName.toLowerCase());
        current = entry?.[1] ?? "";
      }
    }
    this._activeSection = current;
  }

  private _toggleMenu() {
    this._menuOpen = !this._menuOpen;
    document.body.style.overflow = this._menuOpen ? "hidden" : "";
    if (this._menuOpen) {
      this.updateComplete.then(() => {
        const menu = this.shadowRoot!.getElementById("mobile-menu");
        if (menu) {
          this._releaseFocusTrap = trapFocus(menu);
          const firstLink = menu.querySelector<HTMLElement>("a");
          firstLink?.focus();
        }
      });
    } else {
      this._releaseFocusTrap?.();
      this._releaseFocusTrap = undefined;
    }
  }

  private _closeMenu() {
    this._menuOpen = false;
    document.body.style.overflow = "";
    this._releaseFocusTrap?.();
    this._releaseFocusTrap = undefined;
    const hamburger = this.shadowRoot!.querySelector<HTMLElement>(".nav-hamburger");
    hamburger?.focus();
  }

  private _onMenuKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this._closeMenu();
    }
  }

  render() {
    return html`
      <nav>
        <bh-repel align="center">
          <a href="#" class="nav-logo">
            <div class="nav-mark"><tpc-logo size="sm" variant="light"></tpc-logo></div>
            <span class="nav-name">${t.nav.name}</span>
          </a>
          <bh-cluster gap="lg" align="center" style="--bh-cluster-gap: 28px;">
            <a
              href="#about"
              class=${this._activeSection === "about" ? "active" : ""}
              >${t.nav.about}</a
            >
            <a
              href="#how"
              class=${this._activeSection === "how" ? "active" : ""}
              >${t.nav.how}</a
            >
            <a href="#contact" class="nav-cta">${t.nav.cta}</a>
          </bh-cluster>
          <button
            class="nav-hamburger"
            @click=${this._toggleMenu}
            aria-label=${t.nav.menuLabel}
            aria-expanded="${this._menuOpen}"
            aria-controls="mobile-menu"
          >
            <span></span><span></span><span></span>
          </button>
        </bh-repel>
      </nav>

      <div
        id="mobile-menu"
        class="mobile-menu ${this._menuOpen ? "open" : ""}"
        role="dialog"
        aria-label=${t.nav.menuAriaLabel}
        @keydown=${this._onMenuKeydown}
      >
        <button class="mobile-close" @click=${this._closeMenu} aria-label=${t.nav.closeMenu}>
          &times;
        </button>
        <a href="#about" @click=${this._closeMenu}>${t.nav.about}</a>
        <a href="#how" @click=${this._closeMenu}>${t.nav.how}</a>
        <a href="#contact" @click=${this._closeMenu} class="accent"
          >${t.nav.cta} &rarr;</a
        >
      </div>
    `;
  }
}
