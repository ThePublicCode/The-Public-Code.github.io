import "@bruk-io/bh-01/tokens";
import "@bruk-io/bh-01/theme";
import "./theme.css";
import "./style.css";
import "./components/tpc-nav";
import "./components/tpc-hero";
import "./components/tpc-about";
import "./components/tpc-how";
import "./components/tpc-contact";
import "./components/tpc-footer";
import { t } from "./tokens/index.js";

document.title = t.meta.title;
document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
