import type { Stop } from "./stop.entity";

export interface StopRepository {
    findAll(): Promise<Stop[]>;
    findByCode(code: string): Promise<Stop | null>;
}
