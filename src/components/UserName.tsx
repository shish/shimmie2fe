
import React, { useState } from 'react';
import { graphql } from '../gql';
import { Link } from "react-router-dom";
import { FragmentType, useFragment } from '../gql/fragment-masking'

export function UserName(props: {user: any}) {
    return <Link to={"/user/"+props.user.name}>{props.user.name}</Link>;
}