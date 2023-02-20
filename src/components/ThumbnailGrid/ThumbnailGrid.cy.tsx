/// <reference types="Cypress" />
/// <reference path="../../../cypress/support/component.ts" />

import React from "react";
import { ThumbnailGrid } from ".";

describe('test', () => {
  const posts: any[] = [];
  it('playground', () => {
    cy.mount(<ThumbnailGrid posts={posts} />)
  })
})
