import React from "react";
import type {FishDTO} from "../api/DTO.ts";

export const FishContext = React.createContext<FishDTO[]>([]);
