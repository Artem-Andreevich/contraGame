import { Container, Graphics } from 'pixi.js';

import type { IPlatformParams } from './type';

export default class Platform extends Container {
  private DEFAULT_PARAMS: IPlatformParams = {
    width: 1,
    color: 0x000000,
    x: 0,
    y: 0,
    w: 300,
    h: 30,
  };

  private computedParams: IPlatformParams = {};

  constructor(params: IPlatformParams) {
    super();

    this.computedParams = {
      ...this.DEFAULT_PARAMS,
      ...params,
    };

    const view = new Graphics();
    view
      .setStrokeStyle({
        width: this.computedParams.width,
        color: this.computedParams.color,
      })
      .rect(this.computedParams.x, this.computedParams.y, this.computedParams.w, this.computedParams.h)
      .stroke();

    this.addChild(view);
  }
}
