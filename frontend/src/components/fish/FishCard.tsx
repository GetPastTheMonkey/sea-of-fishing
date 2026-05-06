import React from "react";
import type {FishDTO} from "../../api/DTO.ts";

type FishCardProps = {
    fish: FishDTO,
};

export const FishCard: React.FunctionComponent<FishCardProps> = ({fish}) => {
    const sum = fish.variants.reduce((sum, v) => sum + v.limit, 0);

    return <div className="card mb-5">
        <div className="card-header">
            <h5 className="card-title">{fish.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
            {fish.variants.map((v) => <li key={v.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                    <span>{v.name} {fish.name}</span>
                    <span>{v.limit}</span>
                </div>
            </li>)}
        </ul>
        <div className="card-footer">
            <div className="d-flex justify-content-between">
                <span>Total</span>
                <span>{sum}</span>
            </div>
        </div>
    </div>
}
