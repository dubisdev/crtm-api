import type { Line } from "../domain/line.entity";
import type { LineRepository } from "../domain/line.repository";
import { mapLineResponseToDomain } from "./line.mapper.crtm";
import { CRTM_API } from "../../shared/constants";
import { BaseCrtmRepository } from "../../shared/infrastructure/base.repository";

export class CrtmLineRepository extends BaseCrtmRepository implements LineRepository {
    async findByCode(code: string): Promise<Line | null> {
        return this.fetchAndMap(
            CRTM_API.ENDPOINTS.LINE_INFORMATION,
            { codLine: code },
            mapLineResponseToDomain
        );
    }
}
