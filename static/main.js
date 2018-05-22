const screen = document.querySelector('.screen');
const backBtn = document.querySelector('#back');
const sendTextBtn = document.querySelector('#send_text');
const textInput = document.querySelector('input');

const coords = {
  mousedown: {
    x: 0,
    y: 0
  },
  mouseup: {
    x: 0,
    y: 0
  }
};

screen.addEventListener('mousedown', function(e) {
  console.log('mousedown');
  coords.mousedown.x = e.offsetX;
  coords.mousedown.y = e.offsetY;
});

screen.addEventListener('mouseup', function(e) {
  console.log('mouseup');
  coords.mouseup.x = e.offsetX;
  coords.mouseup.y = e.offsetY;
});

screen.addEventListener('click', function(e) {
  if (
    coords.mousedown.x == coords.mouseup.x &&
    coords.mousedown.y == coords.mouseup.y
  )
    fetch(`tap?x=${e.offsetX}&y=${e.offsetY}`)
      .then(b => b.json())
      .then(console.log);
  else {
    const x1 = coords.mousedown.x;
    const y1 = coords.mousedown.y;
    const x2 = coords.mouseup.x;
    const y2 = coords.mouseup.y;
    fetch(`swipe?x1=${x1}&y1=${y1}&x2=${x2}&y2=${y2}`);
  }
});

backBtn.addEventListener('click', function(e) {
  fetch('back')
    .then(b => b.json())
    .then(console.log);
});

sendTextBtn.addEventListener('click', () => {
  const text = textInput.value;
  fetch(`input_text?text=${text}`);
});
