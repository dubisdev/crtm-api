import type { StopTimesInfo } from "./stop-times-info.entity";

export interface StopTimeRepository {
    findByStopCode(stopCode: string): Promise<StopTimesInfo>;
}
