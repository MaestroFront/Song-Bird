document.addEventListener("DOMContentLoaded", (e) => {
  let audio = document.querySelectorAll(".bird-audio");
  let playTime = document.querySelectorAll(".play-time");
  let playBtn = document.querySelectorAll(".play-btn");
  let curTime = document.querySelectorAll(".cur-time");
  let volume = document.querySelectorAll(".volume");
  let speaker = document.querySelectorAll(".speaker");

  let isPlaying = false;

  audio.forEach((item, index) => {
    item.onloadedmetadata = function () {
      curTime[index].max = item.duration;
    };
  });

  audio.forEach((item, index) => {
    item.ontimeupdate = function () {
      let sec_num = item.currentTime;
      let hours = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - hours * 3600) / 60);
      let seconds = sec_num - hours * 3600 - minutes * 60;
      seconds = Math.round(seconds);

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      playTime[index].innerHTML = minutes + ":" + seconds;
      if (isPlaying) curTime[index].value = item.currentTime;
    };
  });

  volume.forEach((item, index) => {
    item.onchange = function () {
      audio[index].volume = item.value / 10;
    };
  });

  curTime.forEach((item, index) => {
    item.onchange = function () {
      audio[index].pause();
      audio[index].currentTime = item.value;
      audio[index].play();
    };
  })

  speaker.forEach((item, index) => {
    item.onclick = function () {
      if (volume[index].value == 0) {
        volume[index].value = 10;
        audio[index].volume = 1;
      } else {
        volume[index].value = 0;
        audio[index].volume = 0;
      }
    };
  })

  playBtn.forEach((item, index) => {
    item.addEventListener("click", (a) => {
      if (isPlaying) {
        audio[index].pause();
        isPlaying = false;
        item.innerHTML = "►";
      } else {
        audio[index].play();
        isPlaying = true;
        item.innerHTML = "❚❚";
      }
    });
  })
});
