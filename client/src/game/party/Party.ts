import { Character } from './Character';
import { Inventory } from './Inventory';
import { getUniqueId } from '../../helpers/utilFunctions';
/**
 * A Party is a set of Character instances with a shared Inventory instance.
 * It is instantiated for the player on starting a new Game.
 * A Party is also instantiated for the opponents of the player when a battle begins.
 */
export class Party {
    memberIds: string[];
    members: Character[];
    inventory: Inventory;
    characterOnMapId: string;
    characterOnMapIndex; number;
    constructor( partyMembers ) {
        this.memberIds          = [ ];
        this.members            = [ ];
        this.inventory          = new Inventory( );
        this.characterOnMapId   = "";

        partyMembers.forEach(this.addMember.bind(this));
        this.characterOnMapId = this.memberIds[0];        
    }
    get characterActiveOnMap( ) { return this.members.filter((e)=>{ return e.Id === this.characterOnMapId })[0]; }
    get partySize() { return this.members.length; }

    addMember( memberData: { name: string; className: string } ): void {
        const id = getUniqueId( this.memberIds );
        this.memberIds.push(id);
        this.members.push( new Character( memberData.name, memberData.className, id ) );
    }

    removeMember( id: string ): void {
        this.memberIds = this.memberIds.filter((e)=>{ return e !== id });
        this.members = this.members.filter((e)=>{ return e.Id !== id });
    }

    addItemsToInventory( itemIdList: string[] ): void {
        this.inventory.addItemsToInnerListByID( itemIdList );
    }

    removeItemsFromInventory( itemIdList: string[] ): void {
        this.inventory.removeItemsFromInnerListByID( itemIdList )
    }
}