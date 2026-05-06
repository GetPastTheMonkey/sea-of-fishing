import React from "react";
import {AxiosError} from "@getpastthemonkey/generic-api-client";

type ErrorMessageProps = {
    error: Error,
};

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({error}) => {
    if (error instanceof AxiosError) {
        if (error.response) {
            const data = error.response.data as object | string;
            const contentType = error.response.headers["content-type"];

            if (typeof data === "string") {
                if (typeof contentType === "string" && contentType.startsWith("text/html")) {
                    return <iframe srcDoc={data} className="w-100 h-100"/>
                } else {
                    return data;
                }
            } else if ("detail" in data) {
                return data.detail as React.ReactNode;
            } else {
                return <>
                    <p>The following error was received</p>
                    <hr/>
                    <pre>{JSON.stringify(data, null, 4)}</pre>
                </>
            }
        } else if (error.code === "ERR_NETWORK") {
            return "The Sea of Fishing API is currently unreachable";
        } else {
            return error.message;
        }
    } else {
        return error.message;
    }
}
