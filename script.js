let userInput = document.querySelector('.userInput')
let text;
let currentData = '';
let typing = false;
let gameover = false;
let typedInput = ''
let i = 0;
let index = 0;
let typedCharacter = 0;
let elapsedtime = 1;
let timerInterval;
let enteredKey;
let toTypeData = [
  'One of the indictments of civilizations is that happiness and intelligence are so rarely found in the same person.',
  "When any two young people take it into their heads to marry, they are pretty sure by perseverance to carry their point, be they ever so poor, or ever so imprudent, or ever so little likely to be necessary to each other's ultimate comfort.",
  "Don't join the book burners. Don't think you're going to conceal faults by concealing evidence that they ever existed. Don't be afraid to go in your library and read every book..."
]
renderWord();
typingEvent();
replay.addEventListener('click', () => {
  timer.innerHTML = 30;
  cpm.innerHTML = 0;
  wpm.innerHTML = 0;
  index++;
  renderWord();
  gameover = false;
  typing = false;
  i = 0;
  userInput.value = '';
  userInput.readOnly = false;
  typedInput = '';
  typedCharacter = 0;
  elapsedtime = 1;
  clearInterval(timerInterval);
  userInput.removeEventListener('input', gameData)
  userInput.classList.remove('wrong-input')
  typingEvent();
})
function gameData(e) {
  if (typing === false) {
    playingNow();
  }
  typing = true;
  if (typedInput.length === dataArray.length - 1) {
    userInput.readOnly = true;
    gameover = true;
  }
  enteredKey = '';
  if (e.data === dataArray[i]) {
    userInput.classList.remove('wrong-input')
    enteredKey = e.data;
    typedInput += enteredKey;
    userInput.value = typedInput;
    i++;
    typedCharacter++;
  }
  else {
    userInput.value = typedInput;
    userInput.classList.add('wrong-input')
  }
}
function typingEvent() {
  userInput.addEventListener('input', gameData)
}
function playingNow() {
  let timeleft = 30;
  timerInterval = setInterval(() => {
    timer.innerHTML = timeleft;
    timeleft--;
    elapsedtime++;
    //character per minute
    cpm.innerHTML = Math.floor((typedCharacter / elapsedtime) * 60);
    //word per minute  
    wpm.innerHTML = Math.floor(((typedCharacter / 5) / elapsedtime) * 60);
    if (timeleft < 0 || gameover === true) {
      clearInterval(timerInterval);
      userInput.readOnly = true;
      gameover = true;
    }
  }, 1000)
}

function renderWord() {
  currentData = toTypeData[index]
  document.querySelector('.typingData').innerHTML = currentData;
  text = document.querySelector('.typingData').textContent;
  dataArray = text.split('')
}