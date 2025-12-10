import * as v from "valibot";

const CoordinatesSchema = v.object({
    longitude: v.union([v.string(), v.number()]),
    latitude: v.union([v.string(), v.number()]),
});

const StopInformationSchema = v.object({
    codStop: v.string(),
    name: v.string(),
    coordinates: CoordinatesSchema,
});

export const StopResponseSchema = v.object({
    stops: v.object({
        StopInformation: StopInformationSchema,
    }),
});

export type StopResponse = v.InferOutput<typeof StopResponseSchema>;
