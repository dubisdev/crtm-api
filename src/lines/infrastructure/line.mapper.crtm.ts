import * as v from "valibot";
import type { Line } from "../domain/line.entity";
import { ResponseMismatchError } from "../../shared/errors";
import { LineResponseSchema } from "./line.schema";

export const mapLineResponseToDomain = (data: unknown): Line => {
    try {
        const validated = v.parse(LineResponseSchema, data);
        const lineInfo = validated.lines.Line;

        return {
            code: lineInfo.codLine,
            shortDescription: lineInfo.shortDescription,
            description: lineInfo.description,
            active: lineInfo.active,
            colorLine: lineInfo.colorLine,
            textColorLine: lineInfo.text_colorLine,
        };
    } catch (error) {
        if (error instanceof v.ValiError) {
            throw new ResponseMismatchError(
                `Invalid line response: ${error.message}`,
                data,
            );
        }
        throw new ResponseMismatchError("Failed to parse line data", data);
    }
};
