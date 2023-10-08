import { getUiImage } from "../assets/ui";
import { markContractAsResolved } from "../contracts/contractRegistry";
import { GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_PX } from "../game-data/globals";
import { drawFromImageToCanvas } from "../helpers/canvasHelpers";

type EmoteModel = {
    x: number;
    y: number;
    image: HTMLImageElement;
    contractId: string;
};

const emoteFrames = 60;

let activeEmotes: EmoteModel[] = [];
let activeEmoteCounters: { [key in string]: number } = {};

export const emotesAreActive = (): boolean => { return activeEmotes.length >= 1 };

export const setNewEmote = ( x: number, y: number, src: string, contractId: string ): void => {
    activeEmotes.push( {
        x: x, y: y,
        image: getUiImage( src ),
        contractId: contractId
    } );

    activeEmoteCounters[contractId] = 0;
};
export const drawEmotes = (): void => {
    activeEmotes.forEach( drawEmote );

    checkIfEmotesShouldBeDeleted();
};

const drawEmote = ( emote: EmoteModel ): void => {
    drawFromImageToCanvas(
        emote.image,
        0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
        emote.x, emote.y, GRID_BLOCK_PX, GRID_BLOCK_PX
    );

    activeEmoteCounters[emote.contractId]++;
};
const checkIfEmotesShouldBeDeleted = (): void => {
    let finishedEmotes: string[] = [];
    activeEmotes.forEach( ( e ) => {
        const counter = activeEmoteCounters[e.contractId];
        if ( counter > emoteFrames ) finishedEmotes.push( e.contractId );
    } );

    finishedEmotes.forEach( deleteEmote );
};
const deleteEmote = ( emoteContractId: string ): void => {
    activeEmotes = activeEmotes.filter( ( e ) => { return e.contractId !== emoteContractId; } )
    delete activeEmoteCounters[emoteContractId];
    markContractAsResolved( emoteContractId );    
}