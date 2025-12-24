import { describe, it, expect } from "vitest";
import { mapStopTimeResponseToDomain } from "../stop-time.mapper.crtm";
import { ResponseMismatchError } from "../../../shared/errors";

describe("mapStopTimeResponseToDomain", () => {
    it("should map valid response with single time to StopTime array", () => {
        const response = {
            stopTimes: {
                stop: {
                    codStop: "1_1",
                    shortCodStop: "1",
                    name: "Test Stop Name"
                },
                linesStatus: {
                    LineStatus: [
                        {
                            line: {
                                codLine: "123",
                                shortDescription: "Short 1"
                            },
                        }
                    ],
                },
                times: {
                    Time: {
                        line: {
                            codLine: "123",
                            shortDescription: "Short",
                            description: "Full Description",
                        },
                        direction: 1,
                        destination: "Final Stop",
                        time: "15:30",
                        destinationStop: {
                            codStop: "8_99999",
                            name: "Destination Name",
                        },
                    },
                },
            },
        };

        const stopTimes = mapStopTimeResponseToDomain(response);

        expect(stopTimes.times).toHaveLength(1);
        expect(stopTimes.times[0].lineCode).toBe("123");
        expect(stopTimes.times[0].lineShortDescription).toBe("Short");
        expect(stopTimes.times[0].lineDescription).toBe("Full Description");
        expect(stopTimes.times[0].direction).toBe(1);
        expect(stopTimes.times[0].destination).toBe("Final Stop");
        expect(stopTimes.times[0].time).toBe("15:30");
        expect(stopTimes.times[0].destinationStopCode).toBe("8_99999");
        expect(stopTimes.times[0].destinationStopName).toBe("Destination Name");
    });

    it("should map valid response with multiple times to StopTime array", () => {
        const response = {
            stopTimes: {
                stop: {
                    codStop: "1_1",
                    shortCodStop: "1",
                    name: "Test Stop Name"
                },
                linesStatus: {
                    LineStatus: [
                        {
                            line: {
                                codLine: "123",
                                shortDescription: "Short 1"
                            },
                        }
                    ],
                },
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

        const stopTimes = mapStopTimeResponseToDomain(response);

        expect(stopTimes.times).toHaveLength(2);
        expect(stopTimes.times[0].lineCode).toBe("123");
        expect(stopTimes.times[0].time).toBe("15:30");
        expect(stopTimes.times[1].lineCode).toBe("456");
        expect(stopTimes.times[1].time).toBe("16:00");
    });

    it("should throw ResponseMismatchError for empty object", () => {
        expect(() => mapStopTimeResponseToDomain({})).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for null", () => {
        expect(() => mapStopTimeResponseToDomain(null)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for undefined", () => {
        expect(() => mapStopTimeResponseToDomain(undefined)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for missing stopTimes property", () => {
        const response = {
            notStopTimes: {},
        };

        expect(() => mapStopTimeResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for missing times property", () => {
        const response = {
            stopTimes: {
                notTimes: {},
            },
        };

        expect(() => mapStopTimeResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for missing Time property", () => {
        const response = {
            stopTimes: {
                times: {
                    NotTime: {},
                },
            },
        };

        expect(() => mapStopTimeResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should throw ResponseMismatchError for incomplete time data", () => {
        const response = {
            stopTimes: {
                times: {
                    Time: {
                        line: {
                            codLine: "123",
                            // Missing shortDescription
                        },
                    },
                },
            },
        };

        expect(() => mapStopTimeResponseToDomain(response)).toThrow(
            ResponseMismatchError
        );
    });

    it("should include error details in ResponseMismatchError", () => {
        try {
            mapStopTimeResponseToDomain({});
        } catch (error) {
            expect(error).toBeInstanceOf(ResponseMismatchError);
            expect((error as ResponseMismatchError).message).toContain("Invalid");
        }
    });
});
