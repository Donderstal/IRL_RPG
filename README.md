Readme last updated on November 4th, 2019

### IRL-RPG

Online RPG Game in Flask, Svelte and HTML5 Canvas

#### INSTALLATION
NOTE: as of now the project is mostly experimental. You can download it, but it will only have limited functionalities.

The latest working version of IRL_RPG can be found on the Next branch
When we get to that point, the Master branch will contain the latest stable release


Clone the repo to a folder on your machine

You will need Python 3. You will also need to install Flask by running ```pip install flask```

Cd to the ```client``` folder
Then run ```npm install```

Wait until all Node packages are installed.

Open a new terminal window and rund ```server.py``` to get the Flask server running
Finally, run ```npm run autobuild``` in the client folder. This will start the svelte compiler and watch for changes

After everything is compiled, you can visit the app on localhost:5000

#### FEATURES
As of November 4th, 2019
* User is able to select a class, gender and character name
* Basic wasd controls are present, player character can move and movement is animated
* Basic server for serving JSON files which contain overworld information

Donderstal
