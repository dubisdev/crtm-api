import { describe, it, expect, vi, beforeEach } from "vitest";
import { CrtmStopRepository } from "../stop.repository.crtm";
import { NotFoundError, NetworkError } from "../../../shared/errors";

describe("CrtmStopRepository", () => {
    let repository: CrtmStopRepository;
    let mockHttpClient: any;

    beforeEach(() => {
        repository = new CrtmStopRepository();
        mockHttpClient = {
            get: vi.fn(),
        };
        (repository as any).httpClient = mockHttpClient;
    });

    it("should fetch and map stop by code successfully", async () => {
        const mockResponse = {
            stops: {
                StopInformation: {
                    codStop: "8_21044",
                    name: "Test Stop",
                    coordinates: {
                        latitude: 40.4168,
                        longitude: -3.7038,
                    },
                },
            },
        };

        mockHttpClient.get.mockResolvedValue(mockResponse);

        const result = await repository.findByCode("8_21044");

        expect(result).toBeDefined();
        expect(result?.id).toBe("8_21044");
        expect(result?.name).toBe("Test Stop");
        expect(result?.latitude).toBe(40.4168);
        expect(result?.longitude).toBe(-3.7038);

        expect(mockHttpClient.get).toHaveBeenCalledWith(
            expect.any(String),
            { codStop: "8_21044" }
        );
    });

    it("should call HttpClient with correct endpoint and params", async () => {
        const mockResponse = {
            stops: {
                StopInformation: {
                    codStop: "8_99999",
                    name: "Another Stop",
                    coordinates: {
                        latitude: 41.0,
                        longitude: -4.0,
                    },
                },
            },
        };

        mockHttpClient.get.mockResolvedValue(mockResponse);

        await repository.findByCode("8_99999");

        expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            "GetStopsInformation.php",
            { codStop: "8_99999" }
        );
    });

    it("should propagate NotFoundError from HttpClient", async () => {
        mockHttpClient.get.mockRejectedValue(new NotFoundError("Stop not found"));

        await expect(repository.findByCode("INVALID")).rejects.toThrow(
            NotFoundError
        );
        await expect(repository.findByCode("INVALID")).rejects.toThrow(
            "Stop not found"
        );
    });

    it("should propagate NetworkError from HttpClient", async () => {
        mockHttpClient.get.mockRejectedValue(
            new NetworkError("Network failure")
        );

        await expect(repository.findByCode("8_21044")).rejects.toThrow(
            NetworkError
        );
        await expect(repository.findByCode("8_21044")).rejects.toThrow(
            "Network failure"
        );
    });
});
