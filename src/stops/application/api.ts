import type { Stop } from "../domain/stop.entity";
import type { StopRepository } from "../domain/stop.repository";
import { CrtmStopRepository } from "../infrastructure/stop.repository.crtm";

export const getStopByCode = async (code: string): Promise<Stop | null> => {
    const repository: StopRepository = new CrtmStopRepository();
    return await repository.findByCode(code);
}
