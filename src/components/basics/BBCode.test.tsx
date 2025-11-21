import ReactDOMServer from "react-dom/server";
import { describe, expect, test } from "vitest";
import { BBCode } from "./BBCode";

function t(bb: any, exp: any) {
    const r1 = ReactDOMServer.renderToString(<BBCode>{bb}</BBCode>);
    const r2 = ReactDOMServer.renderToString(
        <span style={{ overflowWrap: "anywhere" }}>{exp}</span>,
    );
    expect(r1).toEqual(r2);
}

describe("Standard BBCode", () => {
    test("Basic", () => {
        t("[b]bold[/b]", <b>bold</b>);
        t(
            "[b]bold[/b][i]italic[/i]",
            <>
                <b>bold</b>
                <i>italic</i>
            </>,
        );
        t(
            "[b]bold[/b][b]bold[/b]",
            <>
                <b>bold</b>
                <b>bold</b>
            </>,
        );
    });

    test("Unclosed", () => {
        t("[b]bold[i]italic", "[b]bold[i]italic");
    });

    test("Escape", () => {
        t("<a onclick='pwn()'>yo</a>", "<a onclick='pwn()'>yo</a>");
    });

    test("Stacking", () => {
        t(
            "[b]B[/b][i]I[/i][b]B[/b]",
            <>
                <b>B</b>
                <i>I</i>
                <b>B</b>
            </>,
        );
        t(
            "[b]bold[i]bolditalic[/i]bold[/b]",
            <b>
                bold<i>bolditalic</i>bold
            </b>,
        );
    });

    test("Code", () => {
        t("[code][b]bold[/b][/code]", <pre>[b]bold[/b]</pre>);
    });

    // FIXME: not sure how to express the correct rendering here??
    /*
    test("List", () => {
        t(
            "[list][*]a[*]b[*]c[*]d[/list]",
            <ul>
                <li>a</li>
                <li>b</li>
                <li>c</li>
                <li>d</li>
            </ul>,
        );
    });

    test('Nested List', () => {
        t("[list][*]a[list][*]b[*]c[/list][*]d[/list]", <ul><li>a</li><ul><li>b</li><li>c</li></ul><li>d</li></ul>);
        t("[ul][*]a[ol][*]b[*]c[/ol][*]d[/ul]", <ul><li/>a<ol><li/>b<li/>c</ol><li/>d</ul>);
    });
    */

    test("Spoiler", () => {
        t(
            "[spoiler]ShishNet[/spoiler]",
            <span style={{ backgroundColor: "black", color: "black" }}>
                ShishNet
            </span>,
        );
    });

    test("URL", () => {
        t(
            "[url]https://shishnet.org[/url]",
            <a href="https://shishnet.org">https://shishnet.org</a>,
        );
        t(
            "[url=https://shishnet.org]ShishNet[/url]",
            <a href="https://shishnet.org">ShishNet</a>,
        );
        t(
            '[url=javascript:alert("owned")]click to fail[/url]',
            '[url=javascript:alert("owned")]click to fail[/url]',
        );
    });

    test("Email", () => {
        t(
            "[email]spam@shishnet.org[/email]",
            <a href="mailto:spam@shishnet.org">spam@shishnet.org</a>,
        );
    });

    // prettier-ignore
    test("Anchor", () => {
        t(
            "[anchor=rules]Rules[/anchor]",
            <span className="anchor">
                Rules <a
                    className="alink"
                    href="#bb-rules"
                    id="bb-rules"
                    title="link to this anchor"
                > ¶ </a>
            </span>,
        );
    });
});

describe("Shimmie Codes", () => {
    test("Post Links", () => {
        t(
            ">>123",
            <a className="shm-clink" data-clink-sel="" href="/post/123">
                &gt;&gt;123
            </a>,
        );
        t(
            ">>123#c456",
            <a
                className="shm-clink"
                data-clink-sel="#c456"
                href="/post/123#c456"
            >
                &gt;&gt;123#c456
            </a>,
        );
    });
    test("Site Links", () => {
        t(
            "[url]site://foo/bar[/url]",
            <a className="shm-clink" data-clink-sel="" href="/foo/bar">
                foo/bar
            </a>,
        );
        t(
            "[url]site://foo/bar#c123[/url]",
            <a
                className="shm-clink"
                data-clink-sel="#c123"
                href="/foo/bar#c123"
            >
                foo/bar#c123
            </a>,
        );
        t(
            "[url=site://foo/bar]look at my post[/url]",
            <a className="shm-clink" data-clink-sel="" href="/foo/bar">
                look at my post
            </a>,
        );
        t(
            "[url=site://foo/bar#c123]look at my comment[/url]",
            <a
                className="shm-clink"
                data-clink-sel="#c123"
                href="/foo/bar#c123"
            >
                look at my comment
            </a>,
        );
    });
    test("Wiki Links", () => {
        t(
            "Foo [[page]] bar",
            <>
                Foo <a href="/wiki/page">page</a> bar
            </>,
        );
        t(
            "Foo [[page|title]] bar",
            <>
                Foo <a href="/wiki/page">title</a> bar
            </>,
        );
    });
});
