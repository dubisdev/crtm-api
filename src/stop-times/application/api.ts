import type { StopTimeRepository } from "../domain/stop-time.repository";
import type { StopTimesInfo } from "../domain/stop-times-info.entity";
import { CrtmStopTimeRepository } from "../infrastructure/stop-time.repository.crtm";

export const getStopTimesByStopCode = async (stopCode: string): Promise<StopTimesInfo> => {
    const repository: StopTimeRepository = new CrtmStopTimeRepository();
    return await repository.findByStopCode(stopCode);
}
