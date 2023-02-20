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
import { About } from "./pages/About";
import { WikiPage } from "./pages/WikiPage";
import { UserPage } from "./pages/UserPage";
import { Messages } from "./pages/Messages";
import { Comments } from "./pages/Comments";
import { Upload } from "./pages/Upload";
import { serverInfo } from "./utils";
import { LoginProvider } from "./LoginProvider";

import "./static/style.scss";

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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
            <Route index element={<PostList />} />
            <Route path="about" element={<About />} />
            <Route path="comments" element={<Comments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="posts" element={<PostList />} />
            <Route path="post/:post_id" element={<PostView />} />
            <Route path="signup" element={<Signup />} />
            <Route path="upload" element={<Upload />} />
            <Route path="user/:user_name" element={<UserPage />} />
            <Route path="wiki/:page_title" element={<WikiPage />} />
        </Route>,
    ),
);

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
