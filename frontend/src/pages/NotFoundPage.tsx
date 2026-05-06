import React from "react";
import {Link} from "react-router";

export const NotFound: React.FunctionComponent = () => {
    return <>
        <h1>Not Found</h1>
        <p>The page you were looking for does not exist...</p>
        <p>
            <Link to="/">
                Take me home!
            </Link>
        </p>
    </>
}
