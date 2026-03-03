import { Container, Graphics } from 'pixi.js'

const HERO_STATE = {
  STAY: 'stay',
  JUMP: 'jump'
}

export default class Hero extends Container{

  #GRAVITY_FORCE = 0.1
  #JUMP_FORCE = 5
  #SPEED = 2
  #VELOCITY_X = 0
  #VELOCITY_Y = 0

  #MOVEMENT = {
    x: 0,
    y: 0,
  }

  #DIRECTION_CONTEXT = {
    LEFT: 0,
    RIGHT: 0,
  }

  #STATE = HERO_STATE.STAY

  constructor() {
    super()

    const view = new Graphics()
    view.setStrokeStyle({
      width: 1,
      color: 0xff0000
    })
      .rect(0, 0, 20, 60)
      .stroke()

    this.addChild(view)
  }

  update() {

    this.#VELOCITY_X = this.#MOVEMENT.x * this.#SPEED
    this.x += this.#VELOCITY_X

    this.#VELOCITY_Y += this.#GRAVITY_FORCE
    this.y += this.#VELOCITY_Y
  }

  stay() {
    this.#STATE = HERO_STATE.STAY
    this.#VELOCITY_Y = 0
  }

  jump() {
    if(this.#STATE == HERO_STATE.JUMP) return
    this.#STATE = HERO_STATE.JUMP
    this.#VELOCITY_Y -= this.#JUMP_FORCE
  }

  startLeftMove() {
    this.#DIRECTION_CONTEXT.LEFT = -1

    if( this.#DIRECTION_CONTEXT.RIGHT > 0 ){
      this.#MOVEMENT.x = 0
      return
    } 
    this.#MOVEMENT.x = -1
  }

  startRightMove() {
    this.#DIRECTION_CONTEXT.RIGHT = 1

    if( this.#DIRECTION_CONTEXT.LEFT < 0 ){
      this.#MOVEMENT.x = 0
      return
    } 
    this.#MOVEMENT.x = 1
  }

  stopLeftMove() {
    this.#DIRECTION_CONTEXT.LEFT = 0
    this.#MOVEMENT.x = this.#DIRECTION_CONTEXT.RIGHT
  }

  stopRightMove() {
    this.#DIRECTION_CONTEXT.RIGHT = 0
    this.#MOVEMENT.x = this.#DIRECTION_CONTEXT.LEFT
  }
}