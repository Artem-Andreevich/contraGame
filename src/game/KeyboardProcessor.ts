interface IButton {
  isDown: boolean;
  executeDown?: () => void;
  executeUp?: () => void;
}

export type TKeyCode = 'KeyS' | 'KeyA' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown';

export default class KeyboardProcessor {
  private keyMap: Record<TKeyCode, IButton> = {
    KeyS: { isDown: false },
    KeyA: { isDown: false },
    ArrowLeft: { isDown: false },
    ArrowRight: { isDown: false },
    ArrowUp: { isDown: false },
    ArrowDown: { isDown: false },
  };

  public getButton(keyCode: TKeyCode): IButton {
    return this.keyMap[keyCode];
  }

  public onKeyDown(keyCode: TKeyCode) {
    const button = this.getButton(keyCode);

    if (!button) return;

    if (Object.prototype.hasOwnProperty.call(button, 'executeDown')) {
      button.executeDown();
    }

    button.isDown = true;
  }

  public onKeyUp(keyCode: TKeyCode) {
    const button = this.getButton(keyCode);

    if (!button) return;

    if (Object.prototype.hasOwnProperty.call(button, 'executeUp')) {
      button.executeUp();
    }

    button.isDown = false;
  }

  private isButtonPressed(keyCode: TKeyCode): IButton['isDown'] {
    return this.getButton(keyCode).isDown;
  }
}
