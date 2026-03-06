import type { Application } from 'pixi.js';

import Hero from '../entities/hero';
import type Platform from '../entities/platform';
import PlatformFactory from '../entities/platform/PlatformFactory';
import getCollisionResult from '../shared/helpers/getCollisionResult';
import { TPrevPoint } from '../shared/types';

import KeyboardProcessor from './KeyboardProcessor';

export default class Game {
  private pixiApp: Application;
  private hero: Hero;
  private platforms: Platform[] = [];

  public keyboardProcessor: KeyboardProcessor;

  constructor(app: Application) {
    this.pixiApp = app;

    this.hero = new Hero();
    this.hero.x = 100;
    this.hero.y = 100;
    this.pixiApp.stage.addChild(this.hero);

    const platformFactory = new PlatformFactory(this.pixiApp);

    this.platforms.push(platformFactory.createPlatform({ x: 100, y: 400 }, { color: 0x00ff00 }));
    this.platforms.push(platformFactory.createPlatform({ x: 300, y: 400 }, { color: 0x00ff00 }));
    this.platforms.push(platformFactory.createPlatform({ x: 500, y: 400 }, { color: 0x00ff00 }));
    this.platforms.push(platformFactory.createPlatform({ x: 700, y: 400 }, { color: 0x00ff00 }));
    this.platforms.push(platformFactory.createPlatform({ x: 900, y: 400 }, { color: 0x00ff00 }));

    this.platforms.push(platformFactory.createPlatform({ x: 300, y: 600 }, { color: 0x00ff00 }));

    this.platforms.push(platformFactory.createPlatform({ x: 0, y: 738 }, { color: 0x00ff00 }));
    this.platforms.push(platformFactory.createPlatform({ x: 200, y: 738 }, { color: 0x00ff00 }));
    this.platforms.push(platformFactory.createPlatform({ x: 400, y: 708 }, { color: 0x00ff00 }));

    this.keyboardProcessor = new KeyboardProcessor();

    this.setKeys();
  }

  public update(): void {
    const prevPoint: TPrevPoint = {
      x: this.hero.x,
      y: this.hero.y,
    };

    this.hero.update();

    for (let i = 0; i < this.platforms.length; i++) {
      if (this.hero.isJumpState()) continue;

      const platformCollision = getCollisionResult(this.hero.getRect(), this.platforms[i].getRect(), prevPoint);

      if (platformCollision.vertical) {
        this.hero.y = prevPoint.y;
        this.hero.stay();
      }
    }
  }

  private setKeys(): void {
    this.keyboardProcessor.getButton('KeyS').executeDown = () => {
      this.hero.jump();
    };
    this.keyboardProcessor.getButton('ArrowLeft').executeDown = () => {
      this.hero.startLeftMove();
    };
    this.keyboardProcessor.getButton('ArrowLeft').executeUp = () => {
      this.hero.stopLeftMove();
    };
    this.keyboardProcessor.getButton('ArrowRight').executeDown = () => {
      this.hero.startRightMove();
    };
    this.keyboardProcessor.getButton('ArrowRight').executeUp = () => {
      this.hero.stopRightMove();
    };
  }
}
