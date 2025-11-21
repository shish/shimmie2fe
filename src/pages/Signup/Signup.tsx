import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Block, FormItem, MaybeError, Submit } from "../../components/basics";
import { graphql } from "../../gql";
import { useFragment as fragCast } from "../../gql/fragment-masking";
import { GET_ME, ME_FRAGMENT } from "../../providers/LoginProvider";

const CREATE_USER = graphql(`
    mutation createUser(
        $username: String!
        $password1: String!
        $password2: String!
        $email: String!
    ) {
        create_user(
            username: $username
            password1: $password1
            password2: $password2
            email: $email
        ) {
            user {
                ...UserLogin
            }
            session
            error
        }
    }
`);

export function Signup() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [create_user, q] = useMutation(CREATE_USER, {
        update: (cache, { data }) => {
            if (!data) {
                console.log("Login returned no data");
                return;
            }
            const user = fragCast(ME_FRAGMENT, data.create_user.user);

            if (user.name && data.create_user.session) {
                localStorage.setItem(
                    "session",
                    user.name + ":" + data.create_user.session,
                );
            }
            cache.writeQuery({
                query: GET_ME,
                data: { me: data.create_user.user },
            });
            if (data.create_user.session) {
                q.client.resetStore();
                navigate("/");
            }
        },
    });

    ///////////////////////////////////////////////////////////////////
    // Render
    function submit(e: FormEvent) {
        e.preventDefault();
        create_user({ variables: { username, password1, password2, email } });
    }

    return (
        <article>
            <Block>
                <form onSubmit={submit}>
                    <FormItem label="User Name">
                        <input
                            type="text"
                            placeholder="User Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </FormItem>
                    <FormItem label="Password">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            required
                        />
                    </FormItem>
                    <FormItem label="Repeat Password">
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                    </FormItem>
                    <FormItem label="Email">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormItem>
                    <MaybeError query={q} error={q.data?.create_user.error} />
                    <Submit
                        passive={"Sign Up"}
                        active={"Creating Account"}
                        query={q}
                        condition={
                            username !== "" &&
                            password1 !== "" &&
                            password2 !== ""
                        }
                    />
                </form>
            </Block>
        </article>
    );
}
