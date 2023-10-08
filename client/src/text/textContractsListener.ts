import type { ShowEmoteContract } from "../contracts/ShowEmoteContract";
import type { ShowCenterTextBubbleContract } from "../contracts/ShowCenterTextBubbleContract";
import type { ShowSubtitleBubbleContract } from "../contracts/ShowSubtitleBubbleContract";
import type { ShowScreenTextContract } from "../contracts/ShowScreenTextContract";
import type { ShowSpeechBubbleContract } from "../contracts/ShowSpeechBubbleContract";
import { markContractAsAcknowledged, markContractAsFailed, unmarkContractAsPending } from "../contracts/contractRegistry";
import { getSpriteById } from "../game/modules/sprites/spriteGetter";
import { setNewEmote } from "./emote";
import { initCenterBubble } from "./centerBubble";
import { initSubtitleBubble } from "./subtitleBubble";
import { initScreenText } from "./screenText";
import { initSpeechBubble } from "./speechBubble";

export const acknowledgeShowEmoteContract = ( contract: ShowEmoteContract ): void => {
    try {
        const sprite = getSpriteById( contract.spriteId );
        setNewEmote( sprite.x, sprite.y, contract.emote, contract.contractId );
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete ShowEmoteContract with id ${contract.contractId}. Sprite ${contract.spriteId}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
}
export const acknowledgeShowCenterTextBubbleContract = ( contract: ShowCenterTextBubbleContract ): void => {
    try {
        initCenterBubble( contract.text, contract.contractId );
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete ShowCenterTextBubbleContract with id ${contract.contractId}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
}
export const acknowledgeShowSubtitleBubbleContract = ( contract: ShowSubtitleBubbleContract ): void => {
    try {
        initSubtitleBubble( contract.text, contract.contractId );
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete ShowSubtitleBubbleContract with id ${contract.contractId}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
}
export const acknowledgeShowScreenTextContract = ( contract: ShowScreenTextContract ): void => {
    try {
        initScreenText( contract.text, contract.isTitle, contract.maxWidth, contract.contractId );
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete ShowScreenTextContract with id ${contract.contractId}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
}
export const acknowledgeShowSpeechBubbleContract = ( contract: ShowSpeechBubbleContract ): void => {
    try {
        const speakingSprite = getSpriteById( contract.speakingSpriteId );
        initSpeechBubble( contract.text, speakingSprite.name, speakingSprite, contract.contractId );
        markContractAsAcknowledged( contract.contractId );
    }
    catch ( exception ) {
        console.log( `Failed to set contract ${contract.contractId}, retrying in next frame` );
        contract.attempts++
        unmarkContractAsPending( contract.contractId );
        if ( contract.attempts > 5 ) {
            console.log( `Failed to complete ShowSpeechBubbleContract with id ${contract.contractId}.` )
            console.error( exception );
            markContractAsFailed( contract.contractId );
        }
    }
}