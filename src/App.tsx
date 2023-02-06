import React from "react";
import { NavBar } from "./components/NavBar";
import { ThumbnailGrid } from "./components/ThumbnailGrid";

export function Body(props) {
    return <section>
        {props.children}
    </section>;
}

export function App() {
    return <article>
        <NavBar />
        <Body>
            <ThumbnailGrid posts={[1,2,3,4,5,6,7,7,8,9,0]} />
        </Body>
    </article>;
}