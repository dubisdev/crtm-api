import { NetworkError, NotFoundError } from "../errors";

export class HttpClient {
    constructor(private readonly baseUrl: string) { }

    async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const url = new URL(`${this.baseUrl}/${endpoint}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) =>
                url.searchParams.append(key, value)
            );
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new NotFoundError(`Resource not found at ${endpoint}`);
                }
                throw new NetworkError(`HTTP error ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof NetworkError) {
                throw error;
            }
            throw new NetworkError("Failed to fetch resource", error);
        }
    }
}
