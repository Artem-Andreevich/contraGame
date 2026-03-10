import type { Container } from 'pixi.js';

import Platform from './index';
import { IPlatformParams, TPlatformPosition } from './type';

export default class PlatformFactory {
  private container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  public createPlatform(position: TPlatformPosition, params?: IPlatformParams) {
    const platform = new Platform(params);
    platform.x = position.x;
    platform.y = position.y;

    this.container.addChild(platform);
    return platform;
  }
}
