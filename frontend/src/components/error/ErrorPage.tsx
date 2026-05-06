import React from "react";
import {ErrorAlert} from "./ErrorAlert.tsx";

type ErrorFullPageProps = {
    error?: Error | null;
};

export const ErrorPage: React.FunctionComponent<ErrorFullPageProps> = ({error = null}) => {
    if (!error) {
        return null;
    }

    return <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <ErrorAlert error={error}/>
                </div>
            </div>
        </div>
    </div>
}
