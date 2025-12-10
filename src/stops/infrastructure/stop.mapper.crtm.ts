import * as v from "valibot";
import type { Stop } from "../domain/stop.entity";
import { ResponseMismatchError } from "../../shared/errors";
import { StopResponseSchema } from "./stop.schema";

export const mapStopResponseToDomain = (data: unknown): Stop => {
    try {
        const validated = v.parse(StopResponseSchema, data);
        const stopInfo = validated.stops.StopInformation;

        return {
            id: stopInfo.codStop,
            name: stopInfo.name,
            latitude: parseFloat(String(stopInfo.coordinates.latitude)),
            longitude: parseFloat(String(stopInfo.coordinates.longitude)),
        };
    } catch (error) {
        if (error instanceof v.ValiError) {
            throw new ResponseMismatchError(
                `Invalid stop response: ${error.message}`,
                data,
            );
        }
        throw new ResponseMismatchError("Failed to parse stop data", data);
    }
};
