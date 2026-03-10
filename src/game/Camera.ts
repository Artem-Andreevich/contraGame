import type { Application, Container } from 'pixi.js';
import type Hero from 'src/entities/hero';

export type TCameraSettings = {
  target: Hero;
  world: Container;
  screenSize: Application['screen'];
  maxScrollWidth: number;
  isBackScrollX: boolean;
};

export default class Camera {
  private target: TCameraSettings['target'];
  private world: TCameraSettings['world'];
  private isBackScrollX: TCameraSettings['isBackScrollX'];
  private centerScreenPointX: number;
  private rightBorderWorldPointX: number;
  private lastPointX: number;

  constructor(cameraSettings: TCameraSettings) {
    this.target = cameraSettings.target;
    this.world = cameraSettings.world;
    this.isBackScrollX = cameraSettings.isBackScrollX;
    this.centerScreenPointX = cameraSettings.screenSize.width / 2;
    this.rightBorderWorldPointX = this.world.width - this.centerScreenPointX;
  }

  update() {
    if (this.isEndWorld() || this.isDisallowBackScrollX()) return;

    this.lastPointX = this.target.x;

    if (this.target.x > this.centerScreenPointX) {
      this.world.x = this.centerScreenPointX - this.target.x;
    }
  }

  isEndWorld() {
    return Boolean(this.target.x > this.rightBorderWorldPointX);
  }

  isDisallowBackScrollX() {
    return Boolean(!this.isBackScrollX && this.target.x < this.lastPointX);
  }
}
