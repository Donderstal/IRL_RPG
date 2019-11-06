const mathHelpers = require('./mathHelpers')

const getRandomName = () => {

    const letterCollection = [
        [
            'a', 'e', 'i', 'o', 'u', 'y'
        ],
        [
            'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k',
            'l', 'm', 'n', 'p', 'q', 'r', 's', 't',
            'v', 'w', 'x', 'z'
        ]
    ]

    const letterCounter = {
        vowels : 0,
        consonants: 0,
        oddConsonants: false
    }

    let nameLength = mathHelpers.getRandomInteger(12)

    nameLength = checkNameLength ( nameLength )

    var name = '';

    for ( var i = 0; i < nameLength; i++ ) {
        name += getLetter( i, letterCollection, letterCounter )   
    }

    return name.charAt(0).toUpperCase() + name.slice(1);

}

// Retrieve letter from collection. Change letterCounter accordingly
const getLetter = ( i, letterCollection, letterCounter ) => {
    let letterArray;

    if ( i !== 0) {
        const letterType = getLetterType( letterCounter )
        letterArray = getLetterTypeFromCollection( letterCollection, letterType )
    }

    else {
        letterArray = getLetterTypeFromCollection( letterCollection )
    }

    const letter = getRandomEntryFromArray( letterArray )

    if (letter === 'j' || letter === 'x' || letter === 'q' ) {
        letterCounter.oddConsonants = true
    }

    ( letterArray == letterCollection[0] ) 
        ? letterCounter.vowels += 1 
        : letterCounter.consonants += 1 

    return letter
}

// check if name has a somewhat normal length
const checkNameLength = ( nameLength ) => {
    if ( nameLength < 1 ) {
        return nameLength += 3
    }
    if ( nameLength < 3 ) {
        return nameLength += 2
    }
    return nameLength
}

const getLetterTypeFromCollection = ( collection, type ) => {
    let letterType = type || null

    if ( letterType !== null ) {
        (letterType == 'V' ) ? letterType = 0 : letterType = 1
    }
    else {
        letterType = mathHelpers.getRandomInteger(2)
    }

    return collection[letterType]
}

const getRandomEntryFromArray = function  ( array ) {
    return array[ mathHelpers.getRandomInteger( array.length ) ]
}

// small 'algorithm' to somewhat mirror the structure of a normal English word
const getLetterType = ( letterCounter ) => {

    if ( letterCounter.oddConsonants !== true ) {
        if ( letterCounter.vowels <= 1 && letterCounter.consonants <= 1 ) {
            return ( mathHelpers.getRandomInteger(2) == 1 ) ? 'V' : 'C'
        }

        if ( letterCounter.vowels === 2 ) {
            letterCounter.vowels = 0
            return 'C'
        }

        if ( letterCounter.consonants === 2 ) {
            if ( mathHelpers.getRandomInteger(10) == 9 ) {
                return 'C'
            }
            letterCounter.consonants = 0
            return 'V'
        }

        if ( letterCounter.consonants === 3 ) {
            letterCounter.consonants = 0
            return 'V'
        }

        return mathHelpers.getRandomInteger(2)
    }

    else {
        letterCounter.consonants = 0
        letterCounter.oddConsonants = false
        return 'V'
    }
}


module.exports = {
    getRandomName
}