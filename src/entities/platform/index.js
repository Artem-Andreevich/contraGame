import { Container, Graphics } from 'pixi.js'

export default class Platform extends Container{

  constructor() {
    super()

    const view = new Graphics()
    view.setStrokeStyle({
      width: 1,
      color: 0x00ff00
    })
      .rect(0, 0, 300, 30)
      .stroke()

    this.addChild(view)
  }
}