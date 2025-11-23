import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { MockedProvider } from "@apollo/client/testing/react";
import { MockLink } from "@apollo/client/testing";
import { offsetLimitPagination } from "@apollo/client/utilities";
import React, { useState } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { router } from "./pages";
import { ErrorBoundary } from "./pages/ErrorPage/ErrorPage";
import { LoginProvider } from "./providers/LoginProvider";
import { serverInfo } from "./utils";

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
            };
        } else {
            return { headers };
        }
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        posts: offsetLimitPagination(["tags"]),
                    },
                },
            },
        }),
    });
};

type AppProps = {
    router: any;
    client?: ApolloClient;
    mocks?: MockLink.MockedResponse[];
};

export function AppWithMiddleware({ client, router, mocks }: AppProps) {
    let app = <RouterProvider router={router} />;
    app = <LoginProvider>{app}</LoginProvider>;
    if (client) {
        app = <ApolloProvider client={client}>{app}</ApolloProvider>;
    } else if (mocks) {
        app = (
            <MockedProvider mocks={mocks}>
                {app}
            </MockedProvider>
        );
    }
    app = <ErrorBoundary>{app}</ErrorBoundary>;
    app = <React.StrictMode>{app}</React.StrictMode>;
    return app;
}

// Set up all the app scaffolding (login, router, etc) but only
// holding a single component, for easy component testing
export function DevApp({ component, mocks }: { component: any; mocks: any[] }) {
    const FAKE_EVENT = { name: "test event" };
    const routes = [
        {
            path: "/events/:id",
            element: component,
            loader: () => FAKE_EVENT,
        },
    ];
    const router = createMemoryRouter(routes, {
        initialEntries: ["/", "/events/123"],
        initialIndex: 1,
    });

    return <AppWithMiddleware mocks={mocks} router={router} />;
}

export function App() {
    const [client] = useState(createApolloClient());

    return <AppWithMiddleware client={client} router={router} />;
}
