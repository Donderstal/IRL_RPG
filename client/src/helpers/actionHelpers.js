const mapHelpers    = require('./mapHelpers')
const globals       = require('../game-data/globals')

const generateAction = ( type, actionSource, newXy = null, npcDirection = null ) => {
    if ( type === 'NPC' ) {

        const actionCellXy = mapHelpers.getXYOfCell( actionSource.row, actionSource.col )
        switch ( actionSource.direction ) {
            case ( 'FACING_LEFT' ) :
                actionSource.x = actionCellXy.x + globals.GRID_BLOCK_PX
                actionSource.top = actionCellXy.y - globals.GRID_BLOCK_PX
                actionSource.bottom = actionCellXy.y + globals.GRID_BLOCK_PX
                break
            case ( 'FACING_RIGHT' ) :
                actionSource.x = actionCellXy.x 
                actionSource.top = actionCellXy.y - globals.GRID_BLOCK_PX
                actionSource.bottom = actionCellXy.y + globals.GRID_BLOCK_PX
                break
            case ( 'FACING_UP' ) :
                actionSource.y = actionCellXy.y + globals.GRID_BLOCK_PX
                actionSource.left = actionCellXy.x
                actionSource.right = actionCellXy.x + globals.GRID_BLOCK_PX
                break
            case ( 'FACING_DOWN' ) :
                actionSource.y = actionCellXy.y - ( globals.GRID_BLOCK_PX * .5 )
                actionSource.left = actionCellXy.x
                actionSource.right = actionCellXy.x + globals.GRID_BLOCK_PX
        }
    }

    if ( type === 'MAP' ) {
        const actionCellXy = mapHelpers.getXYOfCell( actionSource.row, actionSource.col )
        switch ( actionSource.direction ) {
            case ( 'FACING_LEFT' ) :
                actionSource.x = actionCellXy.x + globals.GRID_BLOCK_PX
                actionSource.top = actionCellXy.y
                actionSource.bottom = actionCellXy.y + globals.GRID_BLOCK_PX
                break
            case ( 'FACING_RIGHT' ) :
                actionSource.x = actionCellXy.x 
                actionSource.top = actionCellXy.y
                actionSource.bottom = actionCellXy.y + globals.GRID_BLOCK_PX
                break
            default :
                actionSource.y = actionCellXy.y + globals.GRID_BLOCK_PX
                actionSource.left = actionCellXy.x
                actionSource.right = actionCellXy.x + globals.GRID_BLOCK_PX
        }
    }

    if ( type === 'UPDATE_NPC') {

        switch ( actionSource.direction ) {
            case ( 'FACING_LEFT' ) :
                actionSource.x = newXy.x + globals.GRID_BLOCK_PX
                actionSource.top = newXy.y - globals.GRID_BLOCK_PX
                actionSource.bottom = newXy.y + globals.GRID_BLOCK_PX
                break
            case ( 'FACING_RIGHT' ) :
                actionSource.x = newXy.x 
                actionSource.top = newXy.y - globals.GRID_BLOCK_PX
                actionSource.bottom = newXy.y + globals.GRID_BLOCK_PX
                break
            case ( 'FACING_UP' ) :
                actionSource.y = newXy.y + globals.GRID_BLOCK_PX
                actionSource.left = newXy.x
                actionSource.right = newXy.x + globals.GRID_BLOCK_PX
                break
            case ( 'FACING_DOWN' ) :
                actionSource.y = newXy.y - ( globals.GRID_BLOCK_PX * .5 )
                actionSource.left = newXy.x
                actionSource.right = newXy.x + globals.GRID_BLOCK_PX
        }
    }

    return actionSource
}

module.exports = {
    generateAction
}