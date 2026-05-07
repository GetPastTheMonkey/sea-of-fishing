import {AxiosError} from "@getpastthemonkey/generic-api-client";

export const slugify = (s: string = ""): string => {
    return s
        .normalize('NFD')
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, ' ')
        .trim()
        .replace(/[\s-]+/g, '-');
}

export const isError404 = (error?: Error): boolean => {
    if (error instanceof AxiosError && error.response) {
        return error.response.status === 404;
    } else {
        return false;
    }
}
