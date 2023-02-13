import React from "react";

export function Block(props: {align?: string, className?: string, children: React.ReactNode}) {
    let style = {};
    if (props.align) style["textAlign"] = props.align;
    return (
        <section style={style} className={props.className}>
            {props.children}
        </section>
    );
}
