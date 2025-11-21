import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { BBCode, Block, UserName } from "../../components/basics";
import { graphql } from "../../gql";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { LoadingPage } from "../LoadingPage/LoadingPage";

const GET_WIKI = graphql(`
    query getWiki($title: String!) {
        wiki(title: $title) {
            title
            body
            revision
            date
            owner {
                name
            }
        }
    }
`);

export function WikiPage() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    let { page_title } = useParams();
    const q = useQuery(GET_WIKI, {
        variables: { title: page_title! },
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
    const page = q.data!.wiki;

    // FIXME: include navbar content
    return (
        <article>
            <h3>{page_title}</h3>
            <Block>
                <BBCode>{page.body}</BBCode>
            </Block>
            <Block>
                v{page.revision}, last edited by <UserName user={page.owner} />{" "}
                on {page.date}
            </Block>
        </article>
    );
}
