import type { StopTimeRepository } from "../domain/stop-time.repository";
import { mapStopTimeResponseToDomain } from "./stop-time.mapper.crtm";
import { CRTM_API } from "../../shared/constants";
import { BaseCrtmRepository } from "../../shared/infrastructure/base.repository";
import type { StopTimesInfo } from "../domain/stop-times-info.entity";

export class CrtmStopTimeRepository extends BaseCrtmRepository implements StopTimeRepository {
    async findByStopCode(stopCode: string): Promise<StopTimesInfo> {
        return this.fetchAndMap(
            CRTM_API.ENDPOINTS.STOP_TIMES,
            {
                codStop: stopCode,
                type: "1",
                orderBy: "2",
                stopTimesByIti: "3"
            },
            mapStopTimeResponseToDomain
        );
    }
}
