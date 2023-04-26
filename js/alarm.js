// HTML要素を取得する
const time = document.querySelector(".current-time");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const buttonSetAlarm = document.querySelector(".set-alarm");

// アラームの設定
let alarmElement;
let activeAlarm = false;
var timeout;

// 現在時刻を表示する関数
const currentTime = function () {
  const date = new Date();
  const now = date.toLocaleTimeString("ja-JP");

  // 現在時刻をHTMLに表示する
  time.textContent = now;

  // アラームが設定されている場合、現在時刻とアラーム時刻を比較して、アラームを鳴らす
  if (now === alarmElement) {
    console.log("アラーム再生");
    showStopButton(); // 追加
    startVibration(); // 追加
    playAlarmSound();

    timeout = window.setTimeout(() => {
      ButtonPutBack();
      removeStopButton(); // 追加
    }, 60000);
  }
  setTimeout(currentTime, 1000);
};
currentTime();

// 時、分のプルダウンを作成する関数
const addHours = function (id) {
  const select = id;
  const hour = 23;
  const now = new Date();
  const currentHour = now.getHours();

  for (let i = 0; i <= hour; i++) {
    const option = new Option(i < 10 ? "0" + i : i);
    if (i === currentHour) {
      option.selected = true;
    }
    select.options[select.options.length] = option;
  }
};
addHours(hours);

const addMinutes = function (id) {
  const select = id;
  const minute = 59;
  const now = new Date();
  const currentMinute = now.getMinutes();

  for (let i = 0; i <= minute; i++) {
    const option = new Option(i < 10 ? "0" + i : i);
    if (i === currentMinute) {
      option.selected = true;
    }
    select.options[select.options.length] = option;
  }
};
addMinutes(minutes);


// セットボタンをクリックした時の処理
buttonSetAlarm.addEventListener("click", () => {
  if (activeAlarm === false) {
    // アラームが設定されていない場合
    hours.disabled = true;
    minutes.disabled = true;

    buttonSetAlarm.textContent = "解除";
    buttonSetAlarm.style.backgroundColor = "rgb(255, 30, 30)";

    alarmElement = `${hours.value}:${minutes.value}:00`;
    activeAlarm = true;
  } else {
    // アラームが設定されている場合
    ButtonPutBack();
  }
});

function ButtonPutBack() {
  hours.disabled = false;
  minutes.disabled = false;

  buttonSetAlarm.textContent = "セット";
  buttonSetAlarm.style.backgroundColor = "rgb(255, 255, 255)";

  alarmElement = "";
  activeAlarm = false;
  clearInterval(timeout);
  stopAlarmSound(); // アラームを止める;
  removeStopButton(); // 追加
}

const stopButton = document.getElementById("stopButton");
let intervalId;

// アラームが鳴ったらボタンを表示する
function showStopButton() {
  stopButton.style.display = "block";
}

// 停止ボタンを0.7秒かけてゆっくりと削除する
function removeStopButton() {
  stopButton.classList.add("fadeOut");
  clearInterval(intervalId);

  setTimeout(() => {
    if (stopButton.parentNode) {
      stopButton.parentNode.removeChild(stopButton);
    }
  }, 700);
}

// ボタンの振動とインターバルを開始する
function startVibration() {
  intervalId = setInterval(() => {
    // ボタンがクリックされた場合はボタンを消す
    stopButton.addEventListener(
      "click",
      function () {
        removeStopButton();
        stopAlarmSound();
      },
      { once: true }
    );

    // ボタンを振動させる
    stopButton.classList.toggle("vibrate");
  }, 1000);
}
