import React, { useState } from "react";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    HttpLink,
} from "@apollo/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import { ErrorPage } from "./pages/ErrorPage";
import { PostList } from "./pages/PostList";
import { PostView } from "./pages/PostView";
import { Signup } from "./pages/Signup";
import { Root } from "./pages/Root";

export const serverInfo = {
    name: "My Site",
    root: "http://127.0.0.1:8000",
};

const createApolloClient = () => {
    const httpLink = new HttpLink({
        uri: serverInfo.root + "/graphql",
    });
    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem("session");
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};

function defaultLoader(props) {
    return props.params;
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
            <Route index element={<PostList />} />
            <Route
                path="post/:post_id"
                element={<PostView />}
                loader={defaultLoader}
            />
            <Route path="signup" element={<Signup />} />
            {/* ... etc. */}
        </Route>,
    ),
);

export function App() {
    const [client] = useState(createApolloClient());

    return (
        <ApolloProvider client={client}>
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        </ApolloProvider>
    );
}
