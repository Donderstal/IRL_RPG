export type MapObjectSpriteModel = {
    key: string,
    src: string,
    dimensionalAlignment: string,

    widthBlocks?: number,
    heightBlocks?: number,

    horiWidthBlocks?: number,
    horiHeightBlocks?: number,
    vertWidthBlocks?: number,
    vertHeightBlocks?: number,

    idleAnimation: boolean,
    onBackground: boolean,
    notGrounded: boolean,
    groundedAtBottom: boolean,
    isCar: boolean,

    movementFrames?: object,
    idleAnimationFrames?: object[],
    collectableType?: string
    tileAlignment?: string,
    blockedArea?: object[]
}
