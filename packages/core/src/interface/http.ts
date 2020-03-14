export enum EndPoint {
    "API" = "",
}

export interface APIResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

export interface APIErrorResponse {
    error: {
        code: string;
        message: string;
    };
}

export interface GetAdditional {
    params?: { [key: string]: string | number };
    headers?: { [key: string]: string };
    endpoint?: EndPoint;
}

export interface Http {
    get: (url: string, config?: GetAdditional) => Promise<APIResponse>;
}
