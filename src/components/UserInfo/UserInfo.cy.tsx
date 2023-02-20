/// <reference types="Cypress" />
/// <reference path="../../../cypress/support/component.ts" />

import React from "react";
import { UserInfo } from ".";

describe('test', () => {
  const user = {
    name: "BillyBob",
    avatar_url: "https://www.gravatar.com/avatar/fd4960ec4e2fde2de7d56dbdf5b00c1c.jpg?s=80&d=&r=g&cacheBreak=2023-02-19",
    join_date: '2020-01-01 12:34:56',
  };
  it('playground', () => {
    cy.mount(<UserInfo user={user} />)
  })
})
