const getRandomInteger = ( limit ) => {
    return Math.floor( Math.random() * Math.floor( limit ) )
}

const getRandomGender = () => {
    const randomNum = module.exports.getRandomInteger(3) 
    if ( randomNum === 0 ) {
        return 'None of your business'
    }
    if ( randomNum === 1 ) {
        return 'M'
    }
    
    else {
        return 'F'            
    }

}

module.exports = {
    getRandomInteger,
    getRandomGender
}