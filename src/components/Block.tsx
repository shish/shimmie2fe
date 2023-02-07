import React, { useState } from "react";
import * as css from "./Block.module.scss";

export function Block(props) {
    let style = {};
    if (props.left) style["textAlign"] = "left";
    return (
        <div style={style} className={css.block}>
            {props.children}
        </div>
    );
}
