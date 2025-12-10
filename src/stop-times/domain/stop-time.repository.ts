import type { StopTime } from "./stop-time.entity";

export interface StopTimeRepository {
    findByStopCode(stopCode: string): Promise<StopTime[]>;
}
