document.addEventListener("DOMContentLoaded", (e) => {
  let audio = document.querySelector(".bird-characteristic .audio");
  let playTime = document.querySelector(".bird-characteristic .play-time");
  let playBtn = document.querySelector(".bird-characteristic .play-btn");
  let curTime = document.querySelector(".bird-characteristic .cur-time");
  let volume = document.querySelector(".bird-characteristic .volume");
  let speaker = document.querySelector(".bird-characteristic .speaker");

  let isPlaying = false;

  audio.onloadedmetadata = function () {
    curTime.max = audio.duration;
  };

  audio.ontimeupdate = function () {
    let sec_num = audio.currentTime;
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
    playTime.innerHTML = minutes + ":" + seconds;
    if (isPlaying) curTime.value = audio.currentTime;
  };

  volume.onchange = function () {
    audio.volume = volume.value / 10;
  };

  curTime.onchange = function () {
    audio.pause();
    audio.currentTime = curTime.value;
    audio.play();
  };

  speaker.onclick = function () {
    if (volume.value == 0) {
      volume.value = 10;
      audio.volume = 1;
    } else {
      volume.value = 0;
      audio.volume = 0;
    }
  };

  playBtn.addEventListener("click", (a) => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      playBtn.innerHTML = "►";
    } else {
      audio.play();
      isPlaying = true;
      playBtn.innerHTML = "❚❚";
    }
  });
});
