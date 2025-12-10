import { CrtmStopRepository } from "../infrastructure/stop.repository.crtm";

export const getStopByCode = async (code: string) => {
    const repository = new CrtmStopRepository();
    return await repository.findByCode(code);
}
