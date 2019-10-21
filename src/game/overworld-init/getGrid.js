// Overworld grid pseudo-code

// Json brainstorm

// We need a way to decide / determine what overworld is active
// Overworld logic will be stored in /game-data/overworlds.json 

// Sample json entry:

/**
 * 'overworld-name' : {
 *      src: /bg-image-path,
 *      dims: {
 *          // dimensions need to be stored here in blocks
 *          // so the program knows how to scale the background
 *          hori-blocks: INT,
 *          vert-blocks: INT
 *      },
 *      border-blocks: {
 *         //store coordinates 
 *      },
 *      doors: {
 *          'D10' : house-1,
 *          'H12' : overworld-2
 *      },
 *      inaccessible: {
 *          A4,
 *          B4,
 *          C4
 *      },
 *      triggers; {
 * 
 *      },
 *      NPCs: {
 *      // I probably want to store information on NPCs here
 *      // Possibly something like:
 *          NPC-one : {
 *              id: 'Overworld1-NPC1'
 *              text: 'Hey!',
 *              sprite: '/path/to/sprite',
 *              // if this NPC can be battled, we need to store info on his battle character
 *              className: influencer,
 *              level: 20
 *          }
 *      },
 *      subWorlds: {
 *          1: {
 *              src: /subworld-bg-image-path
 *          }
 *      }
 * }
 */