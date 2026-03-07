import { Container, Graphics } from 'pixi.js';

import { TArea } from '../../shared/types';

const HERO_VIEW_WIDTH = 20;
const HERO_VIEW_HEIGHT = 90;
const HERO_VIEW_COLOR = 0xff0000;

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

    const views = [];
    views.push(this.getStayImage());
    views.push(this.getStayUpImage());
    views.push(this.getRunImage());
    views.push(this.getRunUpImage());
    views.push(this.getRunDownImage());
    views.push(this.getLayImage());
    views.push(this.getJumpImage());
    views.push(this.getFallImage());

    views.forEach((view, index) => {
      this.addChild(view);
      // eslint-disable-next-line no-param-reassign
      view.x = 150 * index;
    });

    // view.pivot.x = 10;
    // view.x = 10;
    // view.scale.x *= -1;
  }

  get collisionBox() {
    this.COLLISION_BOX.x = this.x;
    this.COLLISION_BOX.y = this.y;
    return this.COLLISION_BOX;
  }

  private getStayImage() {
    return new Graphics()
      .setStrokeStyle({
        width: 2,
        color: HERO_VIEW_COLOR,
      })
      .rect(0, 0, 20, 90)
      .rect(0, 30, 60, 10)
      .stroke();
  }

  private getStayUpImage() {
    return new Graphics()
      .setStrokeStyle({
        width: 2,
        color: HERO_VIEW_COLOR,
      })
      .rect(0, 0, 20, 90)
      .rect(8, -40, 5, 40)
      .stroke();
  }

  private getRunImage() {
    return new Graphics()
      .setStrokeStyle({
        width: 2,
        color: HERO_VIEW_COLOR,
      })
      .rect(0, 0, 20, 90)
      .rect(8, 30, 70, 5)
      .transform((this.skew.x = -0.1))
      .stroke();
  }

  private getRunUpImage() {
    return new Graphics()
      .setStrokeStyle({
        width: 2,
        color: HERO_VIEW_COLOR,
      })
      .rect(0, 0, 20, 90)
      .lineTo(0, 30)
      .lineTo(40, -20)
      .lineTo(45, -15)
      .lineTo(0, 40)
      .transform((this.skew.x = -0.1))
      .stroke();
  }

  private getRunDownImage() {
    return new Graphics()
      .setStrokeStyle({
        width: 2,
        color: HERO_VIEW_COLOR,
      })
      .rect(0, 0, 20, 90)
      .lineTo(0, 20)
      .lineTo(40, 60)
      .lineTo(35, 65)
      .lineTo(0, 30)
      .transform((this.skew.x = -0.1))
      .stroke();
  }

  private getLayImage() {
    const view = new Graphics()
      .setStrokeStyle({
        width: 2,
        color: HERO_VIEW_COLOR,
      })
      .rect(0, 0, 90, 20)
      .rect(90, 0, 40, 5)
      .stroke();

    view.x -= 45;
    view.y += 70;

    return view;
  }

  private getJumpImage() {
    const view = new Graphics()
      .setStrokeStyle({
        width: 2,
        color: HERO_VIEW_COLOR,
      })
      .rect(0, 0, 40, 40)
      .stroke();

    view.x -= 10;
    view.y += 25;

    return view;
  }

  private getFallImage() {
    return new Graphics()
      .setStrokeStyle({
        width: 2,
        color: HERO_VIEW_COLOR,
      })
      .rect(0, 0, 20, 90)
      .rect(10, 20, 5, 60)
      .transform((this.skew.x = -0.1))
      .stroke();
  }
}
