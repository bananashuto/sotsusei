
var PassSec;   // 秒数カウント用変数

// 繰り返し処理の中身
function showPassage() {
   PassSec++;   // カウントアップ
//    var msg = "ボタンを押してから " + PassSec + "秒が経過しました。";   // 表示文作成
   document.getElementById("PassageArea").innerHTML = msg;   // 表示更新
}
 

// 繰り返し処理の開始
function startShowing() {
   PassSec = 0;   // カウンタのリセット
   PassageID = setInterval('showPassage()',1000);   // タイマーをセット(1000ms間隔)
}
 
// 繰り返し処理の中止
function stopShowing() {
   clearInterval( PassageID );   // タイマーのクリア
   var num = PassSec;
//    var timeD = Math.floor(num / (24 * 60 * 60));
   var timeH = Math.floor(num % (24 * 60 * 60) / (60 * 60));
   var timeM = Math.floor(num % (24 * 60 * 60) % (60 * 60) / 60);
   var timeS = num % (24 * 60 * 60) % (60 * 60) % 60;
   var timeDMS =  timeM + '分' ;

   console.log(timeDMS);
   $("#PassageArea").html(timeDMS);

}



// //関数
// function  startTime(){
//     let now = new Date();      
//     let h = now.getHours();        
// 	let m = now.getMinutes();  
// 	let s = now.getSeconds();
// 	// let ms = now.getMilliseconds();         
//     let starttime = h+":"+m+":"+s;
// $("#starttest").append(starttime);
// }

// function  stopTime(){
//     let now = new Date();      
//     let h = now.getHours();        
// 	let m = now.getMinutes();  
// 	let s = now.getSeconds();
// 	// let ms = now.getMilliseconds();         
//     let stoptime = h+":"+m+":"+s;
// console.log(stoptime);
// $("#stoptest").append(stoptime);
// }