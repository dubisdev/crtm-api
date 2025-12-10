import { describe, it, expect } from "vitest";
import { mapLineResponseToDomain } from "../line.mapper.crtm";
import { ResponseMismatchError } from "../../../shared/errors";

describe("mapLineResponseToDomain", () => {
    it("should map valid response to Line entity", () => {
        const response = {
            lines: {
                Line: {
                    codLine: "123",
                    shortDescription: "Short Description",
                    description: "Full Description",
                    active: true,
                    colorLine: "#FF0000",
                    text_colorLine: "#FFFFFF",
                },
            },
        };

        const line = mapLineResponseToDomain(response);

        expect(line.code).toBe("123");
        expect(line.shortDescription).toBe("Short Description");
        expect(line.description).toBe("Full Description");
        expect(line.active).toBe(true);
        expect(line.colorLine).toBe("#FF0000");
        expect(line.textColorLine).toBe("#FFFFFF");
    });

    it("should throw ResponseMismatchError for empty object", () => {
        expect(() => mapLineResponseToDomain({})).toThrow(ResponseMismatchError);
    });

    it("should throw ResponseMismatchError for null", () => {
        expect(() => mapLineResponseToDomain(null)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for undefined", () => {
        expect(() => mapLineResponseToDomain(undefined)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for missing lines property", () => {
        const response = {
            notLines: {},
        };

        expect(() => mapLineResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for missing Line property", () => {
        const response = {
            lines: {
                NotLine: {},
            },
        };

        expect(() => mapLineResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for missing required fields", () => {
        const response = {
            lines: {
                Line: {
                    codLine: "123",
                    // Missing other required fields
                },
            },
        };

        expect(() => mapLineResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for invalid field types", () => {
        const response = {
            lines: {
                Line: {
                    codLine: 123, // Should be string
                    shortDescription: "Short",
                    description: "Full",
                    active: true,
                    colorLine: "#FF0000",
                    text_colorLine: "#FFFFFF",
                },
            },
        };

        expect(() => mapLineResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should include error details in ResponseMismatchError", () => {
        try {
            mapLineResponseToDomain({});
        } catch (error) {
            expect(error).toBeInstanceOf(ResponseMismatchError);
            expect((error as ResponseMismatchError).message).toContain("Invalid");
        }
    });
});
