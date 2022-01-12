const tryCatch = ( functionToEvaluate, functionArguments = [] ) => {
    try {
        functionToEvaluate( ...functionArguments );
    }
    catch( ex ) {
        console.error(ex.message);
        console.trace();
    }
}

module.exports = {
    tryCatch
}