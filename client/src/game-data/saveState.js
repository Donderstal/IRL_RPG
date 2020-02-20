const state         = require('./state')

module.exports = {
        logState() {
         console.log(state)
         var xhttp = new XMLHttpRequest();
         xhttp.open("POST", "/save_game", true);
         xhttp.setRequestHeader("Content-type", "application/json");
         xhttp.send(JSON.stringify(state));
    }

} 