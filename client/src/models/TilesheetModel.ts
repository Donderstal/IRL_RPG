import type { TilesheetTypeEnum } from "../enumerables/TilesheetTypeEnum"

export type TilesheetModel = {
    name: string,
    key: string,
    src: string,
    uniqueTiles: number,
    category: TilesheetTypeEnum,
    blocked: []
}
