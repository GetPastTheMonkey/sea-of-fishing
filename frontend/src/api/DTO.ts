export interface FishDTO extends IdDTO {
    readonly name: string;
    readonly variants: FishVariantDTO[];
}

export interface FishVariantDTO extends IdDTO {
    readonly name: string;
    readonly limit: number;
}

interface IdDTO {
    readonly id: string;
}

export interface PirateDTO {
    readonly slug: string;
    readonly name: string;
    readonly last_sync: string;
    readonly progress: Record<string, number>;
}

export interface PirateRegistrationDTO {
    readonly name: string;
    readonly sot_rat: string;
}
