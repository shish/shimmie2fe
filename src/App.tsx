import React, { useState } from "react";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    HttpLink,
} from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing"
import {
    createMemoryRouter,
    RouterProvider,
} from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import { router } from "./pages";
import { serverInfo } from "./utils";
import { LoginProvider } from "./providers/LoginProvider";

const createApolloClient = () => {
    const httpLink = new HttpLink({
        uri: serverInfo.root + "/graphql",
    });
    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem("session");
        // return the headers to the context so httpLink can read them
        if (token) {
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${token}`,
                },
            }
        } else {
            return { headers };
        }
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};


// Set up all the app scaffolding (login, router, etc) but only
// holding a single component, for easy component testing
export function DevApp({ component, mocks }: { component: any, mocks: any[] }) {
    const FAKE_EVENT = { name: "test event" };
    const tree =
        <React.StrictMode>
            <MockedProvider mocks={mocks} addTypename={true}>
                <LoginProvider>
                    {component}
                </LoginProvider>
            </MockedProvider>
        </React.StrictMode>;
    const routes = [
        {
            path: "/events/:id",
            element: tree,
            loader: () => FAKE_EVENT,
        },
    ];
    const router = createMemoryRouter(routes, {
        initialEntries: ["/", "/events/123"],
        initialIndex: 1,
    });

    // router on the outside so that it can handle errors from other middleware
    return <RouterProvider router={router} />;
}

export function App() {
    const [client] = useState(createApolloClient());

    return (
        <React.StrictMode>
            <ApolloProvider client={client}>
                <LoginProvider>
                    <RouterProvider router={router} />
                </LoginProvider>
            </ApolloProvider>
        </React.StrictMode>
    );
}
