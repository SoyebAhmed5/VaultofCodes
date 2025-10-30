const OBJECT_TYPE = {
  BLANK: "blank",
  WALL: "wall",
  DOT: "dot",
  BLINKY: "blinky",
  PINKY: "pinky",
  INKY: "inky",
  CLYDE: "clyde",
  PILL: "pill",
  PACMAN: "pacman",
  GHOST: "ghost",
  SCARED: "scared",
  GHOSTLAIR: "lair",
};
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const DIRECTIONS = {
  ArrowLeft: {
    code: 37,
    movement: -1,
    rotation: 180,
  },
  ArrowUp: {
    code: 38,
    movement: -GRID_SIZE,
    rotation: 270,
  },
  ArrowRight: {
    code: 39,
    movement: 1,
    rotation: 0,
  },
  ArrowDown: {
    code: 40,
    movement: GRID_SIZE,
    rotation: 90,
  },
};
const CLASS_LIST = [
  OBJECT_TYPE.BLANK,
  OBJECT_TYPE.WALL,
  OBJECT_TYPE.DOT,
  OBJECT_TYPE.BLINKY,
  OBJECT_TYPE.PINKY,
  OBJECT_TYPE.INKY,
  OBJECT_TYPE.CLYDE,
  OBJECT_TYPE.PILL,
  OBJECT_TYPE.PACMAN,
  OBJECT_TYPE.GHOSTLAIR,
];
const LEVEL = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2,
  2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2,
  1, 1, 1, 2, 1, 1, 2, 1, 1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1,
  7, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1,
  2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1,
  1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2,
  1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0,
  0, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 2, 1,
  9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 1, 9, 9, 9, 9, 1, 2,
  2, 2, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1,
  0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1,
  2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2,
  1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2,
  2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 7, 1, 1, 2, 1, 1, 1, 2, 1,
  1, 2, 1, 1, 1, 2, 1, 1, 7, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2,
  1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
function randomMovement(position, direction, objectExist) {
  let dir = direction;
  let nextMovePos = position + dir.movement;
  // Create an array from the diretions objects keys
  const keys = Object.keys(DIRECTIONS);

  while (
    objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
    objectExist(nextMovePos, OBJECT_TYPE.GHOST)
  ) {
    // Get a random key from that array
    const key = keys[Math.floor(Math.random() * keys.length)];
    // Set the new direction
    dir = DIRECTIONS[key];
    // Set the next move
    nextMovePos = position + dir.movement;
  }

  return { nextMovePos, direction: dir };
}
// Classes
class GameBoard {
  constructor(DOMGrid) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid = DOMGrid;
  }

  showGameStatus(gameWin) {
    // Create and show game win or game over
    const div = document.createElement("div");
    div.classList.add("game-status");
    div.innerHTML = `${gameWin ? "WIN!" : "GAME OVER!"}`;
    this.DOMGrid.appendChild(div);
  }

  createGrid(level) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid.innerHTML = "";
    // First set correct amount of columns based on Grid Size and Cell Size
    this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`;

    level.forEach((square) => {
      const div = document.createElement("div");
      div.classList.add("square", CLASS_LIST[square]);
      div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
      this.DOMGrid.appendChild(div);
      this.grid.push(div);

      // Add dots
      if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;
    });
  }

  addObject(pos, classes) {
    this.grid[pos].classList.add(...classes);
  }

  removeObject(pos, classes) {
    this.grid[pos].classList.remove(...classes);
  }
  // Can have an arrow function here cause of this binding
  objectExist(pos, object) {
    return this.grid[pos].classList.contains(object);
  }

  rotateDiv(pos, deg) {
    this.grid[pos].style.transform = `rotate(${deg}deg)`;
  }

  moveCharacter(character) {
    if (character.shouldMove()) {
      const { nextMovePos, direction } = character.getNextMove(
        this.objectExist.bind(this)
      );
      const { classesToRemove, classesToAdd } = character.makeMove();

      if (character.rotation && nextMovePos !== character.pos) {
        // Rotate
        this.rotateDiv(nextMovePos, character.dir.rotation);
        // Rotate the previous div back
        this.rotateDiv(character.pos, 0);
      }

      this.removeObject(character.pos, classesToRemove);
      this.addObject(nextMovePos, classesToAdd);

      character.setNewPos(nextMovePos, direction);
    }
  }

  static createGameBoard(DOMGrid, level) {
    const board = new this(DOMGrid);
    board.createGrid(level);
    return board;
  }
}
class Pacman {
  constructor(speed, startPos) {
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
  }

  shouldMove() {
    // Don't move before a key is pressed
    if (!this.dir) return;

    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
  }

  getNextMove(objectExist) {
    let nextMovePos = this.pos + this.dir.movement;
    // Do we collide with a wall?
    if (
      objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
      objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
    ) {
      nextMovePos = this.pos;
    }

    return { nextMovePos, direction: this.dir };
  }

  makeMove() {
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classesToAdd = [OBJECT_TYPE.PACMAN];

    return { classesToRemove, classesToAdd };
  }

  setNewPos(nextMovePos) {
    this.pos = nextMovePos;
  }

  handleKeyInput = (e, objectExist) => {
    let dir;

    if (e.keyCode >= 37 && e.keyCode <= 40) {
      dir = DIRECTIONS[e.key];
    } else {
      return;
    }

    const nextMovePos = this.pos + dir.movement;
    if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;
    this.dir = dir;
  };
}
class Ghost {
  constructor(speed = 5, startPos, movement, name) {
    this.name = name;
    this.movement = movement;
    this.startPos = startPos;
    this.pos = startPos;
    this.dir = DIRECTIONS.ArrowRight;
    this.speed = speed;
    this.timer = 0;
    this.isScared = false;
    this.rotation = false;
  }

  shouldMove() {
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
  }

  getNextMove(objectExist) {
    // Call move algoritm here
    const { nextMovePos, direction } = this.movement(
      this.pos,
      this.dir,
      objectExist
    );
    return { nextMovePos, direction };
  }

  makeMove() {
    const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name];
    let classesToAdd = [OBJECT_TYPE.GHOST, this.name];

    if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.SCARED];

    return { classesToRemove, classesToAdd };
  }

  setNewPos(nextMovePos, direction) {
    this.pos = nextMovePos;
    this.dir = direction;
  }
}
// Sounds

// Dom Elements
const gameGrid = document.querySelector("#game");
const scoreTable = document.querySelector("#score");
const startButton = document.querySelector("#start-button");
// Game constants
const POWER_PILL_TIME = 10000; // ms
const GLOBAL_SPEED = 80; // ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);
// Initial setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

// --- AUDIO --- //
function playAudio(audio) {
  const soundEffect = new Audio(audio);
  soundEffect.play();
}

// --- GAME CONTROLLER --- //
function gameOver(pacman, grid) {
  playAudio("./sounds/death.wav");

  document.removeEventListener("keydown", (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  gameBoard.showGameStatus(gameWin);

  clearInterval(timer);
  // Show startbutton
  startButton.classList.remove("hide");
}

function checkCollision(pacman, ghosts) {
  const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

  if (collidedGhost) {
    if (pacman.powerPill) {
      playAudio("./sounds/eat_ghost.wav");
      gameBoard.removeObject(collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name,
      ]);
      collidedGhost.pos = collidedGhost.startPos;
      score += 100;
    } else {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.pos, 0);
      gameOver(pacman, gameGrid);
    }
  }
}

function gameLoop(pacman, ghosts) {
  // 1. Move Pacman
  gameBoard.moveCharacter(pacman);
  // 2. Check Ghost collision on the old positions
  checkCollision(pacman, ghosts);
  // 3. Move ghosts
  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  // 4. Do a new ghost collision check on the new positions
  checkCollision(pacman, ghosts);
  // 5. Check if Pacman eats a dot
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
    playAudio("./sounds/munch.wav");

    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
    // Remove a dot
    gameBoard.dotCount--;
    // Add Score
    score += 10;
  }
  // 6. Check if Pacman eats a power pill
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
    playAudio("./sounds/pill.wav");

    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

    pacman.powerPill = true;
    score += 50;

    clearTimeout(powerPillTimer);
    powerPillTimer = setTimeout(
      () => (pacman.powerPill = false),
      POWER_PILL_TIME
    );
  }
  // 7. Change ghost scare mode depending on powerpill
  if (pacman.powerPill !== powerPillActive) {
    powerPillActive = pacman.powerPill;
    ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
  }
  // 8. Check if all dots have been eaten
  if (gameBoard.dotCount === 0) {
    gameWin = true;
    gameOver(pacman, gameGrid);
  }
  // 9. Show new score
  scoreTable.innerHTML = score;
}

function startGame() {
  playAudio("./sounds/game_start.wav");
  gameWin = false;
  powerPillActive = false;
  score = 0;

  startButton.classList.add("hide");

  gameBoard.createGrid(LEVEL);

  const pacman = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
  document.addEventListener("keydown", (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  const ghosts = [
    new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
    new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE),
  ];

  // Gameloop
  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

// Initialize game
startButton.addEventListener("click", startGame);
