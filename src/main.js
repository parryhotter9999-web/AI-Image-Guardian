import "./css/base.css";
import "./css/layout.css";
import "./css/components.css";
import "./css/animations.css";

import { App } from "./components/App.js";

const root = document.querySelector("#app");

root.appendChild(App());