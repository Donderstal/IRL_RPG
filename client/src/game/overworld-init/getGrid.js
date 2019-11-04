const globals   = require('../../game-data/globals')

const gridGetter = () => {
    /* const newOverworld  = overworlds[gridName]
    const dimensions    = getDimensionsInPixels(newOverworld) */

    fetch('/static/overworlds/my-neighbourhood/my-house.json')
        .then( (response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            console.log(response)
            console.log(response.json())
        })
}

module.exports = {
    gridGetter
}