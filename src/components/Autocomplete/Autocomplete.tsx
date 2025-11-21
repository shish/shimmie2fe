import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { graphql } from "../../gql";
import { useDebounce } from "../../hooks";
import { get_word, replace_word } from "../../utils";

import css from "./Autocomplete.module.scss";

export const GET_TAGS = graphql(/* GraphQL */ `
    query getTags($start: String!) {
        tags(search: $start, limit: 10) {
            tag
            uses
        }
    }
`);

function CompletionsBar(props: {
    start: string;
    setSearchPart: CallableFunction;
}) {
    const dbStart = useDebounce(props.start, 500);
    const compQ = useQuery(GET_TAGS, {
        variables: { start: dbStart },
    });

    if (compQ.loading) {
        return <></>;
    }
    if (compQ.error) {
        return <div className={css.completions}>{compQ.error.message}</div>;
    }
    if ((compQ.data?.tags?.length ?? 0) === 0) {
        return <></>;
    }

    return (
        <ul className={css.completions}>
            {compQ?.data?.tags?.map((tu) => (
                <li
                    className={css.tag}
                    key={tu.tag}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => props.setSearchPart(tu.tag)}
                >
                    <span className={css.name}>{tu.tag}</span>
                    <span className={css.uses}>{tu.uses}</span>
                </li>
            ))}
        </ul>
    );
}

type AutocompleteProps = {
    name: string;
    value: string;
    placeholder?: string;
    onValue: (v: string) => any;
};

export function Autocomplete({
    name,
    value,
    placeholder,
    onValue,
}: AutocompleteProps) {
    const [showCompletions, setShowCompletions] = useState(false);
    const [searchPos, setSearchPos] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        document.addEventListener("selectionchange", () => {
            inputRef?.current?.selectionStart &&
                setSearchPos(inputRef.current.selectionStart);
        });
    });
    function setSearchPart(tag: string) {
        onValue(replace_word(value, searchPos, tag));
        inputRef.current && inputRef.current.focus();
    }

    return (
        <div className={css.autoComplete}>
            <input
                type="text"
                name={name}
                autoComplete="off"
                value={value}
                placeholder={placeholder}
                className={css.fill}
                onChange={(e) => onValue(e.target.value)}
                onFocus={() => setShowCompletions(true)}
                onBlur={() => setShowCompletions(false)}
                ref={inputRef}
            />
            {showCompletions && (
                <CompletionsBar
                    start={get_word(value, searchPos)!}
                    setSearchPart={setSearchPart}
                />
            )}
        </div>
    );
}
