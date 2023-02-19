/// <reference types="Cypress" />
/// <reference path="../../../cypress/support/component.ts" />

import React from "react";
import { Header } from ".";

describe('test', () => {
  it('playground', () => {
    cy.mount(<Header />)
  })
})
