ReadMe last updated on November 9h, 2019

### IRL-RPG

Online RPG Game in Flask, Svelte and HTML5 Canvas

NOTE: as of now the project is mostly experimental. You can download it, but it will only have limited functionalities.

The latest working version of IRL_RPG can be found on the Next branch
When we get to that point, the Master branch will contain the latest stable release

#### INSTALLATION

Clone the repo to a folder on your machine

You will need Python 3. You will also need to install Flask by running ```pip install flask```

Cd to the ```client``` folder
Then run ```npm install```

Wait until all Node packages are installed.

Open a new terminal window and rund ```server.py``` to get the Flask server running
Finally, run ```npm run autobuild``` in the client folder. This will start the svelte compiler and watch for changes

After everything is compiled, you can visit the app on localhost:5000

#### LOG

### NOVEMBER 9th, 2019
* A functioning map generation system based on a tilesheet and a json file

### NOVEMBER 4th, 2019
* Basic server for serving JSON files which contain map information

### OCTOBER 16th, 2019
* User is able to select a class, gender and character name
* Basic controls are present, player can move and 
* Movement is animated with spritesheet
