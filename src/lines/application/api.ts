import type { Line } from "../domain/line.entity";
import type { LineRepository } from "../domain/line.repository";
import { CrtmLineRepository } from "../infrastructure/line.repository.crtm";

export const getLineByCode = async (code: string): Promise<Line | null> => {
    const repository: LineRepository = new CrtmLineRepository();
    return await repository.findByCode(code);
}
