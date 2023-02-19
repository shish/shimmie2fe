/// <reference types="Cypress" />
/// <reference path="../../../cypress/support/component.ts" />

import React from "react";
import { Footer } from ".";

describe('test', () => {
  it('playground', () => {
    cy.mount(<Footer />)
  })
})
