import { CrtmLineRepository } from "../infrastructure/line.repository.crtm";

export const getLineByCode = async (code: string) => {
    const repository = new CrtmLineRepository();
    return await repository.findByCode(code);
}
