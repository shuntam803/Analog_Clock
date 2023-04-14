// ドキュメントからHTML要素を取得する
const time = document.querySelector('.current-time');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const buttonSetAlarm = document.querySelector('.set-alarm');

// アラームの設定
let alarmElement;
let activeAlarm = false;
var timeout;

// 現在時刻を表示する関数
const currentTime = function(){
    // 現在の日付と時刻を取得する
    const date = new Date();
    const now = date.toLocaleTimeString('ja-JP');

    // 現在時刻をHTMLに表示する
    time.textContent = now;

    // 1秒後に再度この関数を実行する
    setTimeout(currentTime, 1000);

    // アラームが設定されている場合、現在時刻とアラーム時刻を比較して、アラームを鳴らす
    if(now === alarmElement){
        console.log("アラーム再生")
        AlarmStart();
        timeout = window.setTimeout(ButtonPutBack, 60000)
    }
};
currentTime();

// 時、分のプルダウンを作成する関数
const addHours = function(id){
    const select = id;
    const hour = 23;

    for(let i = 0; i <= hour; i++){
        select.options[select.options.length] = new Option(i < 10 ? '0' + i : i);
    }
};
addHours(hours);

const addMinutes = function(id){
    const select = id;
    const minute = 59;

    for(let i = 0; i <= minute; i++){
        select.options[select.options.length] = new Option(i < 10 ? '0' + i : i);
    }
};
addMinutes(minutes);

// 「Set Alarm」ボタンをクリックした時の処理
buttonSetAlarm.addEventListener('click', ()=>{
    if(activeAlarm === false){ // アラームが設定されていない場合
        hours.disabled = true;
        minutes.disabled = true;

        buttonSetAlarm.textContent = 'Dismiss';
        buttonSetAlarm.style.backgroundColor = 'rgb(255, 30, 30)';

        alarmElement = `${hours.value}:${minutes.value}:00`;
        activeAlarm = true;
    }

    else{ // アラームが設定されている場合
        ButtonPutBack();
    }
});

function ButtonPutBack(){
    hours.disabled = false;
        minutes.disabled = false;

        buttonSetAlarm.textContent = 'Set Alarm';
        buttonSetAlarm.style.backgroundColor = 'rgb(255, 255, 255)';

        alarmElement = '';
        activeAlarm = false;
        clearInterval(timeout);
        Alarmstop(); // アラームを止める;
}