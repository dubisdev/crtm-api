import { CrtmStopTimeRepository } from "../infrastructure/stop-time.repository.crtm";

export const getStopTimesByStopCode = async (stopCode: string) => {
    const repository = new CrtmStopTimeRepository();
    return await repository.findByStopCode(stopCode);
}
