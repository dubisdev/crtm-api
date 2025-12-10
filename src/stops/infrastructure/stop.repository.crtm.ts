import type { Stop } from "../domain/stop.entity";
import type { StopRepository } from "../domain/stop.repository";
import { mapStopResponseToDomain } from "./stop.mapper.crtm";
import { CRTM_API } from "../../shared/constants";
import { BaseCrtmRepository } from "../../shared/infrastructure/base.repository";

export class CrtmStopRepository extends BaseCrtmRepository implements StopRepository {
    findAll(): Promise<Stop[]> {
        throw new Error("Method not implemented.");
    }

    async findByCode(code: string): Promise<Stop | null> {
        return this.fetchAndMap(
            CRTM_API.ENDPOINTS.STOP_INFORMATION,
            { codStop: code },
            mapStopResponseToDomain
        );
    }
}
