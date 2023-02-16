import React from "react";

export function Block(props: {
    align?: string,
    className?: string,
    children: Children
}) {
    let style = {};
    if (props.align) style["textAlign"] = props.align;
    return (
        <section style={style} className={"block " + props.className}>
            {props.children}
        </section>
    );
}
