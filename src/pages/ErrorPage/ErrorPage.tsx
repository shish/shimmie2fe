import React from "react";
import { useRouteError } from "react-router-dom";
import { Block } from "../../components/basics";

export function ErrorPage(props: any) {
    const routeError = useRouteError();
    const error: any = props.error ?? routeError;
    console.error(error);

    return (
        <article id="error-page">
            <Block>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </Block>
        </article>
    );
}
