import * as v from "valibot";
import { ResponseMismatchError } from "../../shared/errors";
import { StopTimesResponseSchema } from "./stop-time.schema";
import type { StopTimesInfo } from "../domain/stop-times-info.entity";

export const mapStopTimeResponseToDomain = (data: unknown): StopTimesInfo => {
    try {
        const validated = v.parse(StopTimesResponseSchema, data);
        const times = validated.stopTimes.times.Time || [];

        // Handle single or multiple times
        const timeArray = Array.isArray(times) ? times : [times];

        const timesData = timeArray.map((time) => ({
            lineCode: time.line.codLine,
            lineShortDescription: time.line.shortDescription,
            lineDescription: time.line.description,
            direction: time.direction,
            destination: time.destination,
            time: time.time,
            destinationStopCode: time.destinationStop.codStop,
            destinationStopName: time.destinationStop.name,
        }));

        const lineArray = Array.isArray(validated.stopTimes.linesStatus.LineStatus)
            ? validated.stopTimes.linesStatus.LineStatus
            : [validated.stopTimes.linesStatus.LineStatus];

        const linesData = lineArray.map(lineStatus => ({
            lineCode: lineStatus.line.codLine,
            lineName: lineStatus.line.shortDescription,
        }));

        return {
            stopCode: validated.stopTimes.stop.codStop,
            shortStopCode: validated.stopTimes.stop.shortCodStop,
            stopName: validated.stopTimes.stop.name,
            lines: linesData,
            times: timesData,
        }

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
