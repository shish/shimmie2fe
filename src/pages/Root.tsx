import React, { useState, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import * as css from "./Root.module.scss";

export function Root() {
    const [prevScroll, setPrevScroll] = useState(0);

    const onScroll = (event) => {
        var header = document.getElementById("site-header");
        if (header) {
            var curScroll = event.target.scrollTop;
            if (curScroll > prevScroll) {
                // console.log("scroll down", header.style.top, header.clientHeight);
                header.style.top = -header.clientHeight + "px";
            } else if (curScroll < prevScroll) {
                // console.log("scroll up");
                header.style.top = "0px";
            }
        }
        setPrevScroll(curScroll);
    };

    return (
        <div className={css.page} onScroll={onScroll}>
            <ScrollRestoration />
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
