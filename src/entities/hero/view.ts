import { Container, Graphics } from 'pixi.js';

import { TArea } from '../../shared/types';

const HERO_VIEW_WIDTH = 20;
const HERO_VIEW_HEIGHT = 90;

type TBounce = {
  width: number;
  height: number;
};

export default class View extends Container {
  private BOUNCE: TBounce = {
    width: 0,
    height: 0,
  };

  private COLLISION_BOX: TArea = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor() {
    super();

    this.BOUNCE.width = HERO_VIEW_WIDTH;
    this.BOUNCE.height = HERO_VIEW_HEIGHT;
    this.COLLISION_BOX.width = HERO_VIEW_WIDTH;
    this.COLLISION_BOX.height = HERO_VIEW_HEIGHT;

    const view = new Graphics();
    view
      .setStrokeStyle({
        width: 1,
        color: 0xff0000,
      })
      .rect(0, 0, 20, 90)
      .rect(0, 30, 60, 10)
      .stroke();

    this.addChild(view);

    view.pivot.x = 10;
    view.x = 10;
    // view.scale.x *= -1;
  }

  get collisionBox() {
    this.COLLISION_BOX.x = this.x;
    this.COLLISION_BOX.y = this.y;
    return this.COLLISION_BOX;
  }
}
