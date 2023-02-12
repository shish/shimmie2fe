import React, { useState } from "react";
import { useRouteError } from "react-router-dom";

export function ErrorPage(props) {
    const error: any = props.error ?? useRouteError();
    console.error(error);

    return (
        <article id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </article>
    );
}
