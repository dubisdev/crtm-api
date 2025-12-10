import { describe, it, expect, vi, beforeEach } from "vitest";
import { CrtmStopTimeRepository } from "../stop-time.repository.crtm";
import { NotFoundError, NetworkError } from "../../../shared/errors";

describe("CrtmStopTimeRepository", () => {
    let repository: CrtmStopTimeRepository;
    let mockHttpClient: any;

    beforeEach(() => {
        repository = new CrtmStopTimeRepository();
        mockHttpClient = {
            get: vi.fn(),
        };
        (repository as any).httpClient = mockHttpClient;
    });

    it("should fetch and map stop times by stop code successfully", async () => {
        const mockResponse = {
            stopTimes: {
                times: {
                    Time: [
                        {
                            line: {
                                codLine: "123",
                                shortDescription: "Short 1",
                                description: "Full 1",
                            },
                            direction: 1,
                            destination: "Destination 1",
                            time: "15:30",
                            destinationStop: {
                                codStop: "8_11111",
                                name: "Stop 1",
                            },
                        },
                        {
                            line: {
                                codLine: "456",
                                shortDescription: "Short 2",
                                description: "Full 2",
                            },
                            direction: 2,
                            destination: "Destination 2",
                            time: "16:00",
                            destinationStop: {
                                codStop: "8_22222",
                                name: "Stop 2",
                            },
                        },
                    ],
                },
            },
        };

        mockHttpClient.get.mockResolvedValue(mockResponse);

        const result = await repository.findByStopCode("8_21044");

        expect(result).toHaveLength(2);
        expect(result[0]).toBeDefined();
        expect(result[0].lineCode).toBe("123");
        expect(result[0].time).toBe("15:30");
        expect(result[1].lineCode).toBe("456");
        expect(result[1].time).toBe("16:00");

        expect(mockHttpClient.get).toHaveBeenCalledWith(
            expect.any(String),
            { codStop: "8_21044" }
        );
    });

    it("should call HttpClient with correct endpoint and params", async () => {
        const mockResponse = {
            stopTimes: {
                times: {
                    Time: {
                        line: {
                            codLine: "789",
                            shortDescription: "Test",
                            description: "Test Line",
                        },
                        direction: 1,
                        destination: "Final",
                        time: "12:00",
                        destinationStop: {
                            codStop: "8_99999",
                            name: "Final Stop",
                        },
                    },
                },
            },
        };

        mockHttpClient.get.mockResolvedValue(mockResponse);

        await repository.findByStopCode("8_99999");

        expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            "GetStopsTimes.php",
            { codStop: "8_99999" }
        );
    });

    it("should propagate NotFoundError from HttpClient", async () => {
        mockHttpClient.get.mockRejectedValue(
            new NotFoundError("Stop times not found")
        );

        await expect(repository.findByStopCode("INVALID")).rejects.toThrow(
            NotFoundError
        );
        await expect(repository.findByStopCode("INVALID")).rejects.toThrow(
            "Stop times not found"
        );
    });

    it("should propagate NetworkError from HttpClient", async () => {
        mockHttpClient.get.mockRejectedValue(
            new NetworkError("Network failure")
        );

        await expect(repository.findByStopCode("8_21044")).rejects.toThrow(
            NetworkError
        );
        await expect(repository.findByStopCode("8_21044")).rejects.toThrow(
            "Network failure"
        );
    });
});
