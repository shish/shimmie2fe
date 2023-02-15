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
import { About } from "./pages/About";
import { WikiPage } from "./pages/WikiPage";
import { UserPage } from "./pages/UserPage";
import { Messages } from "./pages/Messages";
import { Comments } from "./pages/Comments";
import { Upload } from "./pages/Upload";
import { serverInfo } from "./utils";
import { LoginProvider } from "./LoginProvider";

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

function dl(props) {
    return props.params;
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
            <Route index element={<PostList />} />
            <Route path="about" element={<About />} />
            <Route path="comments" element={<Comments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="posts" element={<PostList />} />
            <Route path="post/:post_id" element={<PostView />} loader={dl} />
            <Route path="signup" element={<Signup />} />
            <Route path="upload" element={<Upload />} />
            <Route path="user/:user_name" element={<UserPage />} />
            <Route path="wiki/:page_title" element={<WikiPage />} />
        </Route>,
    ),
);

export function App() {
    const [client] = useState(createApolloClient());

    return (
        <ApolloProvider client={client}>
            <React.StrictMode>
                <LoginProvider>
                    <RouterProvider router={router} />
                </LoginProvider>
            </React.StrictMode>
        </ApolloProvider>
    );
}
