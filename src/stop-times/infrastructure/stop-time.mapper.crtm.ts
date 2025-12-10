import * as v from "valibot";
import type { StopTime } from "../domain/stop-time.entity";
import { ResponseMismatchError } from "../../shared/errors";
import { StopTimesResponseSchema } from "./stop-time.schema";

export const mapStopTimeResponseToDomain = (data: unknown): StopTime[] => {
    try {
        const validated = v.parse(StopTimesResponseSchema, data);
        const times = validated.stopTimes.times.Time;

        // Handle single or multiple times
        const timeArray = Array.isArray(times) ? times : [times];

        return timeArray.map((time) => ({
            lineCode: time.line.codLine,
            lineShortDescription: time.line.shortDescription,
            lineDescription: time.line.description,
            direction: time.direction,
            destination: time.destination,
            time: time.time,
            destinationStopCode: time.destinationStop.codStop,
            destinationStopName: time.destinationStop.name,
        }));
    } catch (error) {
        if (error instanceof v.ValiError) {
            throw new ResponseMismatchError(
                `Invalid stop times response: ${error.message}`,
                data,
            );
        }
        throw new ResponseMismatchError("Failed to parse stop times data", data);
    }
};
