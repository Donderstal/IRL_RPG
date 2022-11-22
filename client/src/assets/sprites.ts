const sprites = {};

export const getSpritePng = ( key: string ): HTMLImageElement => {
    return sprites[key];
}
export const setSpritePng = ( key: string, sprite: HTMLImageElement ): void => {
    sprites[key] = sprite;
}

export const hasSpritePngWithKey = ( key: string ): boolean => {
    return key in sprites;
}