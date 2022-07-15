import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { SpriteSheetAlignmentEnum } from "../enumerables/SpriteSheetAlignmentEnum";

export type SpriteDataModel = {
    key: string;
    src: string;
    dimensionalAlignment: SpriteSheetAlignmentEnum;
    image: HTMLImageElement;

    idleAnimation: boolean;
    idleAnimationFrames?: { x: number, y: number }[][];

    canMove: boolean;
    movementFrames?: { [key in DirectionEnum]: {x: number, y: number}[] };

    onBackground: boolean;
    notGrounded: boolean;
    groundedAtBottom: boolean;
    isCar: boolean;

    widthBlocks?: number;
    heightBlocks?: number;

    horiWidthBlocks?: number;
    horiHeightBlocks?: number;
    vertWidthBlocks?: number;
    vertHeightBlocks?: number;

    isCollectable: boolean;
    collectableType?: string;

    hasBlockedArea: boolean;
    tileAlignment?: string;
    blockedArea?: object[];
}