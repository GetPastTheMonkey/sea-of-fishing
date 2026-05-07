import React from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiClient} from "../api/ApiClient.ts";
import {Loading} from "../components/Loading.tsx";
import {ErrorAlert} from "../components/error/ErrorAlert.tsx";
import {Link} from "react-router";
import {ProgressBar} from "../components/ProgressBar.tsx";

export const RankingPage: React.FunctionComponent = () => {
    const {isFetching, data, error, refetch} = useQuery({
        queryKey: ["getPirateRanking"],
        queryFn: () => ApiClient.getPirateRanking(),
    });

    return <>
        <div className="d-flex justify-content-between align-items-start">
            <h1>Pirate Ranking</h1>
            <button type="button" className="btn btn-secondary" onClick={() => refetch()}>
                Reload
            </button>
        </div>
        <hr/>
        <Loading show={isFetching}/>

        {!isFetching && data && <>
            {data.length === 0 && <div className="alert alert-warning">There seem to be no pirates registered</div>}

            {data.length > 0 && <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Pirate</th>
                        <th>Score</th>
                        <th>Progress</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((rank, idx) => <tr key={rank.slug}>
                        <td>{idx + 1}</td>
                        <td><Link to={"/pirate/" + rank.slug}>{rank.name}</Link></td>
                        <td>{rank.score}</td>
                        <td><ProgressBar current={rank.score} max={2400}/></td>
                    </tr>)}
                    </tbody>
                </table>
            </div>}
        </>}

        {!isFetching && <ErrorAlert error={error}/>}
    </>
}
