let isMuted = true;
const hourlySound = new Audio("sound/menso-re.mp3"); // 毎時0分の音源を指定
const alarmSound = new Audio("sound/cuckoo.mp3"); //アラーム音源の指定
alarmSound.loop = true;
hourlySound.muted = true;
alarmSound.muted = true;

function playHourlySound() {
  console.log("毎時0分の音源再生");
  hourlySound.play();
}

function stopHourlySound() {
  console.log("毎時0分の音源停止");
  hourlySound.pause();
  hourlySound.currentTime = 0;
}

function playAlarmSound() {
  console.log("アラーム音源再生");
  alarmSound.play();
  alarmColor();
}

function stopAlarmSound() {
  console.log("アラーム音源再生");
  alarmSound.pause();
  defaultColor();
  alarmSound.currentTime = 0;
}

function clickMute() {
  const onIcon = document.querySelector(".on-icon");
  const offIcon = document.querySelector(".off-icon");

  isMuted = !isMuted;
  hourlySound.muted = isMuted;
  alarmSound.muted = isMuted;

  onIcon.classList.toggle("d-none");
  offIcon.classList.toggle("d-none");

  console.log(isMuted ? "ミュート" : "ミュート解除");
}
