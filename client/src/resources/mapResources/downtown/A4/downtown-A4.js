const { 
    FACING_LEFT
} = require('../../../../game-data/globals');
module.exports = {
    "mapName": "downtown/A4",
    "tileSet": "downtown",
    "outdoors": true,
    "music": "game-jam.mp3",
    "roads" : [
        { "alignment": "HORI", "topRow": 10, "bottomRow": 11, "direction": FACING_LEFT, "hasStart": true }
      ],
    "neighbours": {
        "left": "downtown/A3",
        "right": "downtown/A5"
    },
    "rows":12,
    "columns":24,
    "grid":[[288,289,289,289,314,289,289,289,315,336,337,338,339,347,347,358,359,131,372,373,0,382,378,378],[300,293,303,306,295,303,294,318,319,340,341,342,343,356,357,362,363,131,376,377,0,392,421,394],[297,289,289,289,322,289,289,289,331,238,141,0,339,360,361,347,347,131,0,78,0,396,425,398],[304,305,305,305,307,312,313,305,335,0,0,56,339,68,347,101,346,131,58,0,41,400,401,402],[308,309,310,309,311,316,317,310,333,57,0,0,339,347,347,104,347,131,0,58,0,404,405,406],[0,56,0,160,0,0,0,0,0,0,56,0,339,346,347,347,347,131,0,0,0,0,57,0],[0,0,0,0,0,0,516,0,0,0,0,0,339,347,347,36,347,131,0,0,0,516,0,56],[57,0,60,64,0,0,58,0,125,126,0,119,339,36,347,347,347,131,370,0,0,370,0,0],[28,28,28,28,28,28,28,28,28,28,28,28,329,347,347,347,347,369,28,28,28,28,28,28],[347,347,33,34,35,35,35,35,35,35,70,347,347,347,36,347,347,347,66,67,67,67,67,67],[101,36,101,347,347,347,101,347,347,101,347,347,347,347,104,347,347,104,347,347,347,104,101,347],[101,39,347,39,37,39,37,39,347,39,347,39,347,39,347,39,347,39,347,39,347,39,36,39]]
}