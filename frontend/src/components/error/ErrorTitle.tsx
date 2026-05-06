import React from "react";
import {AxiosError} from "@getpastthemonkey/generic-api-client";

type ErrorTitleProps = {
    error: Error,
};

export const ErrorTitle: React.FunctionComponent<ErrorTitleProps> = ({error}) => {
    if (error instanceof AxiosError) {
        if (error.response) {
            return error.response.status + " - " + error.response.statusText;
        } else if (error.code === "ERR_NETWORK") {
            return "Network error";
        } else {
            return "Unknown error";
        }
    } else {
        return error.name;
    }
}
