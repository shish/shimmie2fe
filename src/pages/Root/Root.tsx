import { Outlet } from "react-router-dom"; // ScrollRestoration
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import css from "./Root.module.scss";
import "./style.scss";
import { useState } from "react";

// Using a global variable instead of useState because
// setState causes everything to be rerendered, using
// a lot of CPU
let prevScroll = 0;

export function Root() {
    const [down, setDown] = useState(false);
    const onScroll = (event: any) => {
        const el = event.target as HTMLElement;
        setDown(el.scrollTop > prevScroll);
        prevScroll = el.scrollTop;
    };

    // FIXME: check that ScrollRestoration actually works, since
    // we're scrolling a div and not the whole page
    //             <ScrollRestoration />
    return (
        <div className={css.page} onScroll={onScroll}>
            <Header display={!down} />
            <Outlet />
            <Footer />
        </div>
    );
}
