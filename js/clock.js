var OuterCircleColor = "rgb(255,255,255)";
var ClockInnerColor="rgb(246,168,46)";
var HoerPinColor="rgb(0, 0, 0)";
var MinutePinColor="rgb(0, 0, 0)";
var SecondsPinColor="rgb(246,168,46)";
var SenterColor="rgb(255,255,255)"

function Change_clock_color(presetnumber){
  switch(presetnumber){
    case 0:
      ClockInnerColor="rgb(255, 190, 190)";
      SecondsPinColor="rgb(255, 190, 190)";
      break;
    case 1:
      ClockInnerColor="rgb(190,230,190)";
      SecondsPinColor="rgb(190,230,190)";
      break;
    case 2:
      ClockInnerColor="rgb(246,168,46)";
      SecondsPinColor="rgb(246,168,46)";
      break;
    case 3:
      ClockInnerColor="rgb(200, 255, 255)";
      SecondsPinColor="rgb(120, 255, 255)";
      break;
  }
}

function alarmcolor(){
  SenterColor = "rgb(255, 0, 0)";
  OuterCircleColor = "rgb(255, 0, 0)";
}

function defaultcolor(){
  SenterColor = "rgb(255, 255, 255)";
  OuterCircleColor = "rgb(255,255,255)";
}

// ページ読み込み時に init関数を実行
window.onload = function () {
  init();
};

// clock関数を１秒周期で繰り返す
function init() {
  clock();
  setInterval("clock();", 1000);
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
  ctx.strokeStyle = OuterCircleColor;
  ctx.lineWidth = 3;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#000";
  ctx.translate(center.x, center.y);
  /* グラデーション領域をセット */
  // translateで座標を移動しているためグラデーションの始終を調整
  var grad = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
  /* グラデーション終点のオフセットと色をセット */
  grad.addColorStop(0, ClockInnerColor);
  grad.addColorStop(0.5, ClockInnerColor);
  grad.addColorStop(0.9, ClockInnerColor);
  grad.addColorStop(1, ClockInnerColor);
  /* グラデーションをfillStyleプロパティにセット */
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, w / 2 - 5, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.stroke();
  /* circle white */
  ctx.beginPath();
  ctx.arc(0, 0, 100, 0, Math.PI * 2, false);
  ctx.fillStyle = SenterColor;
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
  ctx.shadowColor = "#FFF";
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
  ctx.strokeStyle = "#CCC";
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
  ctx.strokeStyle = "#999";
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
  ctx.fillStyle = "#999";

  // 短針
  ctx.save();
  ctx.rotate(
    hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.lineWidth = 8;
  ctx.strokeStyle = HoerPinColor;
  ctx.shadowBlur = 5;
  ctx.shadowColor = "#666";
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
  ctx.strokeStyle = MinutePinColor;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#999";
  ctx.beginPath();
  ctx.moveTo(-2, 25);
  ctx.lineTo(0, -105);
  ctx.lineTo(2, 25);
  ctx.stroke();
  ctx.restore();

  // 秒針
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = SecondsPinColor;
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
  ctx.strokeStyle = SecondsPinColor;
  ctx.fillStyle = SecondsPinColor;
  ctx.arc(0, 0, 7, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

}

