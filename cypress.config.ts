import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "**/*.cye.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },

  component: {
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    // FIXME: internal web server used for components doesn't do coverage
    // like `react-scripts -r @cypress/instrument-cra start` does...
    // Maybe https://github.com/bindea-mihai/cypress-gherkin-ct/blob/code-coverage-tryout/cypress.config.ts
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },
});
