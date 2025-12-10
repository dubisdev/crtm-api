import type { StopTime } from "../domain/stop-time.entity";
import type { StopTimeRepository } from "../domain/stop-time.repository";
import { mapStopTimeResponseToDomain } from "./stop-time.mapper.crtm";
import { CRTM_API } from "../../shared/constants";
import { BaseCrtmRepository } from "../../shared/infrastructure/base.repository";

export class CrtmStopTimeRepository extends BaseCrtmRepository implements StopTimeRepository {
    async findByStopCode(stopCode: string): Promise<StopTime[]> {
        return this.fetchAndMap(
            CRTM_API.ENDPOINTS.STOP_TIMES,
            { codStop: stopCode },
            mapStopTimeResponseToDomain
        );
    }
}
