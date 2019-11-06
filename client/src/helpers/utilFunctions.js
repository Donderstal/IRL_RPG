const docReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// Get value of input fiel with ID
const getInputVal = (id) => {
    return document.getElementById(id).value
}   

//Return front Canvas ctx
const getFrontCanvasContext = () => {
    let canv = document.getElementsByTagName('canvas')[1]

    let ctx = canv.getContext('2d')

    return ctx
}

//Return back Canvas ctx
const getBackCanvasContext = () => {
    let canv = document.getElementsByTagName('canvas')[0]

    let ctx = canv.getContext('2d')

    return ctx
}


module.exports = {
    docReady,
    getInputVal,
    getFrontCanvasContext,
    getBackCanvasContext
}
