import type { CharacterSpriteModel } from "./CharacterSpriteModel"
import type { MapObjectSpriteModel } from "./MapObjectSpriteModel"
import type { TilesheetModel } from "./TilesheetModel"

export type ImageModel = {
    image: HTMLImageElement,
    dataObject: CharacterSpriteModel | MapObjectSpriteModel | TilesheetModel
}