const uiImages = {};

export const getUiImage = ( key: string ): HTMLImageElement => {
    return uiImages[key];
}
export const setUiImage = ( key: string, uiImage: HTMLImageElement ): void => {
    uiImages[key] = uiImage;
}

export const hasUiImageWithKey = ( key: string ): boolean => {
    return key in uiImages;
}