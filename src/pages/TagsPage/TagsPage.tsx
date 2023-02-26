import React from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../../gql";
import { useSearchParams } from "react-router-dom";
import { Block, Tag } from "../../components/basics";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import css from "./TagsPage.module.scss";

const GET_ALL_TAGS = graphql(`
    query getAllTags($start: String!) {
        tags(search: $start, limit: 1000) {
            tag
            uses
        }
    }
`);

export function TagsPage() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    // let { layout } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const q = useQuery(GET_ALL_TAGS, {
        variables: { start: searchParams.get("starts_with") ?? "t" },
    });

    ///////////////////////////////////////////////////////////////////
    // Hook edge case handling
    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }

    ///////////////////////////////////////////////////////////////////
    // Render
    const tags = q.data!.tags;

    function usesToSize(uses: number): number {
        return Math.max(Math.log(uses), 1);
    }
    function goToLetter(c: string) {
        let sp = searchParams;
        sp.set("starts_with", c);
        setSearchParams(sp);
    }
    const initials = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
    return (
        <article>
            <Block>
                {initials.map((c) => (
                    <div className={css.initial} onClick={(e) => goToLetter(c)}>
                        <span>{c}</span>
                    </div>
                ))}
                <hr />
                {tags.map((tag) => (
                    <>
                        <Tag
                            key={tag.tag}
                            tag={tag.tag}
                            size={usesToSize(tag.uses)}
                        />{" "}
                    </>
                ))}
            </Block>
        </article>
    );
}
