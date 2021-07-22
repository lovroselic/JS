"use strict";

var MAP = {
  1: {
    fixed: false,
    width: 50,
    height: 50,
    floor: "BrickWall4",
    background: "BrickWall",
    leaveDeadEnds: 8,
    bias: 2,
    MAX_ROOM: 10,
    ITERATIONS: 4
  },
  2: {
    fixed: false,
    width: "50",
    height: "50",
    floor: "BrickWall4",
    background: "StoneWall",
    leaveDeadEnds: 8,
    bias: 3,
    MAX_ROOM: 10,
    ITERATIONS: 4
  },
  3: {
    fixed: false,
    width: "50",
    height: "50",
    floor: "DungeonWall2",
    background: "BrickWall4",
    leaveDeadEnds: 8,
    bias: 3,
    MAX_ROOM: 10,
    ITERATIONS: 4
  },
  4: {
    fixed: false,
    width: "50",
    height: "50",
    floor: "FloorDg1",
    background: "WallDG1",
    leaveDeadEnds: 8,
    bias: 3,
    MAX_ROOM: 9,
    ITERATIONS: 4
  },
  5: {
    fixed: false,
    width: "50",
    height: "50",
    floor: "TlakFloor3",
    background: "BrickWall2",
    leaveDeadEnds: 11,
    bias: 4,
    MAX_ROOM: 8,
    ITERATIONS: 4
  },
  6: {
    fixed: false,
    width: "50",
    height: "50",
    floor: "DungeonFloor2",
    background: "BrickWall7",
    leaveDeadEnds: 11,
    bias: 2,
    MAX_ROOM: 10,
    ITERATIONS: 4
  },
  7: {
    fixed: false,
    width: "30",
    height: "30",
    floor: "TlakFloor",
    background: "BrickWall4",
    leaveDeadEnds: 8,
    bias: 2,
    MAX_ROOM: 5,
    ITERATIONS: 4
  },
  8: {
    fixed: false,
    width: "50",
    height: "50",
    floor: "BlackWall2",
    background: "DungeonFloor2",
    leaveDeadEnds: 8,
    bias: 3,
    MAX_ROOM: 8,
    ITERATIONS: 4
  },
  9: {
    fixed: true,
    packed: true,
    grid: [
      1048575,
      540673,
      541697,
      541697,
      984097,
      524321,
      524289,
      524289,
      643041,
      526369,
      526369,
      526377,
      526369,
      526369,
      626401,
      524325,
      524321,
      526337,
      526337,
      1048575
    ],
    width: "20",
    height: "20",
    floor: "DungeonFloor2",
    background: "BrickWall4",
    entrance: [2, 2],
    exit: [11, 10],
    gate: [11, 14],
    room: [9, 9, 5, 5]
  },
  10: {
    fixed: false,
    width: "50",
    height: "50",
    floor: "TlakFloor3",
    background: "LavaWall",
    leaveDeadEnds: 8,
    bias: 4,
    MAX_ROOM: 5,
    ITERATIONS: 5
  },
  11: {
    fixed: true,
    packed: true,
    grid: [
      1048575,
      528417,
      528417,
      544815,
      544809,
      1032961,
      529377,
      556769,
      528105,
      780333,
      526377,
      526379,
      526377,
      526381,
      782057,
      524929,
      557697,
      557697,
      524289,
      1048575
    ],
    width: "20",
    height: "20",
    floor: "MorgueFloor",
    background: "DungeonWall3",
    entrance: [2, 2],
    exit: [11, 7],
    gate: [11, 8],
    door: [11, 14],
    room: [9, 9, 5, 5]
  },
  12: {
    fixed: true,
    packed: true,
    grid: [
      1048575,
      524289,
      524289,
      524289,
      644545,
      562433,
      564673,
      562433,
      562625,
      524289,
      524289,
      524289,
      776377,
      662701,
      660645,
      775845,
      660397,
      774585,
      524289,
      1048575
    ],
    width: "20",
    height: "20",
    floor: "FloorDg1",
    background: "WallDG1",
    entrance: [2, 2]
  },
  clear: function () {
    for (let x = 1; x <= HERO.maxDepth; x++) {
      MAP[x].dungeonExist = false;
    }
  }
};
var CreateDungeon = {
  init: function () {
    MAZE.storeDeadEnds = true;
    MAZE.connectDeadEnds = false;
    MAZE.connectSome = true;
    MAZE.polishDeadEnds = true;
    MAZE.addConnections = false;
    MAZE.useBias = true;
    DUNGEON.CONFIGURE = true;
    DUNGEON.SET_ROOMS = true;
    DUNGEON.MIN_PADDING = 2;
    DUNGEON.MIN_ROOM = 4;
  },
  setUp: function (level) {
    MAZE.leaveDeadEnds = MAP[level].leaveDeadEnds;
    MAZE.bias = MAP[level].bias;
    DUNGEON.MAX_ROOM = MAP[level].MAX_ROOM;
    DUNGEON.ITERATIONS = MAP[level].ITERATIONS;
    DUNGEON.PAD = DUNGEON.MIN_ROOM + 2 * DUNGEON.MIN_PADDING; //minimum area
    DUNGEON.FREE = DUNGEON.MAX_ROOM + 4 * DUNGEON.MIN_PADDING; //not carving further
  },
  spreadScrolls: function (level) {
    MAP[level].DUNGEON.scrolls = [];
    for (let q = 0; q < INI.SCRpLVL; q++) {
      let grid = MAP[level].DUNGEON.getFreeAnyGrid();
      let selected = SCROLLS.chooseRandom();
      MAP[level].DUNGEON.scrolls.push(
        new Scroll(grid, selected.type, selected.use)
      );
    }
  },
  spreadBoosts: function (level) {
    MAP[level].DUNGEON.boosts = [];
    for (let q = 0; q < INI.WpLVL; q++) {
      let grid = MAP[level].DUNGEON.getFreeAnyGrid();
      MAP[level].DUNGEON.boosts.push(new Boost("weapon", grid));
      grid = MAP[level].DUNGEON.getFreeAnyGrid();
      MAP[level].DUNGEON.boosts.push(new Boost("armor", grid));
    }
    let grid = MAP[level].DUNGEON.getFreeAnyGrid();
    MAP[level].DUNGEON.boosts.push(new Boost("health", grid));
    grid = MAP[level].DUNGEON.getFreeAnyGrid();
    MAP[level].DUNGEON.boosts.push(new Boost("mana", grid));
    grid = MAP[level].DUNGEON.getFreeAnyGrid();
    MAP[level].DUNGEON.boosts.push(new Boost("magic", grid));
    if (MAP[level].DUNGEON.deadEnds.length > 0) {
      grid = MAP[level].DUNGEON.deadEnds.removeRandom();
      MAP[level].DUNGEON.reserved.push(grid);
    } else {
      grid = MAP[level].DUNGEON.getFreeAnyGrid();
    }
    MAP[level].DUNGEON.boosts.push(new Boost("agility", grid));
    //add random boost to start
    let start = MAP[level].DUNGEON.findRoom("start");
    if (start) {
      let grid1 = start.randomGrid();
      start.reserved.push(grid1);
      let boosts = ["weapon", "armor", "health", "mana", "magic", "agility"];
      MAP[level].DUNGEON.boosts.push(new Boost(boosts.chooseRandom(), grid1));
    }
  },
  spreadPotions: function (level) {
    MAP[level].DUNGEON.potions = [];
    let start = MAP[level].DUNGEON.findRoom("start");
    if (start) {
      for (let s = 0; s < 2; s++) {
        let grid = start.randomGrid();
        start.reserved.push(grid);
        MAP[level].DUNGEON.potions.push(new Potion("health", grid));
      }
    }
    if (!MAP[level].fixed) {
      for (let q = 0; q < INI.HPpLVL; q++) {
        let grid = MAP[level].DUNGEON.getFreeRoomGrid();
        MAP[level].DUNGEON.potions.push(new Potion("health", grid));
      }
    }
    for (let q = 0; q < INI.MPpCRD; q++) {
      let grid = MAP[level].DUNGEON.getFreeCorrGrid(
        MAP[level].DUNGEON.obstacles
      );
      let isDE = grid.isInAt(MAP[level].DUNGEON.deadEnds);
      if (isDE !== -1) MAP[level].DUNGEON.deadEnds.splice(isDE, 1);
      MAP[level].DUNGEON.potions.push(new Potion("magic", grid));
    }
  },
  spreadLamp: function (level) {
    MAP[level].DUNGEON.lamps = [];
    let start = MAP[level].DUNGEON.findRoom("start");
    if (start) {
      let grid = start.randomGrid();
      start.reserved.push(grid);
      MAP[level].DUNGEON.lamps.push(new Lamp(grid));
    }
    for (let q = 0; q < INI.LMPpLVL - 1; q++) {
      let grid = MAP[level].DUNGEON.getFreeAnyGrid();
      MAP[level].DUNGEON.lamps.push(new Lamp(grid));
    }
  },
  spreadGold: function (level) {
    MAP[level].DUNGEON.gold = [];
    if (!MAP[level].fixed) {
      for (let q = 0; q < INI.GBpLVL; q++) {
        let grid = MAP[level].DUNGEON.getFreeRoomGrid();
        MAP[level].DUNGEON.gold.push(new Gold(100, grid));
      }
      let GBpDE = INI.GBpDE;
      while (GBpDE > 0) {
        if (MAP[level].DUNGEON.deadEnds.length > 0) {
          let grid = MAP[level].DUNGEON.deadEnds.removeRandom();
          MAP[level].DUNGEON.gold.push(new Gold(100, grid));
          MAP[level].DUNGEON.reserved.push(grid);
        }
        GBpDE--;
      }
      for (let q = 0; q < INI.CpLVL; q++) {
        let grid = MAP[level].DUNGEON.getFreeRoomGrid();
        MAP[level].DUNGEON.gold.push(new Gold(RND(1, 10), grid));
      }
    }

    for (let q = 0; q < INI.CpCRD; q++) {
      let grid = MAP[level].DUNGEON.getFreeCorrGrid(
        MAP[level].DUNGEON.obstacles
      );
      let isDE = grid.isInAt(MAP[level].DUNGEON.deadEnds);
      if (isDE !== -1) MAP[level].DUNGEON.deadEnds.splice(isDE, 1);
      MAP[level].DUNGEON.gold.push(new Gold(RND(1, 10), grid));
    }

    if (GAME.completed) {
      for (let q = 0; q < INI.FINAL_GOLD; q++) {
        let grid = MAP[level].DUNGEON.getFreeCorrGrid();
        MAP[level].DUNGEON.gold.push(new Gold(100, grid));
      }
    }
  },
  spreadChests: function (level) {
    MAP[level].DUNGEON.chests = [];
    if (MAP[level].fixed) return;
    let number = INI.CHpLVL;
    let DE_number = RND(
      RND(
        Math.max(MAP[level].DUNGEON.deadEnds.length - 2, 0),
        MAP[level].DUNGEON.deadEnds.length
      ),
      MAP[level].DUNGEON.deadEnds.length
    );
    number -= DE_number;
    while (DE_number > 0) {
      let grid = MAP[level].DUNGEON.deadEnds.removeRandom();
      MAP[level].DUNGEON.chests.push(new Chest(grid));
      MAP[level].DUNGEON.reserved.push(grid);
      DE_number--;
    }
    while (number > 0) {
      let grid = MAP[level].DUNGEON.getFreeRoomGrid();
      MAP[level].DUNGEON.chests.push(new Chest(grid));
      number--;
    }
  },
  spawn: function (level) {
    MAP[level].DUNGEON.ENEMY = [];
    let rooms = MAP[level].DUNGEON.rooms;
    for (let q = 0, QL = rooms.length; q < QL; q++) {
      let room = rooms[q];
      let CN;
      switch (room.type) {
        case "common":
          CN = getCommonNumber();
          spawnRoom(room, CN, "common");
          break;
        case "key":
        case "silver":
          CN = getCommonNumber();
          spawnRoom(room, CN, "common");
          spawnRoom(room, INI.ENEMY_KEY_ADD, "key");
          break;
        case "start":
          spawnRoom(room, INI.ENEMY_START, "start");
          break;
        case "end":
          CN = getCommonNumber();
          spawnRoom(room, CN, "common");
          spawnRoom(room, INI.ENEMY_END_ADD, "end");
          spawnRoom(room, 1, "boss");
          break;
        case "temple":
          spawnRoom(room, INI.ENEMY_TEMPLE, "temple");
          break;
        default:
          console.log("room.type ERROR");
      }
    }
    let enemyNumber = CreateDungeon.factor(INI.ENEMY_CORRIDOR, level);
    for (let q = 0; q < enemyNumber; q++) {
      let grid = MAP[level].DUNGEON.getUninhabitedCorrGrid(
        MAP[level].DUNGEON.obstacles
      );
      MAP[level].DUNGEON.ENEMY.push(
        new Monster(MONSTER_LAYOUT[level].corridor.chooseRandom(), grid)
      );
    }

    return;

    function getCommonNumber() {
      return RND(INI.ENEMY_COMMON - 1, INI.ENEMY_COMMON + 1);
    }
    function spawnRoom(room, number, type) {
      let grid, enemy;
      do {
        grid = room.random_Uninhabited_Grid(MAP[level].DUNGEON.obstacles);
        enemy = new Monster(MONSTER_LAYOUT[level][type].chooseRandom(), grid);
        if (enemy.strategy === "goto") setGuarding();
        MAP[level].DUNGEON.ENEMY.push(enemy);
        number--;
      } while (number > 0);
      return;

      function setGuarding() {
        const guardPairs = {
          end: "exit",
          key: "goldKey",
          silver: "silverKey"
        };
        enemy.guarding = MAP[GAME.level].DUNGEON[guardPairs[room.type]];
      }
    }
  },
  spawnOpenSpace: function (level) {
    for (let q = 0; q < INI.ENEMY_OPENSPACE; q++) {
      let grid = MAP[level].DUNGEON.getUninhabitedCorrGrid(
        MAP[level].DUNGEON.obstacles
      );
      MAP[level].DUNGEON.ENEMY.push(
        new Monster(MONSTER_LAYOUT[level].openSpace.chooseRandom(), grid)
      );
    }
  },
  spawnKeyholder: function (level) {
    let grid = MAP[level].DUNGEON.getUninhabitedCorrGrid(
      MAP[level].DUNGEON.obstacles
    );
    MAP[level].DUNGEON.ENEMY.push(
      new Monster(MONSTER_LAYOUT[level].keyholder.chooseRandom(), grid)
    );
  },
  spawnNemesis: function (level, origin) {
    let grid = MAP[origin].DUNGEON.entrance;
    MAP[origin].DUNGEON.ENEMY.push(
      new Monster(MONSTER_LAYOUT[level].nemesis.chooseRandom(), grid, true)
    );
  },
  mapAnchors: function (level) {
    MAP[level].DUNGEON.mapAnchors = [];
    MAP[level].DUNGEON.mapAnchors.push(
      MAP[level].DUNGEON.temple,
      MAP[level].DUNGEON.exit,
      MAP[level].DUNGEON.goldKey,
      MAP[level].DUNGEON.silverKey
    );
  },
  factor: function (ini, level) {
    let factor = Math.ceil(
      (ini * (MAP[level].width * MAP[level].height)) / 2500
    );
    return factor;
  },
  create: function (level) {
    console.log(`%cCreating Dungeon for level ${level}`, "color: #888");
    CreateDungeon.setUp(level);
    console.log("DUNGEON settings", DUNGEON);
    let t1 = performance.now();
    let dungeon = DUNGEON.create(MAP[level].width, MAP[level].height);
    MAP[level].DUNGEON = dungeon;
    MAP[level].grid = dungeon.grid;
    MAP[level].dungeonExist = true;
    MAP[level].returning = false;
    MAP[level].DUNGEON.setObstacles(
      MAP[level].DUNGEON.door,
      MAP[level].DUNGEON.gate
    );
    CreateDungeon.spreadLamp(level);
    CreateDungeon.spreadGold(level);
    CreateDungeon.spreadPotions(level);
    CreateDungeon.spreadBoosts(level);
    CreateDungeon.spreadChests(level);
    CreateDungeon.spreadScrolls(level);
    CreateDungeon.spawn(level);
    CreateDungeon.mapAnchors(level);
    console.log(
      "Created Dungeon: ",
      MAP[level].DUNGEON,
      " in ",
      performance.now() - t1,
      " ms."
    );
    console.log(`%c--------------------`, "color: #888");
  },
  gridToDungeon: function (level) {
    //obstacles! need to include exit!
    console.log(`%cSetting grid to Dungeon for level ${level}`, "color: #888");
    let t1 = performance.now();

    MAP[level].DUNGEON = new FixedDungeon(
      MAP[level].width,
      MAP[level].height,
      GRID.map.unpack(MAP[level])
    );
    MAP[level].grid = MAP[level].DUNGEON.grid;
    MAP[level].DUNGEON.entrance = new Grid(
      MAP[level].entrance[0],
      MAP[level].entrance[1]
    );
    if (level !== INI.LAST_LEVEL) {
      MAP[level].DUNGEON.exit = new Grid(
        MAP[level].exit[0],
        MAP[level].exit[1]
      );
      MAP[level].DUNGEON.gate = new Grid(
        MAP[level].gate[0],
        MAP[level].gate[1]
      );

      if (MAP[level].door) {
        MAP[level].DUNGEON.door = new Grid(
          MAP[level].door[0],
          MAP[level].door[1]
        );
      }

      let area = new Area(
        MAP[level].room[0],
        MAP[level].room[1],
        MAP[level].room[2],
        MAP[level].room[3]
      );
      let room = new Room(0, area);
      room.type = "end";
      MAP[level].DUNGEON.rooms = [room];
      //check if this applicable for level 9
      MAP[level].DUNGEON.setObstacles(
        MAP[level].DUNGEON.gate,
        MAP[level].DUNGEON.door,
        MAP[level].DUNGEON.exit
      );
    }

    MAP[level].dungeonExist = true;
    MAP[level].returning = false;
    CreateDungeon.spreadLamp(level);
    CreateDungeon.spreadGold(level);
    MAP[level].DUNGEON.mapAnchors = [];

    if (level !== INI.LAST_LEVEL) {
      CreateDungeon.spawn(level);
      CreateDungeon.spawnOpenSpace(level);
      CreateDungeon.spawnKeyholder(level);
      CreateDungeon.spreadPotions(level);
      CreateDungeon.spreadBoosts(level);
      CreateDungeon.spreadChests(level);
      CreateDungeon.spreadScrolls(level);
    } else {
      MAP[level].DUNGEON.ENEMY = [];
      MAP[level].DUNGEON.potions = [];
      MAP[level].DUNGEON.boosts = [];
      MAP[level].DUNGEON.chests = [];
      MAP[level].DUNGEON.scrolls = [];
    }

    console.log(
      "Created Dungeon: ",
      MAP[level].DUNGEON,
      " in ",
      performance.now() - t1,
      " ms."
    );
    console.log(`%c--------------------`, "color: #888");
  }
};
var MONSTER = {
  LittleSnake: {
    name: "LittleGreenSnake",
    title: "Little Green Snake",
    speed: 2,
    weapon: 2,
    armor: 0,
    magicResistance: 0,
    health: 10,
    mana: 0,
    magic: 0,
    agility: 2,
    exp: 5,
    gold: 5,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 6
    }
  },
  TinySnake: {
    name: "LittleGreenSnake",
    title: "Tiny Green Snake",
    speed: 3,
    weapon: 1,
    armor: 0,
    magicResistance: 0,
    health: 5,
    mana: 0,
    magic: 0,
    agility: 1,
    exp: 2,
    gold: 2,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 6
    }
  },
  BabySnake: {
    name: "LittleGreenSnake",
    title: "Baby Snake",
    speed: 1,
    weapon: 1,
    armor: 0,
    magicResistance: 0,
    health: 2,
    mana: 0,
    magic: 0,
    agility: 1,
    exp: 1,
    gold: 1,
    strategy: "wander",
    triggers: {
      hunt: 5,
      wander: 8
    }
  },
  GreenSnake: {
    name: "Snake",
    title: "Green Snake",
    speed: 1,
    weapon: 3,
    armor: 0,
    magicResistance: 0,
    health: 12,
    mana: 0,
    magic: 0,
    agility: 3,
    exp: 10,
    gold: 10,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 6
    }
  },
  NastyGreenSnake: {
    name: "Snake",
    title: "Nasty Green Snake",
    speed: 1,
    weapon: 6,
    armor: 0,
    magicResistance: 0,
    health: 15,
    mana: 0,
    magic: 0,
    agility: 2,
    exp: 20,
    gold: 25,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 6
    }
  },
  BrittleSkeleton: {
    name: "Wanderer",
    title: "Brittle Skeleton",
    speed: 2,
    weapon: 4,
    armor: 0,
    magicResistance: 0,
    health: 10,
    mana: 0,
    magic: 0,
    agility: 2,
    exp: 15,
    gold: 10,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 6
    }
  },
  Skeleton: {
    name: "Wanderer",
    title: "Skeleton",
    speed: 2,
    weapon: 6,
    armor: 1,
    magicResistance: 1,
    health: 15,
    mana: 0,
    magic: 0,
    agility: 2,
    exp: 25,
    gold: 20,
    strategy: "wander",
    triggers: {
      hunt: 5,
      wander: 10
    }
  },
  Ghosty: {
    name: "Ghosty",
    title: "Ghosty",
    speed: 4,
    weapon: 8,
    armor: 3,
    magicResistance: 5,
    health: 35,
    mana: 50,
    magic: 2,
    agility: 5,
    exp: 50,
    gold: 50,
    immunity: true,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 6
    },
    inventory: {
      type: "boost",
      value: ["weapon", "armor", "magic"]
    }
  },
  ApprenticeWizard: {
    name: "Wizard",
    title: "Apprentice Wizard",
    speed: 2,
    weapon: 8,
    armor: 4,
    magicResistance: 3,
    health: 30,
    mana: 30,
    magic: 4,
    agility: 2,
    exp: 50,
    gold: 50,
    strategy: "hunt",
    immunity: true,
    triggers: {
      hunt: 999,
      wander: 999
    },
    inventory: {
      type: "boost",
      value: ["health", "mana", "magic"]
    }
  },
  BlackSnake: {
    name: "BlackSnake",
    title: "Timid Black Snake",
    speed: 2,
    weapon: 6,
    armor: 3,
    magicResistance: 3,
    health: 20,
    mana: 0,
    magic: 0,
    agility: 3,
    exp: 30,
    gold: 50,
    strategy: "goto",
    triggers: {
      hunt: 1,
      wander: 999
    }
  },
  GreenMeanie: {
    name: "Snake",
    title: "Green Meanie",
    speed: 1,
    weapon: 7,
    armor: 2,
    magicResistance: 1,
    health: 25,
    mana: 0,
    magic: 0,
    agility: 4,
    exp: 20,
    gold: 20,
    strategy: "wander",
    triggers: {
      hunt: 2,
      wander: 7
    }
  },
  BlackSnake2: {
    name: "BlackSnake",
    title: "Black Snake",
    speed: 2,
    weapon: 7,
    armor: 4,
    magicResistance: 2,
    health: 28,
    mana: 0,
    magic: 0,
    agility: 4,
    exp: 30,
    gold: 25,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 7
    }
  },
  WeakPuffy: {
    name: "Puffy",
    title: "Weak Puffy",
    speed: 2,
    weapon: 8,
    armor: 3,
    magicResistance: 3,
    health: 30,
    mana: 30,
    magic: 4,
    agility: 4,
    exp: 30,
    gold: 25,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 7
    }
  },
  Puffy: {
    name: "Puffy",
    title: "Puffy",
    speed: 2,
    weapon: 9,
    armor: 5,
    magicResistance: 3,
    health: 40,
    mana: 50,
    magic: 5,
    agility: 4,
    exp: 40,
    gold: 25,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 8
    }
  },
  Wizard: {
    name: "Wizard",
    title: "Wizard",
    speed: 2,
    weapon: 13,
    armor: 8,
    magicResistance: 8,
    health: 50,
    mana: 30,
    magic: 4,
    agility: 5,
    exp: 50,
    gold: 50,
    strategy: "wander",
    triggers: {
      hunt: 6,
      wander: 8
    }
  },
  MasterWizard: {
    name: "Wizard",
    title: "Master Wizard",
    speed: 2,
    weapon: 17,
    armor: 14,
    magicResistance: 10,
    health: 80,
    mana: 100,
    magic: 13,
    agility: 6,
    exp: 60,
    gold: 50,
    strategy: "wander",
    triggers: {
      hunt: 6,
      wander: 8
    }
  },
  Croc: {
    name: "Croc",
    title: "Croc",
    speed: 3,
    weapon: 11,
    armor: 8,
    magicResistance: 5,
    health: 100,
    mana: 100,
    magic: 5,
    agility: 6,
    exp: 75,
    gold: 125,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 999,
      wander: 999
    },
    inventory: {
      type: "boost",
      value: ["health", "weapon", "armor"]
    }
  },
  EnragedGhost: {
    name: "Ghosty",
    title: "Enraged Ghost",
    speed: 4,
    weapon: 11,
    armor: 6,
    magicResistance: 5,
    health: 50,
    mana: 50,
    magic: 8,
    agility: 5,
    exp: 50,
    gold: 50,
    immunity: true,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 6
    },
    inventory: {
      type: "potion",
      value: ["health", "health", "magic"]
    }
  },
  HardenedSkeleton: {
    name: "Wanderer",
    title: "Hardened Skeleton",
    speed: 2,
    weapon: 9,
    armor: 5,
    magicResistance: 2,
    health: 25,
    mana: 0,
    magic: 0,
    agility: 3,
    exp: 35,
    gold: 20,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    }
  },
  Death: {
    name: "Death",
    title: "Minor Reaper",
    speed: 4,
    weapon: 13,
    armor: 9,
    magicResistance: 10,
    health: 100,
    mana: 250,
    magic: 6,
    agility: 6,
    exp: 100,
    gold: 250,
    immunity: true,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 6
    },
    inventory: {
      type: "boost",
      value: ["weapon", "armor", "magic", "health"]
    }
  },
  BlackSnake3: {
    name: "BlackSnake",
    title: "Nasty Black Snake",
    speed: 3,
    weapon: 9,
    armor: 6,
    magicResistance: 3,
    health: 35,
    mana: 0,
    magic: 0,
    agility: 4,
    exp: 35,
    gold: 50,
    strategy: "goto",
    triggers: {
      hunt: 1,
      wander: 999
    }
  },
  BlackSnake4: {
    name: "BlackSnake",
    title: "Nasty Black Snake",
    speed: 3,
    weapon: 13,
    armor: 10,
    magicResistance: 3,
    health: 35,
    mana: 0,
    magic: 0,
    agility: 4,
    exp: 35,
    gold: 50,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    }
  },
  SickZombieGirl: {
    name: "ZombieGirl",
    title: "Sick Zombie Girl",
    speed: 1,
    weapon: 12,
    armor: 8,
    magicResistance: 0,
    health: 50,
    mana: 0,
    magic: 0,
    agility: 3,
    exp: 40,
    gold: 40,
    strategy: "wander",
    triggers: {
      hunt: 2,
      wander: 8
    }
  },
  ZombieGirl: {
    name: "ZombieGirl",
    title: "Zombie Girl",
    speed: 1,
    weapon: 15,
    armor: 13,
    magicResistance: 0,
    health: 60,
    mana: 0,
    magic: 0,
    agility: 4,
    exp: 50,
    gold: 40,
    strategy: "wander",
    triggers: {
      hunt: 2,
      wander: 8
    }
  },
  ZombieLady: {
    name: "ZombieGirl",
    title: "Zombie Lady",
    speed: 1,
    weapon: 19,
    armor: 16,
    magicResistance: 0,
    health: 80,
    mana: 0,
    magic: 0,
    agility: 8,
    exp: 65,
    gold: 50,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 7
    }
  },
  AngryCroc: {
    name: "Croc",
    title: "Angry Croc",
    speed: 3,
    weapon: 16,
    armor: 14,
    magicResistance: 5,
    health: 65,
    mana: 75,
    magic: 7,
    agility: 7,
    exp: 60,
    gold: 50,
    immunity: true,
    strategy: "wander",
    triggers: {
      hunt: 7,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["health", "magic"]
    }
  },
  YoungHaunter: {
    name: "Ghost",
    title: "Young Haunter",
    speed: 6,
    weapon: 12,
    armor: 11,
    magicResistance: 3,
    health: 50,
    mana: 250,
    magic: 15,
    agility: 10,
    exp: 75,
    gold: 75,
    strategy: "wander",
    triggers: {
      hunt: 5,
      wander: 8
    }
  },
  Death2: {
    name: "Death",
    title: "Minor Reaper",
    speed: 4,
    weapon: 15,
    armor: 12,
    magicResistance: 10,
    health: 100,
    mana: 250,
    magic: 10,
    agility: 6,
    exp: 70,
    gold: 75,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 6
    }
  },
  ScaryGhost: {
    name: "ScaryGhost",
    title: "Scary Ghost",
    speed: 4,
    weapon: 22,
    armor: 19,
    magicResistance: 8,
    health: 120,
    mana: 150,
    magic: 13,
    agility: 8,
    exp: 100,
    gold: 100,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 999,
      wander: 999
    },
    inventory: {
      type: "boost",
      value: ["health", "health", "magic", "agility", "agility"]
    }
  },
  Reaper: {
    name: "Death",
    title: "Reaper",
    speed: 4,
    weapon: 25,
    armor: 20,
    magicResistance: 10,
    health: 150,
    mana: 300,
    magic: 15,
    agility: 8,
    exp: 200,
    gold: 250,
    immunity: true,
    strategy: "wander",
    triggers: {
      hunt: 6,
      wander: 8
    },
    inventory: {
      type: "boost",
      value: ["weapon", "armor", "magic", "health"]
    }
  },
  OldSorceress: {
    name: "Sorceress",
    title: "Old Sorceress",
    speed: 1,
    weapon: 17,
    armor: 14,
    magicResistance: 15,
    health: 90,
    mana: 200,
    magic: 15,
    agility: 10,
    exp: 60,
    gold: 50,
    luck: 5,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["magic"]
    }
  },
  Sorceress: {
    name: "Sorceress",
    title: "Sorceress",
    speed: 2,
    weapon: 21,
    armor: 19,
    magicResistance: 15,
    health: 100,
    mana: 300,
    magic: 15,
    agility: 12,
    exp: 80,
    gold: 100,
    luck: 10,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 8
    },
    inventory: {
      type: "boost",
      value: ["magic"]
    }
  },
  Scorpion: {
    name: "Scorpion",
    title: "Scorpion",
    speed: 2,
    weapon: 17,
    armor: 17,
    magicResistance: 0,
    health: 90,
    mana: 0,
    magic: 0,
    agility: 10,
    exp: 65,
    gold: 50,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 8
    }
  },
  LazySpider: {
    name: "Spider",
    title: "Lazy Spider",
    speed: 1,
    weapon: 16,
    armor: 16,
    magicResistance: 0,
    health: 85,
    mana: 0,
    magic: 0,
    agility: 11,
    exp: 65,
    gold: 50,
    strategy: "wander",
    triggers: {
      hunt: 2,
      wander: 5
    }
  },
  Spider: {
    name: "Spider",
    title: "Spider",
    speed: 2,
    weapon: 18,
    armor: 15,
    magicResistance: 0,
    health: 100,
    mana: 0,
    magic: 0,
    agility: 12,
    exp: 75,
    gold: 60,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    }
  },
  GreenSpider: {
    name: "GreenSpider",
    title: "Green Spider",
    speed: 2,
    weapon: 19,
    armor: 19,
    magicResistance: 0,
    health: 95,
    mana: 0,
    magic: 0,
    agility: 11,
    exp: 80,
    gold: 60,
    strategy: "wander",
    triggers: {
      hunt: 6,
      wander: 8
    }
  },
  Haunter: {
    name: "Ghost",
    title: "Haunter",
    speed: 6,
    weapon: 16,
    armor: 16,
    magicResistance: 5,
    health: 70,
    mana: 300,
    magic: 18,
    agility: 15,
    exp: 100,
    gold: 100,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    },
    inventory: {
      type: "boost",
      value: ["agility"]
    }
  },
  Bony: {
    name: "Bony",
    title: "Bony",
    speed: 3,
    weapon: 27,
    armor: 22,
    magicResistance: 5,
    health: 200,
    mana: 0,
    magic: 0,
    agility: 20,
    exp: 250,
    gold: 250,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 999,
      wander: 999
    },
    inventory: {
      type: "boost",
      value: ["agility"]
    }
  },
  Reaper2: {
    name: "Death2",
    title: "Master Reaper",
    speed: 4,
    weapon: 26,
    armor: 23,
    magicResistance: 20,
    health: 200,
    mana: 500,
    magic: 20,
    agility: 20,
    exp: 300,
    gold: 500,
    strategy: "wander",
    triggers: {
      hunt: 6,
      wander: 8
    },
    inventory: {
      type: "boost",
      value: ["weapon", "armor", "health"]
    }
  },
  SkeletonWarrior: {
    name: "SkeletonWarrior",
    title: "Skeleton Warrior",
    speed: 1,
    weapon: 23,
    armor: 23,
    magicResistance: 0,
    health: 100,
    mana: 0,
    magic: 0,
    agility: 15,
    exp: 100,
    gold: 100,
    strategy: "wander",
    triggers: {
      hunt: 5,
      wander: 8
    }
  },
  SkeletonOfficer: {
    name: "SkeletonBoss",
    title: "Skeleton Officer",
    speed: 2,
    weapon: 25,
    armor: 25,
    magicResistance: 0,
    health: 100,
    mana: 0,
    magic: 0,
    agility: 20,
    exp: 150,
    gold: 100,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["health"]
    }
  },
  BonyGuard: {
    name: "Bony",
    title: "Bony Guard",
    speed: 2,
    weapon: 24,
    armor: 23,
    magicResistance: 5,
    health: 120,
    mana: 0,
    magic: 0,
    agility: 20,
    exp: 120,
    gold: 100,
    immunity: true,
    strategy: "goto",
    triggers: {
      hunt: 1,
      wander: 999
    },
    inventory: {
      type: "boost",
      value: ["agility"]
    }
  },
  VeryScaryGhost: {
    name: "ScaryGhost",
    title: "Very Scary Ghost",
    speed: 4,
    weapon: 26,
    armor: 22,
    magicResistance: 10,
    health: 120,
    mana: 150,
    magic: 16,
    agility: 15,
    exp: 125,
    gold: 100,
    immunity: true,
    strategy: "wander",
    triggers: {
      hunt: 7,
      wander: 8
    },
    inventory: {
      type: "boost",
      value: ["health", "health", "magic", "agility", "agility"]
    }
  },
  BigHead: {
    name: "BigHead",
    title: "Bighead",
    speed: 2,
    weapon: 33,
    armor: 28,
    magicResistance: 15,
    health: 250,
    mana: 0,
    magic: 0,
    agility: 22,
    exp: 400,
    gold: 300,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 999,
      wander: 999
    },
    inventory: {
      type: "boost",
      value: ["health", "health", "weapon", "armor"]
    }
  },
  SkeletonGeneral: {
    name: "SkeletonBoss2",
    title: "Skeleton General",
    speed: 2,
    weapon: 32,
    armor: 30,
    magicResistance: 5,
    health: 150,
    mana: 0,
    magic: 0,
    agility: 30,
    exp: 150,
    gold: 120,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["health"]
    }
  },
  LittleDragon: {
    name: "LittleDragon",
    title: "Little Dragon",
    speed: 6,
    weapon: 26,
    armor: 26,
    magicResistance: 10,
    health: 100,
    mana: 500,
    magic: 30,
    agility: 30,
    exp: 200,
    gold: 150,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["magic"]
    }
  },
  PurplePoisoner: {
    name: "PurpleSnake",
    title: "Purple Poisoner",
    speed: 1,
    weapon: 30,
    armor: 27,
    magicResistance: 12,
    health: 120,
    mana: 0,
    magic: 0,
    agility: 28,
    exp: 125,
    gold: 100,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 6
    }
  },
  WhiteWolf: {
    name: "WhiteWolf",
    title: "White Wolf",
    speed: 1,
    weapon: 32,
    armor: 27,
    magicResistance: 13,
    health: 125,
    mana: 0,
    magic: 0,
    agility: 27,
    exp: 125,
    gold: 100,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 7
    }
  },
  BlackWolf: {
    name: "BlackWolf",
    title: "Black Wolf",
    speed: 1,
    weapon: 34,
    armor: 30,
    magicResistance: 15,
    health: 130,
    mana: 0,
    magic: 0,
    agility: 28,
    exp: 150,
    gold: 120,
    strategy: "wander",
    triggers: {
      hunt: 5,
      wander: 7
    }
  },
  UglyGhost: {
    name: "UglyGhost",
    title: "Ugly Ghost",
    speed: 4,
    weapon: 33,
    armor: 30,
    magicResistance: 20,
    health: 180,
    mana: 250,
    magic: 30,
    agility: 30,
    exp: 175,
    gold: 150,
    strategy: "wander",
    triggers: {
      hunt: 7,
      wander: 8
    },
    inventory: {
      type: "boost",
      value: ["magic"]
    }
  },
  BabyDragon: {
    name: "LittleDragon",
    title: "Baby Dragon",
    speed: 4,
    weapon: 19,
    armor: 17,
    magicResistance: 12,
    health: 90,
    mana: 300,
    magic: 25,
    agility: 28,
    exp: 150,
    gold: 100,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["magic"]
    }
  },
  SkeletonOfficer2: {
    name: "SkeletonBoss",
    title: "Skeleton Officer",
    speed: 2,
    weapon: 22,
    armor: 22,
    magicResistance: 0,
    health: 100,
    mana: 0,
    magic: 0,
    agility: 20,
    exp: 150,
    gold: 100,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    }
  },
  LittleSkelly: {
    name: "LittleSkelly",
    title: "Little Skelly",
    speed: 3,
    weapon: 30,
    armor: 30,
    magicResistance: 0,
    health: 130,
    mana: 0,
    magic: 0,
    agility: 25,
    exp: 125,
    gold: 100,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    }
  },
  BlueDevil: {
    name: "BlueDevil",
    title: "Blue Devil",
    speed: 2,
    weapon: 42,
    armor: 36,
    magicResistance: 25,
    health: 300,
    mana: 300,
    magic: 30,
    agility: 30,
    exp: 500,
    gold: 500,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 999,
      wander: 999
    },
    inventory: {
      type: "boost",
      value: ["health", "health", "weapon", "armor"]
    }
  },
  BlueDevil2: {
    name: "BlueDevil",
    title: "Blue Devil",
    speed: 2,
    weapon: 43,
    armor: 38,
    magicResistance: 25,
    health: 300,
    mana: 300,
    magic: 30,
    agility: 30,
    exp: 200,
    gold: 200,
    strategy: "hunt",
    triggers: {
      hunt: 6,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["health", "health", "magic"]
    }
  },
  Skeletona: {
    name: "Skeletona",
    title: "Skeletona",
    speed: 3,
    weapon: 36,
    armor: 34,
    magicResistance: 15,
    health: 200,
    mana: 0,
    magic: 0,
    agility: 28,
    exp: 160,
    gold: 130,
    strategy: "wander",
    triggers: {
      hunt: 7,
      wander: 8
    }
  },
  MatureSkeletona: {
    name: "Skeletona",
    title: "Mature Skeletona",
    speed: 4,
    weapon: 38,
    armor: 36,
    magicResistance: 15,
    health: 200,
    mana: 0,
    magic: 0,
    agility: 28,
    exp: 160,
    gold: 130,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    }
  },
  MatureSkeletona2: {
    name: "Skeletona",
    title: "Mature Skeletona",
    speed: 4,
    weapon: 38,
    armor: 36,
    magicResistance: 15,
    health: 200,
    mana: 0,
    magic: 0,
    agility: 28,
    exp: 160,
    gold: 130,
    strategy: "goto",
    triggers: {
      hunt: 1,
      wander: 999
    }
  },
  RedDevil: {
    name: "Devil",
    title: "Red Devil",
    speed: 3,
    weapon: 46,
    armor: 41,
    magicResistance: 30,
    health: 350,
    mana: 300,
    magic: 30,
    agility: 32,
    exp: 500,
    gold: 500,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 999,
      wander: 999
    },
    inventory: {
      type: "boost",
      value: ["health", "health", "weapon", "armor"]
    }
  },
  RedDevil2: {
    name: "Devil",
    title: "Red Devil",
    speed: 3,
    weapon: 46,
    armor: 41,
    magicResistance: 30,
    health: 350,
    mana: 300,
    magic: 30,
    agility: 32,
    exp: 200,
    gold: 200,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 7,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["health", "health", "magic"]
    }
  },
  Badger: {
    name: "Badger",
    title: "Badger",
    speed: 4,
    weapon: 46,
    armor: 31,
    magicResistance: 15,
    health: 200,
    mana: 0,
    magic: 0,
    agility: 30,
    exp: 175,
    gold: 125,
    strategy: "wander",
    triggers: {
      hunt: 2,
      wander: 8
    }
  },
  AngryBadger: {
    name: "Badger",
    title: "Angry Badger",
    speed: 6,
    weapon: 50,
    armor: 34,
    magicResistance: 15,
    health: 220,
    mana: 0,
    magic: 0,
    agility: 31,
    exp: 200,
    gold: 150,
    strategy: "wander",
    triggers: {
      hunt: 5,
      wander: 8
    }
  },
  GreenSkeleton: {
    name: "GreenSkelly",
    title: "Green Skelly",
    speed: 2,
    weapon: 42,
    armor: 40,
    magicResistance: 20,
    health: 210,
    mana: 0,
    magic: 0,
    agility: 33,
    exp: 180,
    gold: 130,
    strategy: "wander",
    triggers: {
      hunt: 5,
      wander: 8
    }
  },
  GreenZombie: {
    name: "GreenZombie",
    title: "Green Zombie",
    speed: 3,
    weapon: 44,
    armor: 42,
    magicResistance: 20,
    health: 225,
    mana: 0,
    magic: 0,
    agility: 35,
    exp: 200,
    gold: 150,
    strategy: "wander",
    triggers: {
      hunt: 5,
      wander: 8
    }
  },
  GreenZombie2: {
    name: "GreenZombie",
    title: "Green Zombie",
    speed: 3,
    weapon: 44,
    armor: 42,
    magicResistance: 20,
    health: 225,
    mana: 0,
    magic: 0,
    agility: 35,
    exp: 200,
    gold: 150,
    strategy: "goto",
    triggers: {
      hunt: 1,
      wander: 999
    }
  },
  GreenPuffer: {
    name: "GreenPuffer",
    title: "Green Puffer",
    speed: 3,
    weapon: 41,
    armor: 38,
    magicResistance: 35,
    health: 250,
    mana: 500,
    magic: 40,
    agility: 35,
    exp: 250,
    gold: 200,
    strategy: "hunt",
    triggers: {
      hunt: 7,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["health", "magic", "magic"]
    }
  },
  Flamy: {
    name: "Flamy",
    title: "Flamy",
    speed: 3,
    weapon: 60,
    armor: 50,
    magicResistance: 35,
    health: 500,
    mana: 600,
    magic: 50,
    agility: 35,
    exp: 1000,
    gold: 1000,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 999,
      wander: 999
    },
    inventory: {
      type: "boost",
      value: ["health", "health", "weapon", "armor"]
    }
  },
  Fox: {
    name: "Fox",
    title: "Fox",
    speed: 3,
    weapon: 50,
    armor: 33,
    magicResistance: 15,
    health: 225,
    mana: 0,
    magic: 0,
    agility: 35,
    exp: 200,
    gold: 175,
    strategy: "wander",
    triggers: {
      hunt: 2,
      wander: 8
    }
  },
  KeyCarry9: {
    name: "Flamy",
    title: "Flamy",
    speed: 1,
    weapon: 60,
    armor: 50,
    magicResistance: 35,
    health: 500,
    mana: 600,
    magic: 50,
    agility: 35,
    exp: 1000,
    gold: 1000,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 7,
      wander: 999
    },
    inventory: {
      type: "key",
      value: "goldKey"
    }
  },
  Ghoul: {
    name: "Ghoul",
    title: "Ghoul",
    speed: 1,
    weapon: 53,
    armor: 50,
    magicResistance: 10,
    health: 200,
    mana: 250,
    magic: 35,
    agility: 35,
    exp: 180,
    gold: 130,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 6
    }
  },
  Bat: {
    name: "Bat",
    title: "Bat",
    speed: 6,
    weapon: 50,
    armor: 40,
    magicResistance: 0,
    health: 250,
    mana: 0,
    magic: 0,
    agility: 40,
    exp: 250,
    gold: 250,
    strategy: "wander",
    triggers: {
      hunt: 7,
      wander: 8
    },
    inventory: {
      type: "boost",
      value: ["agility"]
    }
  },
  Lizzy: {
    name: "Lizzy",
    title: "Lizzy",
    speed: 1,
    weapon: 49,
    armor: 48,
    magicResistance: 10,
    health: 210,
    mana: 0,
    magic: 0,
    agility: 36,
    exp: 220,
    gold: 150,
    strategy: "wander",
    triggers: {
      hunt: 2,
      wander: 4
    }
  },
  Ogre: {
    name: "Ogre",
    title: "Ogre",
    speed: 2,
    weapon: 53,
    armor: 50,
    magicResistance: 20,
    health: 250,
    mana: 0,
    magic: 0,
    agility: 37,
    exp: 220,
    gold: 150,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["health"]
    }
  },
  Ogre2: {
    name: "Ogre",
    title: "Ogre",
    speed: 2,
    weapon: 53,
    armor: 50,
    magicResistance: 20,
    health: 250,
    mana: 0,
    magic: 0,
    agility: 37,
    exp: 220,
    gold: 150,
    strategy: "goto",
    triggers: {
      hunt: 1,
      wander: 999
    },
    inventory: {
      type: "potion",
      value: ["health"]
    }
  },
  ColoredEvil: {
    name: "ColoredEvil",
    title: "Colored Evil",
    speed: 2,
    weapon: 53,
    armor: 50,
    magicResistance: 35,
    health: 260,
    mana: 400,
    magic: 42,
    agility: 35,
    exp: 250,
    gold: 250,
    strategy: "hunt",
    triggers: {
      hunt: 5,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["health"]
    }
  },
  SkeleGoat: {
    name: "SkeleGoat",
    title: "SkeleGoat",
    speed: 3,
    weapon: 60,
    armor: 55,
    magicResistance: 40,
    health: 300,
    mana: 0,
    magic: 0,
    agility: 42,
    exp: 250,
    gold: 150,
    luck: 10,
    immunity: true,
    strategy: "wander",
    triggers: {
      hunt: 7,
      wander: 8
    },
    inventory: {
      type: "boost",
      value: ["health"]
    }
  },
  IceBeast: {
    name: "IceBeast",
    title: "Ice Beast",
    speed: 3,
    weapon: 70,
    armor: 70,
    magicResistance: 45,
    health: 500,
    mana: 750,
    magic: 60,
    agility: 43,
    exp: 1000,
    gold: 1000,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 999,
      wander: 999
    },
    inventory: {
      type: "boost",
      value: ["health", "health", "weapon", "armor"]
    }
  },
  TEST: {
    name: "Ogre",
    title: "TEST",
    speed: 1,
    weapon: 44,
    armor: 49,
    magicResistance: 20,
    health: 250,
    mana: 0,
    magic: 0,
    agility: 35,
    exp: 220,
    gold: 150,
    strategy: "wander",
    triggers: {
      hunt: 4,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["health"]
    }
  },
  Blacky: {
    name: "Blacky",
    title: "Blacky",
    speed: 2,
    weapon: 60,
    armor: 55,
    magicResistance: 32,
    health: 300,
    mana: 0,
    magic: 0,
    agility: 43,
    exp: 250,
    gold: 150,
    luck: 15,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 7
    },
    inventory: {
      type: "boost",
      value: ["agility"]
    }
  },
  Whitey: {
    name: "Whitey",
    title: "Whitey",
    speed: 2,
    weapon: 59,
    armor: 58,
    magicResistance: 30,
    health: 300,
    mana: 0,
    magic: 0,
    agility: 42,
    exp: 250,
    gold: 150,
    luck: 15,
    strategy: "wander",
    triggers: {
      hunt: 3,
      wander: 7
    },
    inventory: {
      type: "potion",
      value: ["health"]
    }
  },
  RedDragon: {
    name: "RedDragon",
    title: "Red Dragon",
    speed: 1,
    weapon: 66,
    armor: 66,
    magicResistance: 50,
    health: 500,
    mana: 1000,
    magic: 65,
    agility: 50,
    exp: 2000,
    gold: 1000,
    immunity: true,
    strategy: "hunt",
    triggers: {
      hunt: 5,
      wander: 999
    },
    inventory: {
      type: "key",
      value: "silverKey"
    }
  },
  BrownDragon: {
    name: "BrownDragon",
    title: "Brown Dragon",
    speed: 2,
    weapon: 64,
    armor: 60,
    magicResistance: 40,
    health: 300,
    mana: 750,
    magic: 50,
    agility: 45,
    exp: 500,
    gold: 200,
    strategy: "hunt",
    luck: 0,
    triggers: {
      hunt: 7,
      wander: 8
    },
    inventory: {
      type: "boost",
      value: ["health", "mana", "magic", "armor", "weapon", "health"]
    }
  },
  HellRat: {
    name: "HellRat",
    title: "Hell Rat",
    speed: 2,
    weapon: 100,
    armor: 100,
    magicResistance: 100,
    health: 1000,
    mana: 1000,
    magic: 100,
    agility: 60,
    exp: 5000,
    gold: 1000,
    strategy: "hunt",
    luck: 25,
    immunity: true,
    triggers: {
      hunt: 999,
      wander: 999
    },
    inventory: {
      type: "key",
      value: "goldKey"
    }
  },
  WeakGreenSpider: {
    name: "GreenSpider",
    title: "Weak Green Spider",
    speed: 2,
    weapon: 10,
    armor: 4,
    magicResistance: 0,
    health: 30,
    mana: 0,
    magic: 0,
    agility: 5,
    exp: 25,
    gold: 30,
    luck: 10,
    strategy: "wander",
    triggers: {
      hunt: 2,
      wander: 5
    }
  },
  YoungJadeBat: {
    name: "JadeBat",
    title: "Young Jade Bat",
    speed: 4,
    weapon: 35,
    armor: 35,
    magicResistance: 16,
    health: 110,
    mana: 500,
    magic: 30,
    agility: 30,
    exp: 200,
    gold: 150,
    luck: 10,
    strategy: "wander",
    triggers: {
      hunt: 6,
      wander: 8
    },
    inventory: {
      type: "potion",
      value: ["magic"]
    }
  },
  JadeBat: {
    name: "JadeBat",
    title: "Jade Bat",
    speed: 4,
    weapon: 55,
    armor: 50,
    magicResistance: 20,
    health: 300,
    mana: 500,
    magic: 35,
    agility: 30,
    exp: 300,
    gold: 300,
    luck: 15,
    strategy: "wander",
    triggers: {
      hunt: 6,
      wander: 11
    },
    inventory: {
      type: "boost",
      value: ["magic"]
    }
  }
};
var MONSTER_LAYOUT = {
  1: {
    common: [
      MONSTER.TinySnake,
      MONSTER.LittleSnake,
      MONSTER.LittleSnake,
      MONSTER.LittleSnake,
      MONSTER.GreenSnake,
      MONSTER.GreenSnake,
      MONSTER.BrittleSkeleton,
      MONSTER.NastyGreenSnake
    ],
    start: [MONSTER.BabySnake],
    end: [
      MONSTER.BlackSnake,
      MONSTER.BlackSnake,
      MONSTER.Skeleton,
      MONSTER.NastyGreenSnake
    ],
    boss: [MONSTER.Ghosty],
    key: [
      MONSTER.Ghosty,
      MONSTER.Skeleton,
      MONSTER.GreenSnake,
      MONSTER.NastyGreenSnake,
      MONSTER.BlackSnake
    ],
    temple: [MONSTER.LittleSnake, MONSTER.TinySnake],
    corridor: [
      MONSTER.TinySnake,
      MONSTER.TinySnake,
      MONSTER.LittleSnake,
      MONSTER.LittleSnake,
      MONSTER.LittleSnake,
      MONSTER.GreenSnake,
      MONSTER.GreenSnake,
      MONSTER.GreenSnake,
      MONSTER.BrittleSkeleton,
      MONSTER.BrittleSkeleton,
      MONSTER.NastyGreenSnake
    ],
    nemesis: [MONSTER.ApprenticeWizard]
  },
  2: {
    common: [
      MONSTER.NastyGreenSnake,
      MONSTER.NastyGreenSnake,
      MONSTER.Skeleton,
      MONSTER.Skeleton,
      MONSTER.Skeleton,
      MONSTER.GreenMeanie,
      MONSTER.GreenMeanie,
      MONSTER.BlackSnake2,
      MONSTER.BlackSnake2,
      MONSTER.BlackSnake2,
      MONSTER.WeakPuffy,
      MONSTER.WeakPuffy,
      MONSTER.Puffy,
      MONSTER.Wizard,
      MONSTER.EnragedGhost,
      MONSTER.HardenedSkeleton,
      MONSTER.HardenedSkeleton,
      MONSTER.WeakGreenSpider
    ],
    start: [MONSTER.BrittleSkeleton],
    end: [
      MONSTER.Puffy,
      MONSTER.Wizard,
      MONSTER.EnragedGhost,
      MONSTER.BlackSnake3,
      MONSTER.BlackSnake3
    ],
    boss: [MONSTER.Death],
    key: [
      MONSTER.GreenMeanie,
      MONSTER.BlackSnake2,
      MONSTER.Puffy,
      MONSTER.Wizard,
      MONSTER.EnragedGhost,
      MONSTER.BlackSnake3,
      MONSTER.BlackSnake3,
      MONSTER.BlackSnake3,
      MONSTER.WeakGreenSpider
    ],
    temple: [MONSTER.BlackSnake2, MONSTER.WeakPuffy],
    corridor: [
      MONSTER.BrittleSkeleton,
      MONSTER.NastyGreenSnake,
      MONSTER.NastyGreenSnake,
      MONSTER.Skeleton,
      MONSTER.Skeleton,
      MONSTER.GreenMeanie,
      MONSTER.GreenMeanie,
      MONSTER.BlackSnake2,
      MONSTER.BlackSnake2,
      MONSTER.WeakPuffy,
      MONSTER.HardenedSkeleton,
      MONSTER.WeakGreenSpider
    ],
    nemesis: [MONSTER.Croc]
  },
  3: {
    common: [
      MONSTER.BlackSnake4,
      MONSTER.Puffy,
      MONSTER.Wizard,
      MONSTER.MasterWizard,
      MONSTER.EnragedGhost,
      MONSTER.HardenedSkeleton,
      MONSTER.SickZombieGirl,
      MONSTER.ZombieGirl,
      MONSTER.ZombieGirl,
      MONSTER.AngryCroc,
      MONSTER.YoungHaunter,
      MONSTER.Death2
    ],
    start: [MONSTER.BabySnake],
    end: [
      MONSTER.MasterWizard,
      MONSTER.AngryCroc,
      MONSTER.YoungHaunter,
      MONSTER.YoungHaunter,
      MONSTER.Death2,
      MONSTER.Death2
    ],
    boss: [MONSTER.Reaper],
    key: [
      MONSTER.MasterWizard,
      MONSTER.AngryCroc,
      MONSTER.YoungHaunter,
      MONSTER.Death2
    ],
    temple: [MONSTER.EnragedGhost, MONSTER.Puffy],
    corridor: [
      MONSTER.GreenMeanie,
      MONSTER.BlackSnake4,
      MONSTER.Puffy,
      MONSTER.Wizard,
      MONSTER.EnragedGhost,
      MONSTER.HardenedSkeleton,
      MONSTER.BlackSnake2,
      MONSTER.WeakPuffy,
      MONSTER.SickZombieGirl,
      MONSTER.YoungHaunter
    ],
    nemesis: [MONSTER.ScaryGhost]
  },
  4: {
    common: [
      MONSTER.YoungHaunter,
      MONSTER.Death2,
      MONSTER.OldSorceress,
      MONSTER.Scorpion,
      MONSTER.LazySpider,
      MONSTER.OldSorceress,
      MONSTER.Scorpion,
      MONSTER.LazySpider,
      MONSTER.LazySpider,
      MONSTER.Spider,
      MONSTER.Spider,
      MONSTER.Haunter,
      MONSTER.ZombieLady,
      MONSTER.Sorceress,
      MONSTER.GreenSpider
    ],
    start: [MONSTER.ZombieGirl],
    end: [
      MONSTER.Spider,
      MONSTER.GreenSpider,
      MONSTER.Haunter,
      MONSTER.Sorceress,
      MONSTER.Reaper,
      MONSTER.ScaryGhost
    ],
    boss: [MONSTER.Reaper2],
    key: [
      MONSTER.Spider,
      MONSTER.Haunter,
      MONSTER.Sorceress,
      MONSTER.GreenSpider
    ],
    temple: [MONSTER.LazySpider],
    corridor: [
      MONSTER.OldSorceress,
      MONSTER.YoungHaunter,
      MONSTER.AngryCroc,
      MONSTER.Scorpion,
      MONSTER.LazySpider,
      MONSTER.LazySpider,
      MONSTER.LazySpider
    ],
    nemesis: [MONSTER.Bony]
  },
  5: {
    common: [
      MONSTER.Death2,
      MONSTER.Spider,
      MONSTER.Haunter,
      MONSTER.Sorceress,
      MONSTER.SkeletonWarrior,
      MONSTER.SkeletonWarrior,
      MONSTER.SkeletonOfficer,
      MONSTER.VeryScaryGhost,
      MONSTER.Bony
    ],
    start: [MONSTER.LazySpider],
    end: [
      MONSTER.Haunter,
      MONSTER.Reaper,
      MONSTER.SkeletonWarrior,
      MONSTER.SkeletonOfficer,
      MONSTER.SkeletonOfficer,
      MONSTER.BonyGuard,
      MONSTER.VeryScaryGhost
    ],
    boss: [MONSTER.BigHead],
    key: [
      MONSTER.Haunter,
      MONSTER.SkeletonWarrior,
      MONSTER.BonyGuard,
      MONSTER.SkeletonOfficer,
      MONSTER.BonyGuard,
      MONSTER.BonyGuard,
      MONSTER.VeryScaryGhost
    ],
    temple: [MONSTER.Spider, MONSTER.Scorpion],
    corridor: [
      MONSTER.OldSorceress,
      MONSTER.YoungHaunter,
      MONSTER.Scorpion,
      MONSTER.Death2,
      MONSTER.Spider,
      MONSTER.Haunter
    ],
    nemesis: [MONSTER.BigHead]
  },
  6: {
    common: [
      MONSTER.SkeletonOfficer,
      MONSTER.SkeletonOfficer2,
      MONSTER.SkeletonGeneral,
      MONSTER.LittleDragon,
      MONSTER.PurplePoisoner,
      MONSTER.WhiteWolf,
      MONSTER.WhiteWolf,
      MONSTER.BlackWolf,
      MONSTER.UglyGhost
    ],
    start: [MONSTER.Spider],
    end: [
      MONSTER.LittleDragon,
      MONSTER.SkeletonGeneral,
      MONSTER.BlackWolf,
      MONSTER.UglyGhost,
      MONSTER.Skeletona
    ],
    boss: [MONSTER.BlueDevil],
    key: [
      MONSTER.SkeletonGeneral,
      MONSTER.BonyGuard,
      MONSTER.BlackWolf,
      MONSTER.UglyGhost,
      MONSTER.VeryScaryGhost,
      MONSTER.Skeletona
    ],
    temple: [MONSTER.PurplePoisoner],
    corridor: [
      MONSTER.SkeletonOfficer,
      MONSTER.SkeletonOfficer2,
      MONSTER.PurplePoisoner,
      MONSTER.WhiteWolf,
      MONSTER.BabyDragon,
      MONSTER.LittleSkelly
    ],
    nemesis: [MONSTER.BlueDevil]
  },
  7: {
    common: [
      MONSTER.LittleDragon,
      MONSTER.UglyGhost,
      MONSTER.Skeletona,
      MONSTER.MatureSkeletona,
      MONSTER.BlueDevil,
      MONSTER.YoungJadeBat
    ],
    start: [MONSTER.Spider],
    end: [
      MONSTER.MatureSkeletona,
      MONSTER.MatureSkeletona2,
      MONSTER.YoungJadeBat
    ],
    boss: [MONSTER.RedDevil],
    key: [
      MONSTER.MatureSkeletona,
      MONSTER.MatureSkeletona2,
      MONSTER.YoungJadeBat
    ],
    temple: [MONSTER.PurplePoisoner],
    corridor: [MONSTER.Skeletona, MONSTER.LittleDragon],
    nemesis: [MONSTER.RedDevil]
  },
  8: {
    common: [
      MONSTER.BlueDevil2,
      MONSTER.MatureSkeletona,
      MONSTER.Badger,
      MONSTER.AngryBadger,
      MONSTER.RedDevil2,
      MONSTER.BlueDevil2,
      MONSTER.GreenSkeleton,
      MONSTER.GreenZombie,
      MONSTER.GreenPuffer,
      MONSTER.YoungJadeBat
    ],
    start: [MONSTER.Skeletona],
    end: [
      MONSTER.BlueDevil2,
      MONSTER.RedDevil2,
      MONSTER.GreenZombie,
      MONSTER.GreenZombie2,
      MONSTER.GreenPuffer
    ],
    boss: [MONSTER.Flamy],
    key: [
      MONSTER.BlueDevil,
      MONSTER.RedDevil,
      MONSTER.GreenZombie,
      MONSTER.GreenZombie2,
      MONSTER.GreenPuffer
    ],
    temple: [MONSTER.PurplePoisoner],
    corridor: [
      MONSTER.Skeletona,
      MONSTER.MatureSkeletona,
      MONSTER.LittleDragon,
      MONSTER.Badger,
      MONSTER.BlueDevil2,
      MONSTER.GreenSkeleton,
      MONSTER.BlackWolf,
      MONSTER.YoungJadeBat,
      MONSTER.YoungJadeBat
    ],
    nemesis: [MONSTER.Flamy]
  },
  9: {
    common: [MONSTER.Fox, MONSTER.AngryBadger],
    end: [MONSTER.Fox],
    boss: [MONSTER.Flamy],
    nemesis: [MONSTER.Flamy],
    corridor: [MONSTER.Fox, MONSTER.AngryBadger],
    keyholder: [MONSTER.KeyCarry9],
    openSpace: [MONSTER.RedDevil2, MONSTER.GreenPuffer]
  },
  10: {
    common: [
      MONSTER.Fox,
      MONSTER.AngryBadger,
      MONSTER.GreenPuffer,
      MONSTER.Ghoul,
      MONSTER.Bat,
      MONSTER.Lizzy,
      MONSTER.Ogre,
      MONSTER.ColoredEvil,
      MONSTER.Ghoul,
      MONSTER.Bat,
      MONSTER.Lizzy,
      MONSTER.JadeBat
    ],
    start: [MONSTER.GreenSkeleton],
    end: [
      MONSTER.Ghoul,
      MONSTER.JadeBat,
      MONSTER.Ogre,
      MONSTER.Ogre2,
      MONSTER.ColoredEvil,
      MONSTER.SkeleGoat
    ],
    boss: [MONSTER.IceBeast],
    key: [
      MONSTER.Ghoul,
      MONSTER.Bat,
      MONSTER.Ogre,
      MONSTER.Ogre2,
      MONSTER.ColoredEvil,
      MONSTER.SkeleGoat,
      MONSTER.JadeBat
    ],
    temple: [MONSTER.GreenPuffer],
    corridor: [
      MONSTER.Fox,
      MONSTER.AngryBadger,
      MONSTER.GreenPuffer,
      MONSTER.RedDevil2,
      MONSTER.Lizzy
    ],
    nemesis: [MONSTER.IceBeast]
  },
  11: {
    common: [
      MONSTER.Blacky,
      MONSTER.SkeleGoat,
      MONSTER.BrownDragon,
      MONSTER.Whitey,
      MONSTER.JadeBat
    ],
    end: [
      MONSTER.Blacky,
      MONSTER.SkeleGoat,
      MONSTER.BrownDragon,
      MONSTER.Whitey
    ],
    boss: [MONSTER.HellRat],
    nemesis: [MONSTER.HellRat],
    corridor: [
      MONSTER.Blacky,
      MONSTER.SkeleGoat,
      MONSTER.Flamy,
      MONSTER.BrownDragon,
      MONSTER.JadeBat,
      MONSTER.Whitey
    ],
    keyholder: [MONSTER.RedDragon],
    openSpace: [
      MONSTER.Whitey,
      MONSTER.Flamy,
      MONSTER.BrownDragon,
      MONSTER.Blacky
    ]
  }
};

console.log("%cMAP for Deep Down Into Darkness loaded.", "color: #888");
