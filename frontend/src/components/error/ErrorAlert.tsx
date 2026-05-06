import React from "react";
import {ErrorTitle} from "./ErrorTitle.tsx";
import {ErrorMessage} from "./ErrorMessage.tsx";

type ErrorAlertProps = {
    error: Error | null,
};

export const ErrorAlert: React.FunctionComponent<ErrorAlertProps> = ({error}) => {
    if (!error) return null;

    return <div className="alert alert-danger">
        <ErrorTitle error={error}/>
        <hr/>
        <ErrorMessage error={error}/>
    </div>
}
