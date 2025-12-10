import type { Line } from "./line.entity";

export interface LineRepository {
    findByCode(code: string): Promise<Line | null>;
}
