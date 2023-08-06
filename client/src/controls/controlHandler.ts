import { inCinematicState, inMenuState, inOpenWorldState, inWebsiteState } from "../state/stateGetter";
import { getActiveControls } from "./controlTranslator"

export const handleControls = (): void => {
    const activeControls = getActiveControls();
    if ( inWebsiteState() ) handleWebsiteControls( activeControls );
    if ( inOpenWorldState() ) handleOpenWorldControls( activeControls );
    if ( inCinematicState() ) handleCinematicControls( activeControls );
    if ( inMenuState() ) handleMenuControls( activeControls );
    console.log( activeControls )
}

export const handleWebsiteControls = ( activeControls: any[] ): void => {
    console.log( 'website controls...' )
}
export const handleOpenWorldControls = ( activeControls: any[] ): void => {
    console.log('open world controls')
}
export const handleCinematicControls = ( activeControls: any[] ): void => {
    console.log('cinematic controls')
}
export const handleMenuControls = ( activeControls: any[] ): void => {
    console.log( 'menu controls' )
}