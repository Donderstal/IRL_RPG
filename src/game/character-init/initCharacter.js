const Classes = require('./initClasses')

const classList = Classes.initClasses

module.exports = {
    getCharWithClass : ( className, name, gender ) => {
        for ( var key in classList ) { 
            if ( key === className ) {
                return new classList[className](name, gender)
            }
        }
    }
}