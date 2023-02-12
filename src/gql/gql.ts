/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    fragment CommentItem on Comment {\n        comment_id\n        owner {\n            name\n        }\n        comment\n    }\n": types.CommentItemFragmentDoc,
    "\n    mutation createComment($post_id: Int!, $comment: String!) {\n        create_comment(post_id: $post_id, comment: $comment)\n    }\n": types.CreateCommentDocument,
    "\n    mutation login($name: String!, $pass: String!) {\n        login(name: $name, pass: $pass) {\n            user {\n                name\n                private_message_unread_count\n                avatar_url\n            }\n            session\n            error\n        }\n    }\n": types.LoginDocument,
    "\n    query getMe {\n        me {\n            name\n            private_message_unread_count\n            avatar_url\n        }\n    }\n": types.GetMeDocument,
    "\n    query getTags($start: String!) {\n        tags(search: $start, limit: 10) {\n            tag\n            uses\n        }\n    }\n": types.GetTagsDocument,
    "\n    query getPosts($start: Int, $tags: [String!]) {\n        posts(start: $start, limit: 48, tags: $tags) {\n            id\n            image_link\n            thumb_link\n            tooltip\n        }\n    }\n": types.GetPostsDocument,
    "\n    query getPost($post_id: Int!) {\n        post(id: $post_id) {\n            id\n            hash\n            owner {\n                name\n                avatar_url\n            }\n            tags\n            source\n            locked\n            info\n            posted\n            image_link\n            thumb_link\n            score\n            comments {\n                comment_id\n                owner {\n                    name\n                    avatar_url\n                }\n                comment\n            }\n        }\n    }\n": types.GetPostDocument,
    "\n    query getUser($user: String!) {\n        user(name: $user) {\n            name\n        }\n    }\n": types.GetUserDocument,
    "\n    query getWiki($title: String!) {\n        wiki(title: $title) {\n            title\n            body\n            revision\n            date\n            owner {\n                name\n            }\n        }\n    }\n": types.GetWikiDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment CommentItem on Comment {\n        comment_id\n        owner {\n            name\n        }\n        comment\n    }\n"): (typeof documents)["\n    fragment CommentItem on Comment {\n        comment_id\n        owner {\n            name\n        }\n        comment\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createComment($post_id: Int!, $comment: String!) {\n        create_comment(post_id: $post_id, comment: $comment)\n    }\n"): (typeof documents)["\n    mutation createComment($post_id: Int!, $comment: String!) {\n        create_comment(post_id: $post_id, comment: $comment)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation login($name: String!, $pass: String!) {\n        login(name: $name, pass: $pass) {\n            user {\n                name\n                private_message_unread_count\n                avatar_url\n            }\n            session\n            error\n        }\n    }\n"): (typeof documents)["\n    mutation login($name: String!, $pass: String!) {\n        login(name: $name, pass: $pass) {\n            user {\n                name\n                private_message_unread_count\n                avatar_url\n            }\n            session\n            error\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getMe {\n        me {\n            name\n            private_message_unread_count\n            avatar_url\n        }\n    }\n"): (typeof documents)["\n    query getMe {\n        me {\n            name\n            private_message_unread_count\n            avatar_url\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getTags($start: String!) {\n        tags(search: $start, limit: 10) {\n            tag\n            uses\n        }\n    }\n"): (typeof documents)["\n    query getTags($start: String!) {\n        tags(search: $start, limit: 10) {\n            tag\n            uses\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getPosts($start: Int, $tags: [String!]) {\n        posts(start: $start, limit: 48, tags: $tags) {\n            id\n            image_link\n            thumb_link\n            tooltip\n        }\n    }\n"): (typeof documents)["\n    query getPosts($start: Int, $tags: [String!]) {\n        posts(start: $start, limit: 48, tags: $tags) {\n            id\n            image_link\n            thumb_link\n            tooltip\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getPost($post_id: Int!) {\n        post(id: $post_id) {\n            id\n            hash\n            owner {\n                name\n                avatar_url\n            }\n            tags\n            source\n            locked\n            info\n            posted\n            image_link\n            thumb_link\n            score\n            comments {\n                comment_id\n                owner {\n                    name\n                    avatar_url\n                }\n                comment\n            }\n        }\n    }\n"): (typeof documents)["\n    query getPost($post_id: Int!) {\n        post(id: $post_id) {\n            id\n            hash\n            owner {\n                name\n                avatar_url\n            }\n            tags\n            source\n            locked\n            info\n            posted\n            image_link\n            thumb_link\n            score\n            comments {\n                comment_id\n                owner {\n                    name\n                    avatar_url\n                }\n                comment\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUser($user: String!) {\n        user(name: $user) {\n            name\n        }\n    }\n"): (typeof documents)["\n    query getUser($user: String!) {\n        user(name: $user) {\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getWiki($title: String!) {\n        wiki(title: $title) {\n            title\n            body\n            revision\n            date\n            owner {\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query getWiki($title: String!) {\n        wiki(title: $title) {\n            title\n            body\n            revision\n            date\n            owner {\n                name\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;