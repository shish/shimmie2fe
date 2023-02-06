import React, { useState } from "react";
import * as css from './Block.module.scss';

export function Block(props) {
    return <div className={css.block}>
        {props.children}
    </div>
}