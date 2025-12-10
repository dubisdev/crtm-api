import * as v from "valibot";

const LineSchema = v.object({
    codLine: v.string(),
    shortDescription: v.string(),
    description: v.string(),
});

const DestinationStopSchema = v.object({
    codStop: v.string(),
    name: v.string(),
});

const TimeEntrySchema = v.object({
    line: LineSchema,
    direction: v.number(),
    destination: v.string(),
    time: v.string(),
    destinationStop: DestinationStopSchema,
});

export const StopTimesResponseSchema = v.object({
    stopTimes: v.object({
        times: v.object({
            Time: v.union([TimeEntrySchema, v.array(TimeEntrySchema)]),
        }),
    }),
});

export type StopTimesResponse = v.InferOutput<typeof StopTimesResponseSchema>;
