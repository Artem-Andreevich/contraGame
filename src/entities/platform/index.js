import { Container, Graphics } from 'pixi.js'

export default class Platform extends Container {

  #DEFAULT_PARAMS = {
    width: 1,
    color: 0x000000,
    x: 0,
    y: 0,
    w: 300,
    h: 30,
  }

  #params = {}

  constructor(params) {
    super()

    this.#params = {
      ...this.#DEFAULT_PARAMS,
      ...params
    }

    console.log(this.#params);
    
    const view = new Graphics()
    view.setStrokeStyle({
      width: this.#params.width,
      color: this.#params.color,
    })
      .rect(
        this.#params.x,
        this.#params.y,
        this.#params.w,
        this.#params.h,
      )
      .stroke()

    this.addChild(view)
  }
}