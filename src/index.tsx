/// <reference path='./index.d.ts'/>
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import reportWebVitals from '../src/reportWebVitals';

const container = document.getElementById("app");
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
reportWebVitals(console.log);
