const globals   = require('../../game-data/globals')

const gridGetter = () => {
    /* const newOverworld  = overworlds[gridName]
    const dimensions    = getDimensionsInPixels(newOverworld) */

    fetch('/public/overworlds/my-neighbourhood/my-house.json')
        .then( (response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            console.log(response)
            response.json()
        })
        .then( (mapJson) => {
            console.log(mapJson)
        })

}

module.exports = {
    gridGetter
}