import React from "react";

export function Block(props: { className?: string; children: React.ReactNode | React.ReactNode[] }) {
    return (
        <section className={"block " + props.className}>
            {props.children}
        </section>
    );
}
