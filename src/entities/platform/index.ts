import { Container, Graphics } from 'pixi.js';

import type { TArea } from '../../shared/types';

import type { IPlatformParams } from './type';

export default class Platform extends Container {
  private DEFAULT_PARAMS: IPlatformParams = {
    width: 1,
    color: 0x000000,
    x: 0,
    y: 0,
    w: 300,
    h: 30,
    jumpThrough: true,
  };

  public RECT: TArea = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  public JUMP_THROUGH = true;

  private computedParams: IPlatformParams = {};

  constructor(params: IPlatformParams) {
    super();

    this.computedParams = {
      ...this.DEFAULT_PARAMS,
      ...params,
    };

    this.JUMP_THROUGH = this.computedParams.jumpThrough;

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

  public getRect() {
    this.RECT.x = this.x;
    this.RECT.y = this.y;
    this.RECT.width = this.width;
    this.RECT.height = this.height;

    return this.RECT;
  }
}
