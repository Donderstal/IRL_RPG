import type { InteractionModel } from "./InteractionModel"

export type MapActionModel = {
    column: number,
    row: number,
    action: InteractionModel[]
}