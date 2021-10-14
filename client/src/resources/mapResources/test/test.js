const testDungeonOutside = require('./test-dungeon/outside/test-dungeon-outside');
const testDungeonHall = require('./test-dungeon/hall/test-dungeon-hall');
const testDungeonLobby = require('./test-dungeon/lobby/test-dungeon-lobby');
const hallWest = require('./test-dungeon/hall-west/hall-west');
const hallNorthWest = require('./test-dungeon/hall-northwest/hall-northwest');
const testActions = require('./test-actions/test-actions');
const TESTCARS = require('./test-cars/test-cars')
const testCollision = require('./test-collision/test-collision')
const newMapFormat = require('./new-map-format')
const crossingTest = require('./crossing-test')
const pathfindingTest = require('./pathfinding-test')
const pathfindingTest2 = require('./pathfinding-test-2')

module.exports = {
    "test-dungeon-outside": testDungeonOutside,
    'test-dungeon-hall': testDungeonHall,
    'test-dungeon-lobby': testDungeonLobby,
    'hall-west': hallWest,
    'hall-northwest': hallNorthWest,
    'test-actions': testActions,
    'test-collision': testCollision,
    'TEST_CARS' : TESTCARS,
    'newMapFormat' : newMapFormat,
    'crossing-test': crossingTest,
    'pathfinding-test': pathfindingTest,
    'pathfinding-test-2': pathfindingTest2
}