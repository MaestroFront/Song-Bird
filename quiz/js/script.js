import birdsData from "./birds-data.js";
import birdsDataEn from "./birds-data-en.js";
import languagesData from "./language.js";

let language = localStorage.getItem("language");

const questions = document.querySelectorAll(".questions__item");
const answers = document.querySelectorAll(".answers__item");

const birdDescription = document.querySelector(".bird-description");
const descriptionRules = document.querySelector(".description-rules");

const btnNextQuestion = document.querySelector(".btn-next");
const nextQuestionGif = document.querySelector(".next-question");
const popup = document.querySelector(".popup");
const popupScore = document.querySelector(".popup-score");
const userName = document.querySelector(".user-name");
const saveNameBtn = document.querySelector(".save-name");
const endQuizBtn = document.querySelector(".btn-end");
const articleFirst = document.querySelector(".questions-score");
const articleSecond = document.querySelector(".current-question");
const articleThird = document.querySelector(".answers");
const articleFourth = document.querySelector(".buttons");
const maximumScore = document.querySelector(".wow");

let buttons = document.querySelectorAll(".btn");
let audio = document.querySelectorAll(".audio");
let birdImg = document.querySelectorAll(".bird");
let birdName = document.querySelectorAll(".bird-name");
let birdSpecies = document.querySelector(".bird-species");
let birdAbout = document.querySelector(".bird-about");
let score = document.querySelector(".score-value");
let scoreText = document.querySelector(".score p");
let numbers = [];
let questionScores = [5, 5, 5, 5, 5, 5];
let results = JSON.parse(localStorage.getItem("results")) || [];
let numberOfQuestion = 1;
btnNextQuestion.disabled = true;
btnNextQuestion.style.color = "grey";

function createAudio(src, volume) {
  const audio = new Audio();
  audio.src = src;
  audio.volume = volume;
  return audio;
}

const error = createAudio("../quiz/assets/audio/bruh.mp3", 0.1);
const win = createAudio("../quiz/assets/audio/win.mp3", 0.1);
const washBoard = createAudio("../quiz/assets/audio/clear.mp3", 0.1);
const wow = createAudio("../quiz/assets/audio/wow.mp3", 0.1);

function fillRulesAndButtonsNames() {
  if (language === "rus") {
    descriptionRules.textContent = languagesData[2][0].rus;
    buttons.forEach((btn, index) => {
      btn.innerHTML = languagesData[3][index].rus;
    });
  } else if (language === "eng") {
    descriptionRules.textContent = languagesData[2][0].eng;
    buttons.forEach((btn, index) => {
      btn.innerHTML = languagesData[3][index].eng;
    });
  }
}
fillRulesAndButtonsNames();

function getRandomNumber() {
  const min = Math.ceil(0);
  const max = Math.floor(5);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hideBirdNameAndImg() {
  birdImg[0].src = "./assets/img/unknown-bird.gif";
  birdName.forEach((name) => (name.textContent = "*****"));
}

function fillAnswersBlocks() {
  answers.forEach((answer, index) => {
    if (language === "eng") {
      answer.textContent = birdsDataEn[numberOfQuestion - 1][index].name;
    } else {
      answer.textContent = birdsData[numberOfQuestion - 1][index].name;
    }
  });
}
function hideBirdDescription() {
  birdDescription.style.opacity = "0";
  birdAbout.style.opacity = "0";
}

function showRules() {
  descriptionRules.style.opacity = "1";
}

function showCurrentQuestion() {
  questions.forEach((question, index) => {
    if (index === numberOfQuestion - 1) {
      question.classList.add("current");
    } else {
      question.classList.remove("current");
    }
  });
}

function reserAnswersBlocksStyle() {
  answers.forEach((answer) => {
    answer.style.backgroundColor = "transparent";
  });
}

function disableNextQuestionButton() {
  btnNextQuestion.disabled = true;
  btnNextQuestion.style.color = "grey";
}

function increaseQuestionNumber() {
  return numberOfQuestion++;
}

function resetData() {
  hideBirdNameAndImg();
  fillAnswersBlocks();
  hideBirdDescription();
  showRules();
  increaseQuestionNumber();
  showCurrentQuestion();
  reserAnswersBlocksStyle();
  disableNextQuestionButton();
}

function clearBoard() {
  articleFirst.style.transform = "scale(0)";
  articleSecond.style.transform = "scale(0)";
  articleThird.style.transform = "scale(0)";
  articleFourth.style.transform = "scale(0)";
}

function showCorrectAnswer(number) {
  console.log("Правильный ответ: ", number + 1);
}

function showScoreText() {
  if (language === "rus") {
    scoreText.innerHTML = languagesData[1][0].rus;
  } else if (language === "eng") {
    scoreText.innerHTML = languagesData[1][0].eng;
  }
}

function showQuestionsText(question, index) {
  if (language === "rus") {
    question.textContent = languagesData[0][index].rus;
  } else if (language === "eng") {
    question.textContent = languagesData[0][index].eng;
  }
}

function setAudioForBirds(number) {
  return audio.forEach((audio) => {
    audio.src = birdsData[numberOfQuestion - 1][number].audio;
  });
}

function indicateCorrectAnser(answer) {
  win.play();
  answer.style.backgroundColor = "green";
}

function showBirdDescription() {
  birdDescription.style.opacity = "1";
  birdAbout.style.opacity = "1";
}

function hideQuizRules() {
  descriptionRules.style.opacity = "0";
}

function setImagesForBirds(number) {
  birdImg.forEach((image) => {
    image.src = birdsData[numberOfQuestion - 1][number].image;
  });
}

function setNamesForBirds(number) {
  birdName.forEach((name) => {
    if (language === "eng") {
      name.textContent = birdsDataEn[numberOfQuestion - 1][number].name;
    } else {
      name.textContent = birdsData[numberOfQuestion - 1][number].name;
    }
  });
}

function setBirdSpecies(number) {
  birdSpecies.textContent = birdsData[numberOfQuestion - 1][number].species;
}

function setInfoAboutBird(number) {
  if (language === "eng") {
    birdAbout.textContent =
      birdsDataEn[numberOfQuestion - 1][number].description;
  } else {
    birdAbout.textContent = birdsData[numberOfQuestion - 1][number].description;
  }
}

function stopBirdsAudio() {
  audio.forEach((audio) => {
    audio.pause();
  });
}

function upgradeScore(questionScore) {
  return (score.textContent = +score.textContent + questionScore);
}

function enableNextQuestionButton() {
  btnNextQuestion.disabled = false;
  btnNextQuestion.style.color = "green";
}

function showEndOfQuizButton() {
  if (numberOfQuestion === 6) {
    endQuizBtn.style.display = "block";
    btnNextQuestion.style.display = "none";
  }
}

function showAudioOnBirdDescriptionBlock(ind) {
  audio[1].src = birdsData[numberOfQuestion - 1][ind].audio;
}

function showImageOnBirdDescriptionBlock(ind) {
  birdImg[1].src = birdsData[numberOfQuestion - 1][ind].image;
}

function showNameOnBirdDescriptionBlock(ind) {
  if (language === "eng") {
    birdName[1].textContent = birdsDataEn[numberOfQuestion - 1][ind].name;
  } else {
    birdName[1].textContent = birdsData[numberOfQuestion - 1][ind].name;
  }
}

function showSpeciesOnBirdDescriptionBlock(ind) {
  birdSpecies.textContent = birdsData[numberOfQuestion - 1][ind].species;
}

function showBirdAboutOnBirdDescriptionBlock(ind) {
  if (language === "eng") {
    birdAbout.textContent = birdsDataEn[numberOfQuestion - 1][ind].description;
  } else {
    birdAbout.textContent = birdsData[numberOfQuestion - 1][ind].description;
  }
}

function showIncorrectAnswer(answer) {
  if (btnNextQuestion.style.color === "grey") {
    answer.style.backgroundColor = "red";
    error.play();
  }
}

function fillData() {
  let questionScore = questionScores[numberOfQuestion - 1];
  let number = getRandomNumber();
  numbers.push(number);
  showCorrectAnswer(number);
  showScoreText();
  questions.forEach((question, index) => {
    showQuestionsText(question, index);
    if (question.classList.contains("current")) {
      setAudioForBirds(number);
      fillAnswersBlocks();
      answers.forEach((answer, ind) => {
        answer.addEventListener("click", () => {
          showAudioOnBirdDescriptionBlock(ind);
          showImageOnBirdDescriptionBlock(ind);
          showNameOnBirdDescriptionBlock(ind);
          showSpeciesOnBirdDescriptionBlock(ind);
          showBirdAboutOnBirdDescriptionBlock(ind);
          if (ind === number) {
            indicateCorrectAnser(answer);
            showBirdDescription();
            hideQuizRules();
            setAudioForBirds(number);
            setImagesForBirds(number);
            setNamesForBirds(number);
            setBirdSpecies(number);
            setInfoAboutBird(number);
            upgradeScore(questionScore);
            stopBirdsAudio();
            enableNextQuestionButton();
            questionScore = 5;
            number = -1;
            showEndOfQuizButton();
          }
          if (ind !== numbers[numbers.length - 1]) {
            showBirdDescription();
            hideQuizRules();
            showIncorrectAnswer(answer);
            questionScore--;
          }
        });
      });
    }
  });
}
fillData();

btnNextQuestion.addEventListener("click", () => {
  nextQuestionGif.style.display = "block";
  resetData();
  washBoard.play();
  setTimeout(function () {
    fillData();
    nextQuestionGif.style.display = "none";
    washBoard.pause();
  }, 1200);
});

saveNameBtn.addEventListener("click", () => {
  nextQuestionGif.style.display = "block";
  popup.style.transform = "scale(0)";
  btnNextQuestion.disabled = true;
  btnNextQuestion.style.color = "grey";
  washBoard.play();
  fillData();
  setTimeout(function () {
    nextQuestionGif.style.display = "none";
    location.reload();
  }, 2000);
  results.push({
    name: userName.value,
    result: score.textContent,
  });
  localStorage.setItem("results", JSON.stringify(results));
});

endQuizBtn.addEventListener("click", () => {
  if (score.textContent === "30") {
    maximumScore.style.display = "block";
    wow.play();
    setTimeout(function () {
      maximumScore.style.display = "none";
    }, 5000);
  }
  nextQuestionGif.style.display = "block";
  clearBoard();
  washBoard.play();
  setTimeout(function () {
    popup.style.transform = "scale(1)";
    nextQuestionGif.style.display = "none";
    washBoard.pause();
  }, 1200);
  popupScore.textContent = score.textContent;
});
