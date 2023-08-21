import type { Trigger } from "./Trigger";
import { getTriggerById, isRegisteredInTriggerRegistry } from "./triggerRegistry"

const triggerIsRegisteredById = ( id: string ) => {
    return isRegisteredInTriggerRegistry( id );
}
const getTrigger = ( id: string ) => {
    return getTriggerById( id ); 
}
export const getTriggerIfExists = ( id: string ): Trigger => {
    if ( triggerIsRegisteredById( id ) ) return getTrigger( id );
    return null;
}