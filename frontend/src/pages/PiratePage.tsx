import React from "react";
import {Navigate, useParams} from "react-router";
import {isError404, slugify} from "../util.ts";
import {useQuery} from "@tanstack/react-query";
import {ApiClient} from "../api/ApiClient.ts";
import {Loading} from "../components/Loading.tsx";
import {ErrorAlert} from "../components/error/ErrorAlert.tsx";
import {PirateNotFound} from "../components/pirate/PirateNotFound.tsx";
import {PirateFound} from "../components/pirate/PirateFound.tsx";

type PiratePageParams = {
    pirate: string,
};

export const PiratePage: React.FunctionComponent = () => {
    const {pirate} = useParams<PiratePageParams>();

    const slug = slugify(pirate);

    const {isFetching, data, error} = useQuery({
        queryKey: ["getPirateByName", slug],
        queryFn: () => ApiClient.getPirateByName(slug),
    });

    if (isFetching) {
        return <>
            <Loading/>
        </>
    }

    if (error) {
        if (isError404(error)) {
            return <PirateNotFound name={pirate!}/>
        } else {
            return <>
                <h1>There was an error</h1>
                <ErrorAlert error={error}/>
            </>
        }
    }

    if (pirate !== slug) {
        return <Navigate to={"../" + slug}/>
    }

    if (data) {
        return <PirateFound pirate={data}/>
    }

    console.assert(false, isFetching, data, error);
    return <h1>Assertion failure, check console</h1>
}
