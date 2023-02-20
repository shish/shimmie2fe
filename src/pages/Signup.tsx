import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Block } from "../components/basics/Block";
import { FormItem } from "../components/basics/FormItem";

export function Signup() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    ///////////////////////////////////////////////////////////////////
    // Render
    function submit(e: FormEvent) {
        // FIXME: implement signup
        e.preventDefault();
        navigate("/");
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
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />
                    </FormItem>
                    <FormItem label="Password">
                        <input
                            type="password"
                            placeholder="Password"
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
                            placeholder="Repeat Password"
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
                            placeholder="Email"
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
