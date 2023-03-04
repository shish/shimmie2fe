import React from "react";
import { Outlet } from "react-router-dom"; // ScrollRestoration
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import css from "./Root.module.scss";
import "./style.scss";
import { ScrollProvider } from "../../providers/ScrollProvider";

export function Root() {
    // FIXME: check that ScrollRestoration actually works, since
    // we're scrolling a div and not the whole page
    //             <ScrollRestoration />
    return (
        <ScrollProvider className={css.page}>
            <Header />
            <Outlet />
            <Footer />
        </ScrollProvider>
    );
}
