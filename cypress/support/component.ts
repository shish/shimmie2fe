// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18'
import React from "react";
import "../../src/static/style.scss";
import { DevApp } from '../../src/App';
import { GET_ME } from '../../src/LoginProvider';
import { MountOptions, MountReturn } from 'cypress/react'
import { Permission } from '../../src/gql/graphql';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      mount(
        component: React.ReactNode,
        options?: MountOptions & { mocks?: any[] }
      ): Cypress.Chainable<MountReturn>
    }
  }
}

//Cypress.Commands.add('mount', mount)
Cypress.Commands.add('mount', (component, options: any = {}) => {
  let mocks = options.mocks ?? [];
  // DevApp includes LoginProvider which does this
  mocks.unshift({
    request: {
      query: GET_ME,
      variables: {}
    },
    result: {
      data: {
        me: {
          __typename: "User",
          name: "Mochael",
          private_message_unread_count: 0,
          avatar_url: "https://www.gravatar.com/avatar/fd4960ec4e2fde2de7d56dbdf5b00c1c.jpg?s=80&d=&r=g&cacheBreak=2023-02-19",
          class: {
            permissions: [
              Permission.EditImageTag
            ],
          }
        }
      }
    }
  });
  const provider = React.createElement(DevApp, { component, mocks });
  return mount(provider, options)
})

// Example use:
// cy.mount(<MyComponent />)