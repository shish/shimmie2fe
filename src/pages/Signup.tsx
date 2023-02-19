import React, { useState } from "react";
import { Block } from "../components/basics/Block";
import { FormItem } from "../components/FormItem";

export function Signup() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");

    ///////////////////////////////////////////////////////////////////
    // Render
    function submit(e) {
        // FIXME: implement signup
        e.preventDefault();
    }

    return (
        <article>
            <Block>
                <form onSubmit={submit}>
                    <FormItem label="Username">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />
                    </FormItem>
                    <FormItem label="Password">
                        <input
                            type="password"
                            value={password1}
                            onChange={(e) =>
                                setPassword1(e.target.value)
                            }
                            required
                        />
                    </FormItem>
                    <FormItem label="Repeat Password">
                        <input
                            type="password"
                            value={password2}
                            onChange={(e) =>
                                setPassword2(e.target.value)
                            }
                            required
                        />
                    </FormItem>
                    <FormItem label="Email">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </FormItem>
                    <input type="submit" value="Sign Up" />
                </form>
            </Block>
        </article>
    );
}
