import type { Application } from 'pixi.js';

import Platform from './index';
import { IPlatformParams, TPlatformPosition } from './type';

export default class PlatformFactory {
  private pixiApp: Application;

  constructor(app: Application) {
    this.pixiApp = app;
  }

  public createPlatform(position: TPlatformPosition, params?: IPlatformParams) {
    const platform = new Platform(params);
    platform.x = position.x;
    platform.y = position.y;

    this.pixiApp.stage.addChild(platform);
    return platform;
  }
}
