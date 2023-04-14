var count=1;

function changeBackground() {
  if(count >= 12){
    count = 1;
  }else{
    count ++;
  }
  document.body.background = "img/"+ count +".jpg"
}
