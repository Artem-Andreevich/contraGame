import { Container, Graphics } from 'pixi.js';

import { TArea } from '../../shared/types';

const HERO_VIEW_WIDTH = 20;
const HERO_VIEW_HEIGHT = 90;
const HERO_VIEW_COLOR = 0xff0000;

type TBounce = {
  width: number;
  height: number;
};

type StateKey = 'stay' | 'stayUp' | 'run' | 'runUp' | 'runDown' | 'lay' | 'jump' | 'fall' | 'default';

type TViews = Record<StateKey, Graphics | null>;

type TViewStm = {
  currentState: StateKey;
  state: TViews;
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

  private STM: TViewStm = {
    currentState: 'default',
    state: {} as TViews,
  };

  private ROOT_NODE: Container;

  constructor() {
    super();

    this.createNodeStructure();
    this.ROOT_NODE.pivot.x = 10;
    this.ROOT_NODE.x = 10;

    this.BOUNCE.width = HERO_VIEW_WIDTH;
    this.BOUNCE.height = HERO_VIEW_HEIGHT;
    this.COLLISION_BOX.width = HERO_VIEW_WIDTH;
    this.COLLISION_BOX.height = HERO_VIEW_HEIGHT;

    this.STM.state.stay = this.getStayImage();
    this.STM.state.stayUp = this.getStayUpImage();
    this.STM.state.run = this.getRunImage();
    this.STM.state.runUp = this.getRunUpImage();
    this.STM.state.runDown = this.getRunDownImage();
    this.STM.state.lay = this.getLayImage();
    this.STM.state.jump = this.getJumpImage();
    this.STM.state.fall = this.getFallImage();

    for (const key in this.STM.state) {
      this.ROOT_NODE.addChild(this.STM.state[key]);
      this.ROOT_NODE.addChild(this.STM.state[key]);
    }
  }

  get collisionBox() {
    this.COLLISION_BOX.x = this.x;
    this.COLLISION_BOX.y = this.y;
    return this.COLLISION_BOX;
  }

  private createNodeStructure() {
    const rootNode = new Container();
    this.ROOT_NODE = rootNode;
    this.addChild(this.ROOT_NODE);
  }

  private changeViewState(key: StateKey) {
    if (this.STM.currentState === key) return;

    for (const key in this.STM.state) {
      this.STM.state[key].visible = false;
    }

    this.STM.state[key].visible = true;
    this.STM.currentState = key;
  }

  public showStayView() {
    this.changeViewState('stay');
  }
  public showFallView() {
    this.changeViewState('fall');
  }
  public showJumpView() {
    this.changeViewState('jump');
  }
  public showLayView() {
    this.changeViewState('lay');
  }
  public showRunView() {
    this.changeViewState('run');
  }
  public showRunDownView() {
    this.changeViewState('runDown');
  }
  public showRunUpView() {
    this.changeViewState('runUp');
  }
  public showStayUpView() {
    this.changeViewState('stayUp');
  }
  public flipView(direction: number) {
    if (direction === 1 || direction === -1) {
      this.ROOT_NODE.scale.x = direction;
    }
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
    const g = new Graphics()
      .setStrokeStyle({ width: 2, color: HERO_VIEW_COLOR })
      .rect(0, 0, 20, 90)
      .rect(0, 30, 60, 10)
      .stroke();
    g.skew.x = -0.1;
    return g;
  }

  private getRunUpImage() {
    const g = new Graphics()
      .setStrokeStyle({ width: 2, color: HERO_VIEW_COLOR })
      .rect(0, 0, 20, 90)
      .lineTo(0, 30)
      .lineTo(40, -20)
      .lineTo(45, -15)
      .lineTo(0, 40)
      .stroke();
    g.skew.x = -0.1;
    return g;
  }

  private getRunDownImage() {
    const g = new Graphics()
      .setStrokeStyle({ width: 2, color: HERO_VIEW_COLOR })
      .rect(0, 0, 20, 90)
      .lineTo(0, 20)
      .lineTo(40, 60)
      .lineTo(35, 65)
      .lineTo(0, 30)
      .stroke();
    g.skew.x = -0.1;
    return g;
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
    const g = new Graphics()
      .setStrokeStyle({ width: 2, color: HERO_VIEW_COLOR })
      .rect(0, 0, 20, 90)
      .rect(10, 20, 5, 60)
      .stroke();
    g.skew.x = -0.1;
    return g;
  }
}
