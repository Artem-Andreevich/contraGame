export default class KeyboardProcessor {
  #keyMap = {
    KeyS: {
      isDown: false,
    },
    KeyA: {
      isDown: false,
    },
    ArrowLeft: {
      isDown: false,
    },
    ArrowRight: {
      isDown: false,
    },
    ArrowUp: {
      isDown: false,
    },
    ArrowDown: {
      isDown: false,
    },
  };

  getButton(keyCode) {
    return this.#keyMap[keyCode] || {};
  }

  onKeyDown(key) {
    const button = this.getButton(key.code);

    if (button && Object.prototype.hasOwnProperty.call(button, 'executeDown')) {
      button.executeDown();
    }

    button.isDown = true;
  }

  onKeyUp(key) {
    const button = this.getButton(key.code);

    if (button && Object.prototype.hasOwnProperty.call(button, 'executeUp')) {
      button.executeUp();
    }

    button.isDown = false;
  }

  isButtonPressed(keyCode) {
    return this.getButton(keyCode).isDown;
  }
}
