import birdsData from "./birds-data.js";
import birdsDataEn from "./birds-data-en.js";

const gallery = document.querySelector(".gallery__list");

for (let i = 0; i < 36; i++) {
  const li = document.createElement("li");
  const container = document.createElement("div");
  const board = document.createElement("img");
  const img = document.createElement("img");
  const name = document.createElement("p");
  const species = document.createElement("p");
  const player = document.createElement("div");
  const audio = document.createElement("audio");
  const curTime = document.createElement("input");
  const playBtn = document.createElement("button");
  const playTime = document.createElement("div");
  const speaker = document.createElement("div");
  const volume = document.createElement("input");
  const description = document.createElement("p");

  li.classList.add("gallery__item");
  board.classList.add("board");
  container.classList.add("gallery__item_container");
  img.classList.add("bird-img");
  name.classList.add("bird-name");
  species.classList.add("bird-species");
  audio.classList.add("bird-audio");
  description.classList.add("bird-description");

  player.classList.add("player");
  curTime.classList.add("cur-time");
  playBtn.classList.add("play-btn");
  playTime.classList.add("play-time");
  speaker.classList.add("speaker");
  volume.classList.add("volume");
  curTime.type = "range";
  curTime.min = "0";
  curTime.max = "10";
  curTime.step = "0";
  curTime.value = "0";
  volume.type = "range";
  playBtn.textContent = "►";
  playTime.textContent = "00:00";
  volume.min = "0";
  volume.max = "10";

  player.append(audio);
  player.append(curTime);
  player.append(playBtn);
  player.append(playTime);
  player.append(speaker);
  player.append(volume);

  gallery.append(li);
  li.append(board);
  li.append(container);
  container.append(name);
  container.append(species);
  container.append(img);
  container.append(description);
  container.append(player);
}

const board = document.querySelectorAll(".board");
const birdImg = document.querySelectorAll(".bird-img");
const birdName = document.querySelectorAll(".bird-name");
const birdSpecies = document.querySelectorAll(".bird-species");
const birdAudio = document.querySelectorAll(".bird-audio");
const birdDescription = document.querySelectorAll(".bird-description");
const language = localStorage.getItem("language");

board.forEach((element) => {
  element.src = "../gallery/assets/img/wood-board.png";
});

birdImg.forEach((element, index) => {
  element.src = birdsData.flat()[index].image;
});

birdName.forEach((element, index) => {
  if (language === "rus") {
    element.textContent = birdsData.flat()[index].name;
  } else {
    element.textContent = birdsDataEn.flat()[index].name;
  };
});

birdSpecies.forEach((element, index) => {
  element.textContent = birdsData.flat()[index].species;
});

birdAudio.forEach((element, index) => {
  element.src = birdsData.flat()[index].audio;
  element.controls = true;
});

birdDescription.forEach((element, index) => {
  if (language === "rus") {
    element.textContent = birdsData.flat()[index].description;
  } else {
    element.textContent = birdsDataEn.flat()[index].description;
  }
});
