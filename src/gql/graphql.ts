/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String'];
  owner: User;
  posted: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create_comment: Scalars['Boolean'];
  create_private_message: Scalars['Boolean'];
  create_vote: Scalars['Boolean'];
};


export type MutationCreate_CommentArgs = {
  comment: Scalars['String'];
  post_id: Scalars['Int'];
};


export type MutationCreate_Private_MessageArgs = {
  message: Scalars['String'];
  subject: Scalars['String'];
  to_id: Scalars['Int'];
};


export type MutationCreate_VoteArgs = {
  post_id: Scalars['Int'];
  score: Scalars['Int'];
};

export type NumericScoreVote = {
  __typename?: 'NumericScoreVote';
  post: Post;
  score: Scalars['Int'];
  user: User;
};

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  ext: Scalars['String'];
  filename: Scalars['String'];
  filesize: Scalars['Int'];
  hash: Scalars['String'];
  height: Scalars['Int'];
  id?: Maybe<Scalars['Int']>;
  image_link: Scalars['String'];
  info: Scalars['String'];
  mime: Scalars['String'];
  nice_name: Scalars['String'];
  owner: User;
  score: Scalars['Int'];
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  thumb_link: Scalars['String'];
  tooltip: Scalars['String'];
  votes: Array<NumericScoreVote>;
  width: Scalars['Int'];
};

export type PrivateMessage = {
  __typename?: 'PrivateMessage';
  from: User;
  id: Scalars['Int'];
  is_read: Scalars['Boolean'];
  message: Scalars['String'];
  subject: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
  tags?: Maybe<Array<Maybe<TagUsage>>>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryTagsArgs = {
  limit: Scalars['Int'];
  search: Scalars['String'];
};

export type TagUsage = {
  __typename?: 'TagUsage';
  tag: Scalars['String'];
  uses: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  class: UserClass;
  id: Scalars['Int'];
  name: Scalars['String'];
  private_messages?: Maybe<Array<PrivateMessage>>;
};

export type UserClass = {
  __typename?: 'UserClass';
  name?: Maybe<Scalars['String']>;
  permissions: Array<Scalars['String']>;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', name: string } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id?: number | null, hash: string, image_link: string, thumb_link: string } | null> | null };


export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"12"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"image_link"}},{"kind":"Field","name":{"kind":"Name","value":"thumb_link"}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;