import { describe, it, expect } from "vitest";
import { mapStopResponseToDomain } from "../stop.mapper.crtm";
import { ResponseMismatchError } from "../../../shared/errors";

describe("mapStopResponseToDomain", () => {
    it("should map valid response to Stop entity", () => {
        const response = {
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

        const stop = mapStopResponseToDomain(response);

        expect(stop.id).toBe("8_21044");
        expect(stop.name).toBe("Test Stop");
        expect(stop.latitude).toBe(40.4168);
        expect(stop.longitude).toBe(-3.7038);
    });

    it("should parse numeric coordinates as floats", () => {
        const response = {
            stops: {
                StopInformation: {
                    codStop: "8_21044",
                    name: "Test Stop",
                    coordinates: {
                        latitude: "40.4168",
                        longitude: "-3.7038",
                    },
                },
            },
        };

        const stop = mapStopResponseToDomain(response);

        expect(stop.latitude).toBe(40.4168);
        expect(stop.longitude).toBe(-3.7038);
        expect(typeof stop.latitude).toBe("number");
        expect(typeof stop.longitude).toBe("number");
    });

    it("should throw ResponseMismatchError for empty object", () => {
        expect(() => mapStopResponseToDomain({})).toThrow(ResponseMismatchError);
    });

    it("should throw ResponseMismatchError for null", () => {
        expect(() => mapStopResponseToDomain(null)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for undefined", () => {
        expect(() => mapStopResponseToDomain(undefined)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for missing stops property", () => {
        const response = {
            notStops: {},
        };

        expect(() => mapStopResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for missing StopInformation", () => {
        const response = {
            stops: {
                NotStopInformation: {},
            },
        };

        expect(() => mapStopResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for missing coordinates", () => {
        const response = {
            stops: {
                StopInformation: {
                    codStop: "8_21044",
                    name: "Test Stop",
                    // Missing coordinates
                },
            },
        };

        expect(() => mapStopResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should include error details in ResponseMismatchError", () => {
        try {
            mapStopResponseToDomain({});
        } catch (error) {
            expect(error).toBeInstanceOf(ResponseMismatchError);
            expect((error as ResponseMismatchError).message).toContain("Invalid");
        }
    });
});
