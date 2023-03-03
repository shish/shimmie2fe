import React, { UIEvent, useState } from "react";
import { Outlet } from "react-router-dom"; // ScrollRestoration
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import css from "./Root.module.scss";
import "./style.scss";

export function Root() {
    const [prevScroll, setPrevScroll] = useState(0);

    const onScroll = (event: UIEvent) => {
        var header = document.getElementById("site-header");
        if (header) {
            var curScroll = (event.target as HTMLElement).scrollTop;
            if (curScroll > prevScroll) {
                header.style.top = -header.clientHeight + "px";
            } else if (curScroll < prevScroll) {
                header.style.top = "0px";
            }
            setPrevScroll(curScroll);
        }
    };

    // FIXME: check that ScrollRestoration actually works, since
    // we're scrolling a div and not the whole page
    //             <ScrollRestoration />
    return (
        <div className={css.page} onScroll={onScroll}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
