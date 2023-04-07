import languagesData from "./language.js";

const doorHandle = document.querySelectorAll(".door-handle");
const door = document.querySelectorAll(".door-video");
const audio = document.querySelector(".background-audio");

const rusBtn = document.querySelector(".btn-rus");
const engBtn = document.querySelector(".btn-eng");

const language = localStorage.getItem("language");

let menuItem = document.querySelectorAll(".menu__item_link");
let titlesVideo = document.querySelectorAll(".video-title_text");

audio.volume = 0.01;

doorHandle.forEach((item, index) => {
  item.addEventListener("click", () => {
    door[index].style.transform = "translateX(100%)";
  });
});

document.querySelector(".controls-prev").addEventListener("click", () => {
  door.forEach((item) => {
    item.style.transform = "translateX(0%)";
  });
});

document.querySelector(".controls-next").addEventListener("click", () => {
  door.forEach((item) => {
    item.style.transform = "translateX(0%)";
  });
});

if (language === "rus") {
  menuItem.forEach((item, index) => {
    item.innerHTML = localStorage.getItem(`menu-item-rus__${index}`);
  });
  titlesVideo.forEach((item, index) => {
    item.innerHTML = localStorage.getItem(`top-rus__${index}`);
  });
}

if (language === "eng") {
  menuItem.forEach((item, index) => {
    item.innerHTML = localStorage.getItem(`menu-item-eng__${index}`);
  });
  titlesVideo.forEach((item, index) => {
    item.innerHTML = localStorage.getItem(`top-eng__${index}`);
  });
}

rusBtn.addEventListener("click", () => {
  menuItem.forEach((item, index) => {
    item.innerHTML = localStorage.getItem(`menu-item-rus__${index}`);
  });
  titlesVideo.forEach((item, index) => {
    item.innerHTML = localStorage.getItem(`top-rus__${index}`);
  });
  localStorage.setItem("language", "rus");
});
engBtn.addEventListener("click", () => {
  menuItem.forEach((item, index) => {
    item.innerHTML = localStorage.getItem(`menu-item-eng__${index}`);
  });
  titlesVideo.forEach((item, index) => {
    item.innerHTML = localStorage.getItem(`top-eng__${index}`);
  });
  localStorage.setItem("language", "eng");
});

languagesData[0].forEach((item, index) => {
  localStorage.setItem(`menu-item-rus__${index}`, item.rus);
  localStorage.setItem(`menu-item-eng__${index}`, item.eng);
});
languagesData[1].forEach((item, index) => {
  localStorage.setItem(`top-rus__${index}`, item.rus);
  localStorage.setItem(`top-eng__${index}`, item.eng);
});

export default language;
