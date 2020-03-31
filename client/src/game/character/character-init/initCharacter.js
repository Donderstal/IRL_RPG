const Classes = require('./initClasses')

const classList = Classes.initClasses

const getCharWithClass = ( className, name ) => {
    for ( let classKey in classList ) { 
        if ( classKey === className ) {
            return new classList[className]( name )
        }
    }

}

module.exports = {
    // entry point to create a class with associated logic. Called from createCharInstance
    getCharWithClass
}