const express = require('express');
const exec = require('child_process').exec;
const app = express();

app.use(express.static('static'));

function map(x1, y1, x2, y2) {
  const m = (y1 - y2) / (x1 - x2);
  return x => m * (x - x1) + y1;
}

const transformY = map(0, 0, 700, 1280);
const transformX = map(0, 0, 450, 720);

app.get('/tap', (req, res) => {
  const x = +req.query.x;
  const y = +req.query.y;
  exec(`adb shell input tap ${transformX(x)} ${transformY(y)}`);
  res.json({ status: 'ok' });
});

app.get('/back', (req, res) => {
  exec('adb shell input keyevent 4');
  res.json({ status: 'ok' });
});

app.get('/swipe', (req, res) => {
  const x1 = +req.query.x1;
  const y1 = +req.query.y1;
  const x2 = +req.query.x2;
  const y2 = +req.query.y2;
  exec(
    `adb shell input swipe ${transformX(x1)} ${transformY(y1)} ${transformX(
      x2
    )} ${transformY(y2)}`
  );
  res.json({ status: 'ok' });
});

app.get('/input_text', (req, res) => {
  exec(`adb shell input text "${req.query.text.replace(/ /g, '%s')}"`);
  res.json({ status: 'ok' });
});

app.listen(3001, () => console.log('server listening on port 3001'));
