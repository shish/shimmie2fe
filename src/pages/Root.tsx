import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Root() {
    return (
        <article>
            <Header />
            <section>
                <Outlet />
            </section>
            <Footer />
        </article>
    );
}
