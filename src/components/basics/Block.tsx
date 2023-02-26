import React from "react";

export function Block(props: { className?: string; children: Children }) {
    return (
        <section className={"block " + props.className}>
            {props.children}
        </section>
    );
}
