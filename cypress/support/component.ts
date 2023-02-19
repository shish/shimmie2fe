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

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

//Cypress.Commands.add('mount', mount)

//import { mount } from 'cypress/react18'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import React from "react";

Cypress.Commands.add('mount', (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options

  const FAKE_EVENT = { name: "test event" };
  const routes = [
    {
      path: "/events/:id",
      element: component, //React.createElement(component),
      loader: () => FAKE_EVENT,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/events/123"],
    initialIndex: 1,
  });
  const provider = React.createElement(RouterProvider, {router});

  return mount(provider, mountOptions)
})

import "../../src/static/style.scss";

// Example use:
// cy.mount(<MyComponent />)