import { html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { BaseElement } from "@bruk-io/bh-01";

const COLORS = {
  light: { left: "#F8F4EE", right: "#D97B2A", dot: "#F8F4EE" },
  dark: { left: "#92BDB0", right: "#D97B2A", dot: "#92BDB0" },
} as const;

const ANIM_COLORS = { moss: "#7EAA9B", cream: "#F8F4EE" };

type Variant = "light" | "dark";
type LogoSize = "sm" | "md" | "lg";

const SIZE_PX: Record<LogoSize, number> = { sm: 18, md: 24, lg: 48 };

interface AnimState {
  dotCy: number;
  dotFill: string;
  hookOp: number;
  hookDY: number;
  leftX: number | null;
  rightX: number | null;
}

@customElement("tpc-logo")
export class TpcLogo extends BaseElement {
  static styles = [
    BaseElement.styles,
    css`
      :host {
        display: inline-block;
        line-height: 0;
      }
      svg {
        display: block;
        shape-rendering: geometricPrecision;
        overflow: visible;
      }
    `,
  ];

  @property({ reflect: true }) size: LogoSize = "md";
  @property({ reflect: true }) variant: Variant = "light";
  @property({ type: Boolean }) animated = false;
  @property({ type: Boolean }) autoplay = false;

  @state() private _anim: AnimState = {
    dotCy: 16.5,
    dotFill: ANIM_COLORS.moss,
    hookOp: 1,
    hookDY: 0,
    leftX: null,
    rightX: null,
  };

  private get _sizePx(): number {
    return SIZE_PX[this.size] ?? SIZE_PX.md;
  }

  private _running = false;
  private _autoplayTimer?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    super.connectedCallback();
    if (this.animated && this.autoplay) {
      this._autoplayTimer = setTimeout(() => this.play(), 500);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._autoplayTimer) clearTimeout(this._autoplayTimer);
  }

  async play() {
    if (this._running || !this.animated) return;

    if (this._prefersReducedMotion()) {
      this._showFinalState();
      return;
    }

    this._running = true;
    this._anim = { dotCy: 16.5, dotFill: ANIM_COLORS.moss, hookOp: 1, hookDY: 0, leftX: null, rightX: null };

    await this._sleep(500);

    // Left bracket in
    this._patch({ leftX: -13 });
    await this._anim8(800, (t) => this._patch({ leftX: -13 * (1 - t) }), this._bounce);
    this._patch({ leftX: 0 });

    await this._sleep(150);

    // Right bracket in
    this._patch({ rightX: 13 });
    await this._anim8(800, (t) => this._patch({ rightX: 13 * (1 - t) }), this._bounce);
    this._patch({ rightX: 0 });

    await this._sleep(250);

    // Hook out + dot up
    await Promise.all([
      this._anim8(400, (_t, raw) => this._patch({ hookOp: 1 - raw, hookDY: -8 * raw }), this._smooth),
      this._anim8(550, (_t, raw) => this._patch({ dotCy: 16.5 - 5.5 * raw, dotFill: this._lerpColor(ANIM_COLORS.moss, ANIM_COLORS.cream, raw) }), this._spring),
    ]);

    this._patch({ dotCy: 11, dotFill: ANIM_COLORS.cream, hookOp: 0 });
    this._running = false;
  }

  private _showFinalState() {
    this._anim = { dotCy: 11, dotFill: ANIM_COLORS.cream, hookOp: 0, hookDY: 0, leftX: 0, rightX: 0 };
  }

  private _patch(partial: Partial<AnimState>) {
    this._anim = { ...this._anim, ...partial };
  }

  private _onClick() {
    if (this.animated && !this._running) {
      this.play();
    }
  }

  render() {
    if (!this.animated) {
      return this._renderStatic();
    }
    return this._renderAnimated();
  }

  private _renderStatic() {
    const c = COLORS[this.variant];
    const px = this._sizePx;
    return html`
      <svg
        width="${px}"
        height="${px}"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 4H5C4.45 4 4 4.45 4 5v3L2 11l2 3v3c0 .55.45 1 1 1h2"
          stroke="${c.left}"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 4h2c.55 0 1 .45 1 1v3l2 3-2 3v3c0 .55-.45 1-1 1h-2"
          stroke="${c.right}"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="11" cy="11" r="1.4" fill="${c.dot}" opacity="0.6" />
      </svg>
    `;
  }

  private _renderAnimated() {
    const s = this._anim;
    const c = COLORS[this.variant];
    const px = this._sizePx;
    const sc = px / 22;

    const hookStyle = s.hookOp <= 0.01
      ? "display:none"
      : `opacity:${s.hookOp};transform:translateY(${s.hookDY * sc}px)`;

    const leftStyle = s.leftX === null
      ? "display:none"
      : `transform:translateX(${s.leftX * sc}px)`;

    const rightStyle = s.rightX === null
      ? "display:none"
      : `transform:translateX(${s.rightX * sc}px)`;

    return html`
      <svg
        width="${px}"
        height="${px}"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
        @click=${this._onClick}
        style="cursor:pointer"
      >
        <path
          d="M8.8 7.2 C8.8 5.1 13.2 5.1 13.2 8.3 C13.2 10.5 11 11.0 11 12.4"
          stroke="${ANIM_COLORS.moss}"
          stroke-width="1.9"
          stroke-linecap="round"
          fill="none"
          style="${hookStyle}"
        />
        <circle
          cx="11"
          cy="${s.dotCy}"
          r="1.65"
          fill="${s.dotFill}"
        />
        <path
          d="M7 4H5C4.45 4 4 4.45 4 5v3L2 11l2 3v3c0 .55.45 1 1 1h2"
          stroke="${c.left}"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="${leftStyle}"
        />
        <path
          d="M15 4h2c.55 0 1 .45 1 1v3l2 3-2 3v3c0 .55-.45 1-1 1h-2"
          stroke="${c.right}"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="${rightStyle}"
        />
      </svg>
    `;
  }

  // --- Animation helpers ---

  private _bounce(t: number): number {
    if (t < 1 / 2.75) return 7.5625 * t * t;
    if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }

  private _spring(t: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  private _smooth(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private _hexRgb(h: string): [number, number, number] {
    return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  }

  private _lerpColor(a: string, b: string, t: number): string {
    const [ar, ag, ab] = this._hexRgb(a);
    const [br, bg, bb] = this._hexRgb(b);
    return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)})`;
  }

  private _anim8(dur: number, onTick: (eased: number, raw: number) => void, ease: (t: number) => number): Promise<void> {
    return new Promise((res) => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const raw = Math.min((now - t0) / dur, 1);
        onTick(ease(raw), raw);
        if (raw < 1) requestAnimationFrame(tick);
        else res();
      };
      requestAnimationFrame(tick);
    });
  }

  private _sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }

  private _prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}
