/// <reference types="Cypress" />
/// <reference path="../../../../cypress/support/component.ts" />

import { ThumbnailGrid } from ".";

describe("test", () => {
    const posts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
        const w = 150;
        const h = parseInt((Math.random() * 100 + 50).toFixed(0), 10);
        return {
            post_id: n,
            tooltip: `Post ${n}: test tooltip`,
            thumb_link: `http://placekitten.com/${w}/${h}`,
            width: w,
            height: h,
        };
    });

    it("playground", () => {
        cy.mount(<ThumbnailGrid posts={posts} />);
    });
});
