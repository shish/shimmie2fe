import React, { useState } from "react";
import { Block } from "../components/Block";
import { graphql } from "../gql";

export function Signup() {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");

    function submit(e) {
        e.preventDefault();
    }

    return (
        <article>
            <Block>
                <form onSubmit={submit}>
                    <table className="form">
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <td>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td>
                                    <input
                                        type="password"
                                        value={password1}
                                        onChange={(e) =>
                                            setPassword1(e.target.value)
                                        }
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Repeat Password</th>
                                <td>
                                    <input
                                        type="password"
                                        value={password2}
                                        onChange={(e) =>
                                            setPassword2(e.target.value)
                                        }
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>
                                    <input type="submit" value="Sign Up" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Block>
        </article>
    );
}
