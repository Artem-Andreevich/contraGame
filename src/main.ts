import { Application } from 'pixi.js';

import Game from './game';
import type { TKeyCode } from './game/KeyboardProcessor';

void (async () => {
  const app = new Application();
  await app.init({ background: '#1099bb', resizeTo: window });

  const game = new Game(app);
  app.ticker.add(game.update, game);

  document.getElementById('pixi-container').appendChild(app.canvas);

  document.addEventListener('keydown', function (event) {
    game.keyboardProcessor.onKeyDown(event.code as TKeyCode);
  });
  document.addEventListener('keyup', function (event) {
    game.keyboardProcessor.onKeyUp(event.code as TKeyCode);
  });
})();
