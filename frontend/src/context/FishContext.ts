import React from "react";
import type {FishDTO} from "../api/DTO.ts";

type FishContextType = {
    fishes: FishDTO[],
};

export const FishContext = React.createContext<FishContextType>({
    fishes: [],
});
