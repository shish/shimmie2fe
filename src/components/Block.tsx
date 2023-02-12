import React, { useState } from "react";

export function Block(props) {
    let style = {};
    if (props.left) style["textAlign"] = "left";
    return (
        <section style={style} className={props.className}>
            {props.children}
        </section>
    );
}
