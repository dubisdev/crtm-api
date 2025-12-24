import type { StopTime } from "./stop-time.entity";

export type StopTimesInfo = {
    readonly stopCode: string;
    readonly shortStopCode: string;
    readonly stopName: string;

    readonly lines: { lineName: string, lineCode: string }[];

    readonly times: StopTime[];
};
