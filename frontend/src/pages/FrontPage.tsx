import React from "react";
import {FishContext} from "../context/FishContext.ts";
import {FishCard} from "../components/fish/FishCard.tsx";

export const FrontPage: React.FunctionComponent = () => {
    const {fishes} = React.useContext(FishContext);

    return <>
        <h1 className="border-bottom pb-3 mb-5">Welcome to the Sea of Fishing</h1>

        <div className="row">
            {fishes.map((fish) => <div key={fish.id} className="col-sm-3">
                <FishCard fish={fish}/>
            </div>)}
        </div>
    </>
}
