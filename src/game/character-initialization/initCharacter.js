const Classes = require('./initClasses')

const classList = Classes.classEnumerable

module.exports = {
    getClass : ( className ) => {
        for ( var key in classList ) { 
            if ( key === className ) {
                return classList[className]
            }
        }
    }
}