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

    this.platforms.push(platformFactory.createPlatform({ x: 300, y: 600 }, { color: 0xfdff00 }));

    this.platforms.push(platformFactory.createPlatform({ x: 0, y: 738 }, { color: 0xff0000, jumpThrough: false }));
    this.platforms.push(platformFactory.createPlatform({ x: 200, y: 738 }, { color: 0x00ff00, jumpThrough: false }));
    this.platforms.push(
      platformFactory.createPlatform({ x: 400, y: 708 }, { color: 0xffccee, jumpThrough: false, type: 'box' }),
    );

    this.keyboardProcessor = new KeyboardProcessor();

    this.setKeys();
  }

  public update(): void {
    const prevPoint: TPrevPoint = {
      x: this.hero.x,
      y: this.hero.y,
    };

    this.hero.update();

    for (const platform of this.platforms) {
      const platformCollision = getCollisionResult(this.hero.getRect(), platform.getRect(), prevPoint);

      if (platformCollision.horizontal && platform.TYPE === 'box') {
        this.hero.x = prevPoint.x;
      }

      if (this.hero.isJumpState()) continue;

      if (platformCollision.vertical) {
        this.hero.CURRENT_PLATFORM = platform;
        this.hero.y = prevPoint.y;
        this.hero.stay(platform.y);
      }
    }
  }

  private setKeys(): void {
    this.keyboardProcessor.getButton('KeyS').executeDown = () => {
      if (this.keyboardProcessor.isButtonPressed('ArrowDown')) {
        this.hero.jumpDown();
      } else {
        this.hero.jump();
      }
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
