import * as v from "valibot";

const LineInfoSchema = v.object({
    codLine: v.string(),
    shortDescription: v.string(),
    description: v.string(),
    active: v.boolean(),
    colorLine: v.string(),
    text_colorLine: v.string(),
});

export const LineResponseSchema = v.object({
    lines: v.object({
        Line: LineInfoSchema,
    }),
});

export type LineResponse = v.InferOutput<typeof LineResponseSchema>;
