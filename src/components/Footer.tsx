import React from "react";
import * as css from "./Footer.module.scss";

export function Footer(props) {
    return (
        <footer className={css.footer}>
            <a href="mailto:staff@paheal.net">Contact</a> !!!{" "}
            <a href="/wiki/Terms%20of%20use">Terms of use</a> !!!{" "}
            <a href="/wiki/Privacy%20policy">Privacy policy</a> !!!{" "}
            <a href="/wiki/2257">18 U.S.C. §2257</a>
            <hr />
            Media © their respective owners,{" "}
            <a href="https://code.shishnet.org/shimmie2/">Shimmie</a> ©{" "}
            <a href="https://www.shishnet.org/">Shish</a> &amp;{" "}
            <a href="https://github.com/shish/shimmie2/graphs/contributors">
                The Team
            </a>{" "}
            2023.
        </footer>
    );
}
