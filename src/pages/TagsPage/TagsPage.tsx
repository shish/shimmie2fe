import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { Block, Tag } from "../../components/basics";
import { graphql } from "../../gql";
import { ErrorPage } from "../ErrorPage/ErrorPage";
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
        variables: { start: searchParams.get("starts_with") ?? "a" },
    });

    ///////////////////////////////////////////////////////////////////
    // Hook edge case handling
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }

    ///////////////////////////////////////////////////////////////////
    // Render
    return (
        <article>
            <Nav
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
            {q.loading ? (
                <Block>Loading...</Block>
            ) : (
                <Map tags={q.data!.tags} />
            )}
        </article>
    );
}

function Nav(props: { searchParams: any; setSearchParams: any }) {
    function goToLetter(c: string) {
        let sp = props.searchParams;
        sp.set("starts_with", c);
        props.setSearchParams(sp);
    }
    const initials = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
    return (
        <Block>
            {initials.map((c) => (
                <div
                    className={css.initial}
                    onClick={(e) => goToLetter(c)}
                    data-cy-initial={c}
                >
                    <span>{c}</span>
                </div>
            ))}
        </Block>
    );
}

type TagList = { tag: string; uses: number }[];

function Map(props: { tags: TagList }) {
    function usesToSize(uses: number): number {
        return Math.max(Math.log(uses), 1);
    }
    return (
        <Block>
            {props.tags.map((tag) => (
                <>
                    <Tag
                        key={tag.tag}
                        tag={tag.tag}
                        size={usesToSize(tag.uses)}
                    />{" "}
                </>
            ))}
        </Block>
    );
}
