import Hero from "../entities/hero"
import PlatformFactory from "../entities/platform/PlatformFactory"
import KeyboardProcessor from "./KeyboardProcessor"

export default class Game {

  #pixiApp
  #hero
  #platforms = []

  keyboardProcessor

  constructor(app) {

    this.#pixiApp = app

    this.#hero = new Hero()
    this.#hero.x = 100
    this.#hero.y = 100
    this.#pixiApp.stage.addChild(this.#hero)

    const platformFactory = new PlatformFactory(this.#pixiApp)

    this.#platforms.push(platformFactory.createPlatform({x: 100, y: 450}))
    this.#platforms.push(platformFactory.createPlatform({x: 400, y: 520}))
    this.#platforms.push(platformFactory.createPlatform({x: 600, y: 450}))

    this.keyboardProcessor = new KeyboardProcessor()

    this.keyboardProcessor.getButton('KeyS').executeDown = () => {
      this.#hero.jump()
    }
    this.keyboardProcessor.getButton('ArrowLeft').executeDown = () => {
      this.#hero.startLeftMove()
    }
    this.keyboardProcessor.getButton('ArrowLeft').executeUp = () => {
      this.#hero.stopLeftMove()
    }
    this.keyboardProcessor.getButton('ArrowRight').executeDown = () => {
      this.#hero.startRightMove()
    }
    this.keyboardProcessor.getButton('ArrowRight').executeUp = () => {
      this.#hero.stopRightMove()
    }
  }

  update() {
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y
    }

    this.#hero.update()

    for(let i = 0; i < this.#platforms.length; i++) {
      const collisionResult = this.getPlatformCollisionResult(
        this.#hero,
        this.#platforms[i],
        prevPoint
      )
      
      if(collisionResult.vertical) {
        this.#hero.stay()
      }
    }
  }

  getPlatformCollisionResult(entity, platform, prevPoint) {
    const collisionResult = {
      horizontal: false,
      vertical: false,
    }

    if(!this.isCheckAABB(entity, platform)) {
      return collisionResult
    }
    
    const currY = entity.y
    entity.y = prevPoint.y
    
    if(!this.isCheckAABB(entity, platform)) {
      collisionResult.vertical = true
      return collisionResult
    }

    entity.y = currY
    entity.x = prevPoint.x

    collisionResult.horizontal = true
    return collisionResult
  }

  isCheckAABB(entity, area) {
    return (
      entity.x < area.x + area.width
      && entity.x + entity.width > area.x
      && entity.y < area.y + area.height
      && entity.y + entity.height > area.y
    )
  }
}