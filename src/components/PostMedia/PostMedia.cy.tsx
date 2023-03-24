/// <reference types="Cypress" />
/// <reference path="../../../cypress/support/component.ts" />

import React from "react";
import { PostMedia } from "./PostMedia";

// FIXME: test error handling
describe("PostMedia", () => {
    it("Renders Image", () => {
        const post = {
            mime: "image/jpeg",
            image_link: "https://placekitten.com/321/123",
        };
        cy.mount(<PostMedia post={post} />);
        cy.get('img[data-cy="media"]').should("exist");
    });

    it("Renders Video", () => {
        const post = {
            mime: "video/mpeg",
            image_link: "https://karakara.uk/player2/blank.d01651d5.mp4",
        };
        cy.mount(<PostMedia post={post} />);
        cy.get('video[data-cy="media"]').should("exist");
    });

    it("Renders Error", () => {
        const post = {
            mime: "text/html",
            image_link: "https://example.com",
        };
        cy.mount(<PostMedia post={post} />);
        cy.get('[data-cy="media"]').should("not.exist");
    });

    it("playground", () => {
        const post = {
            mime: "image/jpeg",
            image_link: "https://placekitten.com/321/123",
        };
        cy.mount(<PostMedia post={post} />);
    });
});
