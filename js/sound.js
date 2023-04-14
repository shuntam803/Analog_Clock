var muteflag = true;
var defaultaudio = new Audio("sound/menso-re.mp3"); // 毎時0分の音源を指定
var alarmaudio = new Audio("sound/cuckoo.mp3"); //アラーム音源の指定
alarmaudio.loop = true;
defaultaudio.muted = true;
alarmaudio.muted = true;


function PlayAudio() {
    console.log("再生")
    defaultaudio.play();
}

function StopAudio() {
    console.log("停止")
    defaultaudio.pause();
    defaultaudio.currentTime = 0;
}

function AlarmStart(){
    console.log("警告音")
    alarmaudio.play();
    alarmcolor();
}

function Alarmstop(){
    alarmaudio.pause();
    defaultcolor();
    alarmaudio.currentTime = 0;
}

function MuteAudio() {
    
    if(muteflag){
        console.log("ミュート解除")
        muteflag = false
        defaultaudio.muted = false;
        alarmaudio.muted = false;
    }else{
        console.log("ミュート")
        muteflag = true
        defaultaudio.muted = true;
        alarmaudio.muted = true;
    }
}
