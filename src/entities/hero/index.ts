import type { Application } from 'pixi.js';

import { TArea } from '../../shared/types';
import type Platform from '../platform';

import View from './view';

type TDirectionContext = {
  LEFT: number;
  RIGHT: number;
};

type THeroState = {
  STAY: string;
  JUMP: string;
  FLY_DOWN: string;
};

const HERO_STATE: THeroState = {
  STAY: 'stay',
  JUMP: 'jump',
  FLY_DOWN: 'flyDown',
};
export default class Hero {
  private readonly GRAVITY_FORCE = 0.1;
  private readonly JUMP_FORCE = 5;
  private readonly SPEED = 2;

  private VELOCITY_X: number = 0;
  private VELOCITY_Y: number = 0;

  private MOVEMENT: { x: number; y: number } = {
    x: 0,
    y: 0,
  };

  private DIRECTION_CONTEXT: TDirectionContext = {
    LEFT: 0,
    RIGHT: 0,
  };

  private STATE = HERO_STATE.STAY;

  public CURRENT_PLATFORM: Platform | null = null;
  public RECT: TArea = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  private VIEW: View;

  constructor(stage: Application['stage']) {
    this.VIEW = new View();

    stage.addChild(this.VIEW);
  }

  get collisionBox() {
    return this.VIEW.collisionBox;
  }

  get x() {
    return this.VIEW.x;
  }
  set x(value) {
    this.VIEW.x = value;
  }

  get y() {
    return this.VIEW.y;
  }
  set y(value) {
    this.VIEW.y = value;
  }

  public update(): void {
    this.VELOCITY_X = this.MOVEMENT.x * this.SPEED;
    this.x += this.VELOCITY_X;

    if (this.VELOCITY_Y > 0 && this.isJumpState()) {
      this.STATE = HERO_STATE.FLY_DOWN;
    }

    this.VELOCITY_Y += this.GRAVITY_FORCE;
    this.y += this.VELOCITY_Y;
  }

  public stay(platformY: number): void {
    this.STATE = HERO_STATE.STAY;
    this.VELOCITY_Y = 0;

    this.y = platformY - this.VIEW.collisionBox.height;
  }

  public jump(): void {
    if (this.isJumpState() || this.STATE === HERO_STATE.FLY_DOWN) return;

    this.STATE = HERO_STATE.JUMP;
    this.VELOCITY_Y -= this.JUMP_FORCE;
  }

  public jumpDown(): void {
    if (!this.CURRENT_PLATFORM.JUMP_THROUGH) return;
    this.STATE = HERO_STATE.JUMP;
  }

  public isJumpState(): boolean {
    return this.STATE === HERO_STATE.JUMP;
  }

  private updateMovement(): void {
    this.MOVEMENT.x = this.DIRECTION_CONTEXT.LEFT + this.DIRECTION_CONTEXT.RIGHT;
  }

  public startLeftMove(): void {
    this.DIRECTION_CONTEXT.LEFT = -1;
    this.updateMovement();
  }

  public startRightMove(): void {
    this.DIRECTION_CONTEXT.RIGHT = 1;
    this.updateMovement();
  }

  public stopLeftMove(): void {
    this.DIRECTION_CONTEXT.LEFT = 0;
    this.updateMovement();
  }

  public stopRightMove(): void {
    this.DIRECTION_CONTEXT.RIGHT = 0;
    this.updateMovement();
  }
}
