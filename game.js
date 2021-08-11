export class Game {

  static GAME_WIDTH = 40;  
  static GAME_HEIGHT = 30;
  static ZOOM = 20;
  static SPEED_MS = 200;
  static FPS = 60;

  static DIRECTION_UP = 0;
  static DIRECTION_DOWN = 1;
  static DIRECTION_LEFT = 2;
  static DIRECTION_RIGHT = 3;

  constructor() {
    this.snake = [];
    this.seed = null;
    this.lastMoveMs = 0;
    this.direction = this.DIRECTION_RIGHT;

    this.setSnakePosition();
    this.setSeedPosition();
  }


  setSnakePosition() {
    this.snake.push([5, 5]);
  }

  setSeedPosition() {
    let position = [
      Math.random() * this.GAME_WIDTH,
      Math.random() * this.GAME_HEIGHT
    ];

    do {
      isColliding = false;
      this.snake.foreach(function(index, item, array) {
        if (item == position) {
          isColliding = true
        }
      });
      if (isColliding) {
        position = [
          Math.random() * this.GAME_WIDTH,
          Math.random() * this.GAME_HEIGHT
        ];
      }
    } while(isColliding);
    this.seed = position;
  }

  draw(canvas) {
    const ctx = ctx = canvas.getContext("2d");
    this.drawSnake(ctx);
    this.drawSeed(ctx)
  }

  drawSnake(ctx) {
    ctx.fillStyle = "#FF0000";
    this.snake.foreach(function(index, item, array) {
      ctx.fillRect(
        item[0] * ZOOM,
        item[1] * ZOOM,
        ZOOM,
        ZOOM
      );
    });
  }

  drawSeed(ctx) {
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(
      this.seed[0] * ZOOM,
      this.seed[1] * ZOOM,
      ZOOM,
      ZOOM
    );
  }

  tick() {
    const ms = Date().getMilliseconds();
    if (ms - this.SPEED_MS > lastMoveMs) {
      this.moveSnake();
      lastMoveMs = ms;
    }
  }

  moveSnake() {
    const formerPosition = [...this.snake[0]];
    switch(this.direction) {
    case this.DIRECTION_UP:
      this.snake[0][1] -= 1;
      break;
    case this.DIRECTION_DOWN:
      this.snake[0][1] += 1;
      break;
    case this.DIRECTION_LEFT:
      this.snake[0][0] -= 1;
      break;
    case this.DIRECTION_RIGHT:
      this.snake[0][0] += 1;
      break;
    }
  }
}