const tilesheets = {};

export const getTilesheetPng = ( key: string ): HTMLImageElement => {
    return tilesheets[key];
}
export const setTilesheetPng = ( key: string, tilesheet: HTMLImageElement ): void => {
    tilesheets[key] = tilesheet;
}

export const hasTilesheetPngWithKey = ( key: string ): boolean => {
    return key in tilesheets;
}