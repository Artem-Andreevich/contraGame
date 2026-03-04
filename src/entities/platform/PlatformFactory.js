import Platform from './index';

export default class PlatformFactory {
  #pixiApp;

  constructor(pixiApp) {
    this.#pixiApp = pixiApp;
  }

  createPlatform(position, params = {}) {
    const platform = new Platform(params);
    platform.x = position.x;
    platform.y = position.y;

    this.#pixiApp.stage.addChild(platform);
    return platform;
  }
}
