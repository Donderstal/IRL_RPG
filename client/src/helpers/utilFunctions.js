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

const fetchJSONWithCallback = ( url, callback, callbackParams = null ) => {
    fetch(url)
        .then( (response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json()
        })
        .then( (json) => {
            callback(json, callbackParams) 
        }
    )
}

module.exports = {
    docReady,
    getInputVal,
    fetchJSONWithCallback
}
