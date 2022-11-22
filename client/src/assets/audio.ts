const audioFiles = {};

export const getAudioFile = ( key: string ): HTMLAudioElement => {
    return audioFiles[key];
}
export const setAudioFile = ( key: string, audio: HTMLAudioElement ): void => {
    audioFiles[key] = audio;
}

export const hasAudioFileWithKey = ( key: string ): boolean => {
    return key in audioFiles;
}