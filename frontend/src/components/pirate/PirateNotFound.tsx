import React from "react";
import {Link} from "react-router";

type PirateNotFoundProps = {
    name: string,
};

export const PirateNotFound: React.FunctionComponent<PirateNotFoundProps> = ({name}) => {
    return <>
        <h1>Pirate not found</h1>

        <div className="alert alert-info text-center lead py-5 mt-5">
            It seems like the pirate you are looking for is not registered in our system
            <hr/>
            You were looking for <code>{name}</code>
            <hr/>
            Is this your account? <Link to={"/register?pirate=" + name}>Click here</Link> to help us expand our ranking
        </div>
    </>
}
