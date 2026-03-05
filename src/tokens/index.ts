import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { enCA } from "./enCA.js";

export const t = enCA;
export const renderToken = (token: string) => unsafeHTML(token);

const globals = t.global as Record<string, string>;

export const fill = (s: string) =>
  s.replace(/\{\{(\w+)\}\}/g, (_, key: string) => globals[key] ?? `{{${key}}}`);
