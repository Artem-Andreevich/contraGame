import { Application } from 'pixi.js';

import Game from './game';

const app = new Application();
await app.init({ background: '#1099bb', resizeTo: window });

const game = new Game(app);
app.ticker.add(game.update, game);

document.getElementById('pixi-container').appendChild(app.canvas);

document.addEventListener('keydown', function (key) {
  game.keyboardProcessor.onKeyDown(key);
});
document.addEventListener('keyup', function (key) {
  game.keyboardProcessor.onKeyUp(key);
});
