import type { CollectableType } from "../enumerables/CollectableTypeEnum";
import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { SpriteSheetAlignmentEnum } from "../enumerables/SpriteSheetAlignmentEnum";
import type { SpriteFrameModel } from "./SpriteFrameModel";

export type SpriteDataModel = {
    key: string;
    src: string;
    dimensionalAlignment: SpriteSheetAlignmentEnum;
    image: HTMLImageElement;

    idleAnimation: boolean;
    idleAnimationFrames?: SpriteFrameModel[];

    canMove: boolean;
    movementFrames?: { [key in DirectionEnum]: SpriteFrameModel[] };

    onBackground: boolean;
    notGrounded: boolean;
    groundedAtBottom: boolean;

    isCar: boolean;
    isCharacter: boolean;

    widthBlocks?: number;
    heightBlocks?: number;

    horiWidthBlocks?: number;
    horiHeightBlocks?: number;
    vertWidthBlocks?: number;
    vertHeightBlocks?: number;

    isCollectable: boolean;
    collectableType?: CollectableType;

    hasBlockedArea: boolean;
    tileAlignment?: string;
    blockedArea?: object[];
}