const Classes = require('./initClasses')

const classList = Classes.initClasses

module.exports = {
    // entry point to create a class with associated logic. Called from createCharInstance
    getCharWithClass : ( className, name, gender ) => {
        for ( var key in classList ) { 
            if ( key === className ) {
                return new classList[className](name, gender)
            }
        }
    }
}