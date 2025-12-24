import { describe, it, expect, vi, beforeEach } from "vitest";
import { CrtmLineRepository } from "../line.repository.crtm";
import { NotFoundError, NetworkError } from "../../../shared/errors";

describe("CrtmLineRepository", () => {
    let repository: CrtmLineRepository;
    let mockHttpClient: any;

    beforeEach(() => {
        repository = new CrtmLineRepository();
        mockHttpClient = {
            get: vi.fn(),
        };
        (repository as any).httpClient = mockHttpClient;
    });

    it("should fetch and map line by code successfully", async () => {
        const mockResponse = {
            lines: {
                Line: {
                    codLine: "123",
                    shortDescription: "Line 123",
                    description: "Full description",
                    active: true,
                    colorLine: "#FF0000",
                    text_colorLine: "#FFFFFF",
                },
            },
        };

        mockHttpClient.get.mockResolvedValue(mockResponse);

        const result = await repository.findByCode("123");

        expect(result).toBeDefined();
        expect(result?.code).toBe("123");
        expect(result?.shortDescription).toBe("Line 123");
        expect(result?.description).toBe("Full description");
        expect(result?.active).toBe(true);
        expect(result?.colorLine).toBe("#FF0000");
        expect(result?.textColorLine).toBe("#FFFFFF");

        expect(mockHttpClient.get).toHaveBeenCalledWith(
            expect.any(String),
            { codLine: "123" }
        );
    });

    it("should call HttpClient with correct endpoint and params", async () => {
        const mockResponse = {
            lines: {
                Line: {
                    codLine: "456",
                    shortDescription: "Test",
                    description: "Test Line",
                    active: false,
                    colorLine: "#00FF00",
                    text_colorLine: "#000000",
                },
            },
        };

        mockHttpClient.get.mockResolvedValue(mockResponse);

        await repository.findByCode("456");

        expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            "GetLines.php",
            { codLine: "456" }
        );
    });

    it("should propagate NotFoundError from HttpClient", async () => {
        mockHttpClient.get.mockRejectedValue(
            new NotFoundError("Line not found")
        );

        await expect(repository.findByCode("999")).rejects.toThrow(
            NotFoundError
        );
        await expect(repository.findByCode("999")).rejects.toThrow(
            "Line not found"
        );
    });

    it("should propagate NetworkError from HttpClient", async () => {
        mockHttpClient.get.mockRejectedValue(
            new NetworkError("Network failure")
        );

        await expect(repository.findByCode("123")).rejects.toThrow(NetworkError);
        await expect(repository.findByCode("123")).rejects.toThrow(
            "Network failure"
        );
    });
});
