/* eslint-disable @typescript-eslint/camelcase */
import { Request } from "../config/axios";
import { AxiosResponse } from "axios";
import { Http, APIResponse, EndPoint } from "./http";
import { GetAdditional } from "./http";

export class HttpAPI implements Http {
    private static instance: HttpAPI;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance(): Http {
        if (!HttpAPI.instance) {
            HttpAPI.instance = new HttpAPI();
        }

        return HttpAPI.instance;
    }

    private transformResponse(response: AxiosResponse): APIResponse {
        return response;
    }

    private formURL(url: string, params: { [key: string]: string | number }) {
        Object.entries(params).forEach(([key, value]) => {
            url = url.replace(new RegExp(`{${key}}`, "g"), value.toString());
        });
        return url;
    }

    private static endpointMap = {
        [EndPoint.API]: "API_BASE_URL_TMDBv3",
    };

    public async get(url: string, { params = {}, headers, endpoint = EndPoint.API }: GetAdditional = {}) {
        try {
            const response = await Request.get(HttpAPI.instance.formURL(url, params), {
                params,
                headers,
                baseURL: HttpAPI.endpointMap[endpoint],
            });
            return HttpAPI.instance.transformResponse(response);
        } catch (error) {
            //status code based transformations
            if (error.response.status >= 400) {
                //handle validation errors
                if (error.response.data.error) {
                    return Promise.reject(error.response.data.error);
                }
            }
            throw error;
        }
    }
}
