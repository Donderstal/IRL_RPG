import glob;
import json;

# Push filepaths of all png files to a list and store that in a json file
with open('static/png-list.json', 'w') as f:
    fileList = glob.glob("static/*/*.png");
    trimmedFileList = []
    for fileName in fileList:  
        trimmedFileList.append("/" + fileName.replace("\\", "/"))
    json.dump(trimmedFileList, f)