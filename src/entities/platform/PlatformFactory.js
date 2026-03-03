import Platform from './index'

export default class PlatformFactory {

  #pixiApp

  constructor(pixiApp) {
    this.#pixiApp = pixiApp
    console.log(this.#pixiApp);

  }

  createPlatform(position) {
    const platform = new Platform()
    platform.x = position.x
    platform.y = position.y

    this.#pixiApp.stage.addChild(platform)
    return platform
  }
}