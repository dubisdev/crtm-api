import { ResponseMismatchError } from "../errors";
import { CRTM_API } from "../constants";
import { HttpClient } from "./http-client";

export abstract class BaseCrtmRepository {
    protected readonly httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient(CRTM_API.BASE_URL);
    }

    protected async fetchAndMap<R>(
        endpoint: string,
        params: Record<string, string>,
        mapper: (data: unknown) => R
    ): Promise<R> {
        try {
            const data = await this.httpClient.get(endpoint, params);
            return mapper(data);
        } catch (error) {
            if (error instanceof ResponseMismatchError) {
                throw error;
            }
            throw error;
        }
    }
}
