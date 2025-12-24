import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpClient } from "../http-client";
import { NetworkError, NotFoundError } from "../../errors";

describe("HttpClient", () => {
    let client: HttpClient;

    beforeEach(() => {
        client = new HttpClient("https://api.example.com");
        vi.clearAllMocks();
    });

    describe("get", () => {
        it("should successfully fetch and return JSON data", async () => {
            const mockData = { result: "success" };
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => mockData,
            }) as any;

            const result = await client.get("endpoint");

            expect(result).toEqual(mockData);
            expect(global.fetch).toHaveBeenCalledWith(
                new URL("https://api.example.com/endpoint").toString()
            );
        });

        it("should append query parameters to URL", async () => {
            const mockData = { result: "success" };
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => mockData,
            }) as any;

            await client.get("endpoint", { param1: "value1", param2: "value2" });

            const expectedUrl = new URL("https://api.example.com/endpoint");
            expectedUrl.searchParams.append("param1", "value1");
            expectedUrl.searchParams.append("param2", "value2");

            expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString());
        });

        it("should throw NotFoundError for 404 status", async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 404,
            }) as any;

            await expect(client.get("endpoint")).rejects.toThrow(NotFoundError);
            await expect(client.get("endpoint")).rejects.toThrow(
                "Resource not found at endpoint"
            );
        });

        it("should throw NetworkError for 500 status", async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
            }) as any;

            await expect(client.get("endpoint")).rejects.toThrow(NetworkError);
            await expect(client.get("endpoint")).rejects.toThrow(
                "HTTP error 500: Internal Server Error"
            );
        });

        it("should throw NetworkError for other HTTP errors", async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 403,
                statusText: "Forbidden",
            }) as any;

            await expect(client.get("endpoint")).rejects.toThrow(NetworkError);
        });

        it("should throw NetworkError for network failures", async () => {
            global.fetch = vi.fn().mockRejectedValue(new Error("Network failure")) as any;

            await expect(client.get("endpoint")).rejects.toThrow(NetworkError);
            await expect(client.get("endpoint")).rejects.toThrow(
                "Failed to fetch resource"
            );
        });

        it("should preserve NotFoundError when thrown", async () => {
            global.fetch = vi.fn().mockRejectedValue(
                new NotFoundError("Custom not found")
            ) as any;

            await expect(client.get("endpoint")).rejects.toThrow(NotFoundError);
            await expect(client.get("endpoint")).rejects.toThrow("Custom not found");
        });

        it("should preserve NetworkError when thrown", async () => {
            global.fetch = vi.fn().mockRejectedValue(
                new NetworkError("Custom network error")
            ) as any;

            await expect(client.get("endpoint")).rejects.toThrow(NetworkError);
            await expect(client.get("endpoint")).rejects.toThrow(
                "Custom network error"
            );
        });
    });
});
