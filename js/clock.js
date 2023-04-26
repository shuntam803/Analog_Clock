const colors = {
  outerCircle: "rgb(255, 255, 255)",
  innerCircle: "rgb(255, 255, 255)",
  clockInner: "rgb(246, 168, 46)",
  hourPin: "rgb(0, 0, 0)",
  minutePin: "rgb(0, 0, 0)",
  secondsPin: "rgb(246, 168, 46)",
  
};

function changeClockColor(presetNumber) {
  switch (presetNumber) {
    case 0:
      colors.clockInner = "rgb(255, 190, 190)";
      colors.secondsPin = "rgb(255, 190, 190)";
      break;
    case 1:
      colors.clockInner = "rgb(190, 230, 190)";
      colors.secondsPin = "rgb(190, 230, 190)";
      break;
    case 2:
      colors.clockInner = "rgb(246, 168, 46)";
      colors.secondsPin = "rgb(246, 168, 46)";
      break;
    case 3:
      colors.clockInner = "rgb(200, 255, 255)";
      colors.secondsPin = "rgb(120, 255, 255)";
      break;
    default:
      defaultColor();
  }
}

function alarmColor() {
  colors.innerCircle = "rgb(255, 0, 0)";
  colors.outerCircle = "rgb(255, 0, 0)";  
  // 追加
  // const stopButton = document.getElementById("stopButton");
  // stopButton.style.backgroundColor = "rgb(255, 0, 0)";
}

function defaultColor() {
  colors.innerCircle = "rgb(255, 255, 255)";
  colors.outerCircle = "rgb(255, 255, 255)";
  // 追加
  // const stopButton = document.getElementById("stopButton");
  // stopButton.style.backgroundColor = "rgb(255, 255, 255)";
  // stopButton.style.display = "none";
}

// ページ読み込み時に init関数を実行
window.onload = function () {
  init();
};

// clock関数を１秒周期で繰り返す
function init() {
  clock();
  setInterval("clock();", 1000);
  // if (/* アラームが鳴った場合 */) {
  //   const stopButton = document.getElementById("stopButton");
  //   stopButton.style.display = "block";
  //   stopButton.addEventListener("click", function () {
  //     /* 停止ボタンがクリックされた場合の処理 */
  //   });
  // }
}

// clock関数 start
function clock() {
  var now = new Date();
  var canvas = document.getElementById("clockid");
  var ctx = canvas.getContext("2d");
  ctx.save();

  // 各種設定
  canvas.width = 320;
  canvas.height = 320;
  var w = canvas.width;
  var h = canvas.height;
  var center = { x: w / 2, y: h / 2 };
  // 文字盤の数字の中心までの半径(canvas の半分より少し小さく)
  var rads = (w / 2) * 0.78;

  ctx.clearRect(0, 0, w, h);

  // 時計の外側の丸
  ctx.save();
  ctx.strokeStyle = colors.outerCircle;
  ctx.lineWidth = 3;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgb(0, 0, 0)";
  ctx.translate(center.x, center.y);
  /* グラデーション領域をセット */
  // translateで座標を移動しているためグラデーションの始終を調整
  var grad = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
  /* グラデーション終点のオフセットと色をセット */
  grad.addColorStop(0, colors.clockInner);
  grad.addColorStop(0.5, colors.clockInner);
  grad.addColorStop(0.9, colors.clockInner);
  grad.addColorStop(1, colors.clockInner);
  /* グラデーションをfillStyleプロパティにセット */
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, w / 2 - 5, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.stroke();
  /* circle white */
  ctx.beginPath();
  ctx.arc(0, 0, 100, 0, Math.PI * 2, false);
  ctx.fillStyle = colors.innerCircle;
  ctx.fill();

  ctx.restore();

  // 文字盤
  ctx.save();
  // ctx.font = "30px 'sans-serif'";
  ctx.font = "30px 'Segoe Print'";
  // ctx.font = "30px 'Impact'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.shadowBlur = 5;
  ctx.shadowColor = "rgb(255, 255, 255)";
  for (var i = 0; i < 12; i++) {
    var radian = (i * Math.PI) / 6;
    var x = center.x + rads * Math.sin(radian);
    var y = center.y - rads * Math.cos(radian);
    var text = "" + (i == 0 ? "12" : i);
    ctx.fillText(text, x, y);
  }
  ctx.restore();

  //  中心を移動
  ctx.translate(center.x, center.y);

  // 分
  ctx.save();
  ctx.strokeStyle = "rgb(204, 204, 204)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (var i = 0; i < 60; i++) {
    if (i % 5 != 0) {
      ctx.moveTo(100, 0);
      ctx.lineTo(95, 0);
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.stroke();

  // 時間
  ctx.strokeStyle = "rgb(153, 153, 153)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (var i = 0; i < 60; i++) {
    ctx.moveTo(100, 0);
    ctx.lineTo(90, 0);
    ctx.rotate(Math.PI / 6);
  }
  ctx.stroke();
  ctx.restore();

  // 針の設定
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr = now.getHours();
  hr = hr >= 12 ? hr - 12 : hr; // 12以上なら「hr-12」、それ以外なら「hr」
  ctx.fillStyle = "rgb(153, 153, 153)";

  // 短針
  ctx.save();
  ctx.rotate(
    hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.lineWidth = 8;
  ctx.strokeStyle = colors.hourPin;
  ctx.shadowBlur = 5;
  ctx.shadowColor = "rgb(102, 102, 102)";
  ctx.beginPath();
  ctx.moveTo(-3, 25);
  ctx.lineTo(0, -70);
  ctx.lineTo(3, 25);
  ctx.stroke();
  ctx.restore();

  // 長針
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 4;
  ctx.strokeStyle = colors.minutePin;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgb(102, 102, 102)";
  ctx.beginPath();
  ctx.moveTo(-2, 25);
  ctx.lineTo(0, -105);
  ctx.lineTo(2, 25);
  ctx.stroke();
  ctx.restore();

  // 秒針
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = colors.secondsPin;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 30);
  ctx.lineTo(0, -100);
  ctx.stroke();
  ctx.restore();

  // 時計の中心の丸
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = colors.secondsPin;
  ctx.fillStyle = colors.secondsPin;
  ctx.arc(0, 0, 7, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
  // アラームが鳴った場合は、中心の丸にクラスを追加して、アニメーションを開始する
  // if (true) {
  //   const centerCircle = document.querySelector(".center-circle");
  //   centerCircle.classList.add("vibrate");
  //   centerCircle.classList.remove("center-circle");
  // }
}