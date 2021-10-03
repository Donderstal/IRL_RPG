import glob;
import json;

# Push filepaths of all png files to a list and store that in a json file
with open('static/png-list.json', 'w') as f:
    fileList = glob.glob("static/*/*.png");
    trimmedFileList = []
    for fileName in fileList:  
        trimmedFileList.append("/" + fileName.replace("\\", "/"))
    json.dump(trimmedFileList, f)

with open('static/audio-list.json', 'w') as f:
    fileList =  glob.glob("static/*/*.mp3") + glob.glob("static/*/*.wav") + glob.glob("static/*/*/*.mp3") + glob.glob("static/*/*/*.wav");
    trimmedAudioList = []
    for fileName in fileList:  
        trimmedAudioList.append("/" + fileName.replace("\\", "/"))
    json.dump(trimmedAudioList, f)