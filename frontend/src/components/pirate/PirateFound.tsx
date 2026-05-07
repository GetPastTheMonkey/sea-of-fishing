import React from "react";
import type {PirateDTO} from "../../api/DTO.ts";
import {FishContext} from "../../context/FishContext.ts";
import {ProgressBar} from "../ProgressBar.tsx";

type PirateFoundProps = {
    pirate: PirateDTO,
};

export const PirateFound: React.FunctionComponent<PirateFoundProps> = ({pirate}) => {
    const fishes = React.useContext(FishContext);

    const overallLimit = React.useMemo<number>(() => {
        let sum = 0;

        for (const fish of fishes) {
            for (const variant of fish.variants) {
                sum += variant.limit;
            }
        }

        return sum;
    }, [fishes]);

    const overallSold = React.useMemo<number>(() => {
        return Object.values(pirate.progress).reduce((prev, curr) => prev + curr, 0);
    }, [pirate.progress]);

    const lastSync = new Date(pirate.last_sync);

    return <>
        <div className="d-flex justify-content-between align-items-center">
            <div className="">
                <h1>{pirate.name}</h1>
                <p>Last sync: {lastSync.toLocaleString()}</p>
            </div>
            <div className="w-25 text-end">
                <ProgressBar current={overallSold} max={overallLimit}/>
                <p>Overall: {overallSold} / {overallLimit}</p>
            </div>
        </div>

        <div className="row">
            {fishes.map((fish) => <div className="col-sm-4 border-top mb-3 py-5" key={fish.id}>
                <h2 className="text-center">{fish.name}</h2>

                {fish.variants.map((variant) => <div className="mb-3" key={variant.id}>
                    {variant.name}
                    <ProgressBar
                        current={pirate.progress[variant.id] ?? 0}
                        max={variant.limit}
                    />
                </div>)}
            </div>)}
        </div>
    </>
}
