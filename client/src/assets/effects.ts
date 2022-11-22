const effects = {};

export const getEffectPng = ( key: string ): HTMLImageElement => {
    return effects[key];
}
export const setEffectPng = ( key: string, effect: HTMLImageElement ): void => {
    effects[key] = effect;
}

export const hasEffectPngWithKey = ( key: string ): boolean => {
    return key in effects;
}