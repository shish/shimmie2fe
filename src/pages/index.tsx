import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { ErrorPage } from "./ErrorPage/ErrorPage";
import { PostList } from "./PostList/PostList";
import { PostView } from "./PostView/PostView";
import { Signup } from "./Signup/Signup";
import { Root } from "./Root/Root";
import { About } from "./About/About";
import { WikiPage } from "./WikiPage/WikiPage";
import { UserPage } from "./UserPage/UserPage";
import { TagsPage } from "./TagsPage/TagsPage";
import { Messages } from "./Messages/Messages";
import { Comments } from "./Comments/Comments";
import { Upload } from "./Upload/Upload";

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
            <Route path="tags/:layout" element={<TagsPage />} />
        </Route>,
    ),
);