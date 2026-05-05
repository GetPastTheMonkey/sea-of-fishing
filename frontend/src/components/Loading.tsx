import React from "react";

type LoadingProps = {
    show?: boolean,
    fullPage?: boolean,
};

export const Loading: React.FunctionComponent<LoadingProps> = ({show = true, fullPage = false}) => {
    if (!show) return null;

    const spinner = <div className="text-center">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>

    if (fullPage) {
        return <div className="h-100 d-flex align-items-center justify-content-center">
            {spinner}
        </div>
    } else {
        return spinner;
    }
}
