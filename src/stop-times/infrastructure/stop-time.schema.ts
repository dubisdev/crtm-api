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

const LineStatusSchema = v.object({
    line: v.object({
        codLine: v.string(),
        shortDescription: v.string(),
    })
})

export const StopTimesResponseSchema = v.object({
    stopTimes: v.object({
        stop: v.object({
            codStop: v.string(),
            shortCodStop: v.string(),
            name: v.string(),
        }),
        times: v.object({
            Time: v.optional(v.union([TimeEntrySchema, v.array(TimeEntrySchema)])),
        }),
        linesStatus: v.object({
            LineStatus: v.union([LineStatusSchema, v.array(LineStatusSchema)]),
        }),
    }),
});

export type StopTimesResponse = v.InferOutput<typeof StopTimesResponseSchema>;
