import React from "react";

type ProgressBarProps = {
    current: number,
    max: number,
};

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({current, max}) => {
    const bgClass = (current === max) ? "bg-success" : "bg-primary";

    return <div className="progress" role="progressbar" aria-label="Progress Bar" aria-valuenow={current}
                aria-valuemin={0} aria-valuemax={max}>
        <div className={"progress-bar " + bgClass} style={{width: (100*current/max) + "%"}}/>
    </div>
}
