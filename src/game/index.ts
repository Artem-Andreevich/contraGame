import type { Application } from 'pixi.js';

import Hero from '../entities/hero';
import type Platform from '../entities/platform';
import PlatformFactory from '../entities/platform/PlatformFactory';
import getCollisionResult from '../shared/helpers/getCollisionResult';
import { TPressedArrowContext, TPrevPoint } from '../shared/types';

import KeyboardProcessor from './KeyboardProcessor';

export default class Game {
  private pixiApp: Application;
  private hero: Hero;
  private platforms: Platform[] = [];

  public keyboardProcessor: KeyboardProcessor;

  constructor(app: Application) {
    this.pixiApp = app;

    this.hero = new Hero(this.pixiApp.stage);
    this.hero.x = 100;
    this.hero.y = 100;

    const platformFactory = new PlatformFactory(this.pixiApp);

    this.platforms.push(platformFactory.createPlatform({ x: 100, y: 400 }, { color: 0x00ff00 }));
    this.platforms.push(platformFactory.createPlatform({ x: 300, y: 400 }, { color: 0x00ff00 }));
    this.platforms.push(platformFactory.createPlatform({ x: 500, y: 400 }, { color: 0x00ff00 }));
    this.platforms.push(platformFactory.createPlatform({ x: 700, y: 400 }, { color: 0x00ff00 }));
    this.platforms.push(platformFactory.createPlatform({ x: 900, y: 400 }, { color: 0x00ff00 }));

    this.platforms.push(platformFactory.createPlatform({ x: 300, y: 600 }, { color: 0xfdff00 }));

    this.platforms.push(platformFactory.createPlatform({ x: 0, y: 738 }, { color: 0xff0000, jumpThrough: false }));
    this.platforms.push(
      platformFactory.createPlatform({ x: 200, y: 738 }, { color: 0x00ff00, jumpThrough: false, isStepladder: true }),
    );
    this.platforms.push(
      platformFactory.createPlatform(
        { x: 400, y: 708 },
        { color: 0xffccee, jumpThrough: false, type: 'box', isStepladder: true },
      ),
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
      const platformCollision = getCollisionResult(this.hero.collisionBox, platform.getRect(), prevPoint);

      if (platformCollision.horizontal && platform.IS_STEPLADDER) {
        this.hero.stay(platform.y);
      }

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
      const isRun =
        this.keyboardProcessor.isButtonPressed('ArrowLeft') || this.keyboardProcessor.isButtonPressed('ArrowRight');

      if (this.keyboardProcessor.isButtonPressed('ArrowDown') && !isRun) {
        this.hero.jumpDown();
      } else {
        this.hero.jump();
      }
    };

    const arrowLeft = this.keyboardProcessor.getButton('ArrowLeft');
    arrowLeft.executeDown = () => {
      this.hero.startLeftMove();
      this.hero.setView(this.getPressedArrowContext());
    };
    arrowLeft.executeUp = () => {
      this.hero.stopLeftMove();
      this.hero.setView(this.getPressedArrowContext());
    };

    const arrowRight = this.keyboardProcessor.getButton('ArrowRight');
    arrowRight.executeDown = () => {
      this.hero.startRightMove();
      this.hero.setView(this.getPressedArrowContext());
    };
    arrowRight.executeUp = () => {
      this.hero.stopRightMove();
      this.hero.setView(this.getPressedArrowContext());
    };

    const arrowUp = this.keyboardProcessor.getButton('ArrowUp');
    arrowUp.executeDown = () => this.hero.setView(this.getPressedArrowContext());
    arrowUp.executeUp = () => this.hero.setView(this.getPressedArrowContext());

    const arrowDown = this.keyboardProcessor.getButton('ArrowDown');
    arrowDown.executeDown = () => this.hero.setView(this.getPressedArrowContext());
    arrowDown.executeUp = () => this.hero.setView(this.getPressedArrowContext());
  }

  private getPressedArrowContext(): TPressedArrowContext {
    return {
      pressedArrowLeft: this.keyboardProcessor.isButtonPressed('ArrowLeft'),
      pressedArrowRight: this.keyboardProcessor.isButtonPressed('ArrowRight'),
      pressedArrowUp: this.keyboardProcessor.isButtonPressed('ArrowUp'),
      pressedArrowDown: this.keyboardProcessor.isButtonPressed('ArrowDown'),
    };
  }
}
