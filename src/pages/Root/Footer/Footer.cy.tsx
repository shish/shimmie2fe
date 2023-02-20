/// <reference types="Cypress" />
/// <reference path="../../../../cypress/support/component.ts" />

import React from "react";
import { Footer } from "./Footer";

describe('test', () => {
  it('playground', () => {
    cy.mount(<Footer />)
  })
})
