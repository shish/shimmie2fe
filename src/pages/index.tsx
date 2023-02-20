import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { ErrorPage } from "./ErrorPage";
import { PostList } from "./PostList";
import { PostView } from "./PostView";
import { Signup } from "./Signup";
import { Root } from "./Root";
import { About } from "./About";
import { WikiPage } from "./WikiPage";
import { UserPage } from "./UserPage";
import { Messages } from "./Messages";
import { Comments } from "./Comments";
import { Upload } from "./Upload";

export const router = createBrowserRouter(
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