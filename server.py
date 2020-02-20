from flask import Flask, request, send_from_directory
import json

app = Flask(__name__)

# Path for our main Svelte page
@app.route("/")
def base():
    return send_from_directory('client/public', 'index.html')

# Path for all the static files (compiled JS/CSS, etc.)
@app.route("/<path:path>")
def home(path):
    return send_from_directory('client/public', path)

@app.route("/save_game", methods=['GET', 'POST'])
def save_game():
    saveGame = request.json
    print(saveGame)
    with open('/static/savegames/currentUser/save_game.json', 'w') as json_file:
        json.dump(saveGame, json_file)
    return ("Success, (*&)er!")

if __name__ == "__main__":
    app.run(debug=True)