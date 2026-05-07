import {GenericApiClient} from "@getpastthemonkey/generic-api-client";
import type {FishDTO, PirateDTO, PirateRegistrationDTO, RankingDTO} from "./DTO.ts";
import {BACKEND_URL} from "../config.ts";

export class ApiClient extends GenericApiClient {
    protected static override baseUrl: string = BACKEND_URL;

    public static getFishes(): Promise<FishDTO[]> {
        return this.get<null, FishDTO[]>(
            "fishes/list",
            null
        );
    }

    public static registerPirate(data: PirateRegistrationDTO): Promise<PirateDTO> {
        return this.post<null, PirateRegistrationDTO, PirateDTO>(
            "pirates/register",
            null,
            data
        );
    }

    public static getPirateByName(name: string): Promise<PirateDTO> {
        return this.get<null, PirateDTO>(
            "pirates/by-name/" + name,
            null
        );
    }

    public static getPirateRanking(): Promise<RankingDTO[]> {
        return this.get<null, RankingDTO[]>(
            "pirates/ranking",
            null
        );
    }
}
