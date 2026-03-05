import { marked } from "marked";
import aboutBody from "../content/about.md";
import howBody from "../content/how.md";
import howNonprofits from "../content/how-nonprofits.md";
import howEngineers from "../content/how-engineers.md";
import heroBody from "../content/hero.md";
import contactBody from "../content/contact.md";

const md = (s: string) => marked.parse(s) as string;

export const enCA = {
  global: {
    name: "Bruk Habtu",
    email: "bruk.habtu@gmail.com",
  },
  meta: {
    title: "The Public Code \u2014 A software engineer giving back",
    description:
      "I\u2019m a software engineer in Toronto. I help non-profits with the technical problems I know how to solve. No invoice, ever.",
  },
  nav: {
    name: "The Public Code",
    about: "About",
    how: "How it works",
    cta: "Get in touch",
    menuLabel: "Menu",
    menuAriaLabel: "Navigation menu",
    closeMenu: "Close menu",
  },
  hero: {
    ariaLabel: "Introduction",
    body: heroBody,
    cta: "Describe your problem",
    secondary: "How it works",
  },
  about: {
    ariaLabel: "About us",
    label: "Founder",
    role: "Software engineer \u00b7 Toronto, ON",
    body: aboutBody,
    quote: md(
      "Not every non-profit needs a complex system. I\u2019ll tell you honestly when <strong>something simple will do.</strong>",
    ),
    stats: [
      { value: "15+", label: "Years building software professionally" },
      { value: "$0", label: "Cost to non-profits. Always." },
      { value: "1", label: "Engineer, for now \u2014 honest about that" },
      { value: "Few", label: "Projects taken on at a time, done properly" },
    ],
  },
  how: {
    label: "Process",
    headline: "Simple. No bureaucracy.",
    body: howBody,
    nonprofitsLabel: "For non-profits",
    engineersLabel: "For engineers",
    nonprofits: howNonprofits,
    engineers: howEngineers,
  },
  contact: {
    ariaLabel: "Contact",
    label: "Get in touch",
    body: contactBody,
    secondary: "How it works",
  },
  footer: {
    name: "The Public Code",
    tagline: "TORONTO \u00b7 FREE FOREVER",
  },
};
