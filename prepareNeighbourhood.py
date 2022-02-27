import os;
import sys
folder=sys.argv[1]

def prepareMapFilesInFolder( file ):
    if "frontgrid.js" in file:
        with open(file, 'r') as original: data = original.read()
        with open(file, 'w') as modified: modified.write("const FRONT_GRID = " + data + "\n module.exports = { FRONT_GRID }")
    elif "grid.js" in file:
        with open(file, 'r') as original: data = original.read()
        with open(file, 'w') as modified: modified.write("const GRID = " + data + "\n module.exports = { GRID }")
    else:
        with open(file, 'r') as original: data = original.read()
        with open(file, 'w') as modified: modified.write("const globals = require('../../../../game-data/globals');\nconst { GRID } = require('./grid.js');\nconst { FRONT_GRID } = require('./frontgrid.js');\nmodule.exports =\n" + data)

        #input file
        fin = open(file, "rt")
        #output file to write the result to
        fout = open(file + 's', "wt")
        #for each line in the input file
        for line in fin:
            #read replace the string and write to output file
            line = line.replace('"FACING_DOWN"', 'globals.FACING_DOWN')
            line = line.replace('"FACING_LEFT"', 'globals.FACING_LEFT')
            line = line.replace('"FACING_UP"', 'globals.FACING_UP')
            line = line.replace('"FACING_RIGHT"', 'globals.FACING_RIGHT')
            line = line.replace('"NPC_ANIM_TYPE_IDLE"', 'globals.NPC_ANIM_TYPE_IDLE')
            line = line.replace('"FRONT_GRID"', 'FRONT_GRID')
            line = line.replace('"GRID"', 'GRID')
            fout.write(line)

        fin.close();
        fout.close();
        os.remove(file);
        os.rename(file + 's', file);

def importRawMapsToGame( folderToImport ):
    folderPath = ""
    for folder in os.listdir(folderToImport):
        folderPath = folderToImport+"\\"+folder;
        for file in os.listdir(folderPath):
            filePath = folderPath+"\\"+file
            with open(filePath, 'r') as original: data = original.read()
            prepareMapFilesInFolder( filePath );

importRawMapsToGame(folder)