/// <reference types="Cypress" />
/// <reference path="../../../cypress/support/component.ts" />

import React from "react";
import { PostMetaData } from ".";
import { PostMetadataFragmentFragment, PostScoreFragmentFragment } from "../../gql/graphql";

describe('test', () => {
  it('playground', () => {
    const post: PostMetadataFragmentFragment&PostScoreFragmentFragment = {
      post_id: 123,
      tags: ["my", "test", "tags"],
      locked: false,
      info: "400x800 // 2.8KB // jpg",
      score: 0,
      my_vote: 1,
      posted: "2020-01-01 00:12:34",
      owner: {
        name: "BillyBob",
        avatar_url: "https://www.gravatar.com/avatar/fd4960ec4e2fde2de7d56dbdf5b00c1c.jpg?s=80&d=&r=g&cacheBreak=2023-02-19",
      }
    };
    cy.mount(<PostMetaData post={post} postQ={null} />)
  })
})
