//録音したテキストデータ
let recText = "";

//=====================================
/**  音声認識の設定
 * 参考:[https://qiita.com/hmmrjn/items/4b77a86030ed0071f548]
 */
//=====================================
//GooclechromeとFirefoxに対応
const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "ja-JP"; //言語指定：日本語
recognition.interimResults = true; //認識途中のデータ取得
recognition.continuous = true; //認識し続ける


//既に終わった会話のまとめ
let talkResult = ""; 
let talkCount = 0;
recognition.onresult = event => {
	let currentTalk = "";
	for (
		let eventi = event.resultIndex;
		eventi < event.results.length;
		eventi++
	) {
		//DOM用に会話をパース
		let talkParse = '<p class="talk-section ';
		talkParse += talkCount % 2 == 0 ? "left" : "right"; //偶数は左寄り、奇数は右寄りにする
		talkParse += '">';
		talkParse += event.results[eventi][0].transcript + "</p>"; //DOM向けにパースしたもの

		if (event.results[eventi].isFinal) {
			//会話が終了していたら会話を記録
			recText += event.results[eventi][0].transcript +"。";
			talkResult = talkParse + talkResult;
			talkCount++;
		} else {
			//途中なら会話の経過を変数に記録
			currentTalk = talkParse;
		}
	}
	//DOMに反映
	document.getElementById("rec_text").innerHTML = currentTalk + talkResult;
};



//=====================================
//以下、DOM系統
//=====================================
//cssの".active"を付与する場合
const activeClass = "active";


// RECボタンの設定
const recBt = document.getElementById("rec_bt");
const recState = document.getElementById("rec_state_text");
recState.innerText = "会話準備完了";
recBt.addEventListener("click", function() {
	//押されていなかった場合(デフォルト)
	if (!recBt.classList.contains(activeClass)) {
		//録音開始
		recBt.classList.add(activeClass);
		recognition.start();
		recState.innerText = "会話中";
		//開始時間の取得
		startShowing();
		// startTime();
	}

	//押されていた場合
	else {
		//会話終了
		recBt.classList.remove(activeClass);
		recognition.stop();
		recState.innerText = "会話準備完了";
		//終了時間の取得
		stopShowing();
		// stopTime();
	}
});