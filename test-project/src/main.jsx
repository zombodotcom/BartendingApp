// src/main.jsx
import { render } from "preact";
import { App } from "./app.jsx";

// 1) Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// (Optional) import your own global styles if needed
// import './index.css'

render(<App />, document.getElementById("app"));
