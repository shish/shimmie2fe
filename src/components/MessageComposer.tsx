import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { UserContext } from "../providers/LoginProvider";
import { graphql } from "../gql";
import { Permission } from "../gql/graphql";

const CREATE_PRIVATE_MESSAGE = graphql(/* GraphQL */ `
    mutation createPrivateMessage(
        $to_user_id: Int!
        $subject: String!
        $message: String!
    ) {
        create_private_message(
            to_user_id: $to_user_id
            subject: $subject
            message: $message
        )
    }
`);

export function MessageComposer({
    to_user_id,
    subject,
}: {
    to_user_id: number;
    subject?: string;
}) {
    const { can } = useContext(UserContext);
    const [subject_, setSubject] = useState<string>(subject ?? "");
    const [message, setMessage] = useState("");
    const [createPrivateMessage] = useMutation(CREATE_PRIVATE_MESSAGE);

    return (
        can(Permission.SendPm) && (
            <form
                className="block"
                onSubmit={(e) => {
                    e.preventDefault();
                    createPrivateMessage({
                        variables: { to_user_id, subject: subject_, message },
                    });
                    setMessage("");
                }}
            >
                {subject || (
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                    />
                )}
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                />
                <input type="submit" value="Send" />
            </form>
        )
    );
}
