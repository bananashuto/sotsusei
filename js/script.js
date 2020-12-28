
//=====================================
//感情分析  (感情の分類と点数からDOMの表示を変更する)
//=====================================
/**
 * @param {String} category 感情の分類 positive/negatibe/neutralの三分類
 * @param {Float32Array} point 点数(小数点)
 */

function createDiagResult(category, point, phraseArray) {
	//各点数と感情の分類に適したアドバイス
	//感情の分類[Positive/Negative/Neutral]をキーにする
	//点数による分類は20点ごとの5段階(各[0,20,40,60,80]以上かどうか)
	let advice = {
		Positive: [
			"会話に多少盛り上がりが見えます。ですが、まだまだ距離は遠いようです。もっと自分に素直に発言してみるといいかもしれません",
			"会話に盛り上がりがしっかりと見れます！気になるあの子と距離は近いです。あと一歩！",
			"会話になかなかの盛り上がりが見えます。気になるあの子との距離がかなり近いです！",
			"かなり会話が盛り上がっており、かなり近い距離にあります！素晴らしい！",
			"会話の盛り上がりが素晴らしいです！心の距離はもはやとなり合わせといっても過言ではないでしょう！"
		],
		Neutral: [
			"会話にあまり盛り上がりが見えず、業務連絡のようになってしまっていますね...。",
			"会話に心がないように思えます。もっと相手が楽しくなるような話題を積極的に振ってみましょう！",
			"会話への感情移入があまりなく、とても残念です。相手に合わせて話題を振ってみましょう。",
			"もっと自分を開放していいように感じます。趣味などの話を恐れずにだして相手の警戒心を解くことを心がけましょう。",
			"会話の内容が普通すぎて、測定が不可能です...。"
		],
		Negative: [
			"ちょっと改善したほうがいいかもしれないです。会話においてマイナスとなる部分が少し見られます。",
			"このままだと嫌われかねないです！もっと相手の事を考えて発言してみましょう。",
			"もしかしたら相手に嫌われているかもしれません。距離を自分から少しとってみてはいかがでしょうか。",
			"むしろ嫌われに行ってるのではと疑っているほど会話からマイナスの感情が伺えました。",
			"率直に申し上げますと...気になるあの子はあきらめた方がいいかもしれません...。"
		]
	};

	let pi = 4; //5段階目から始まる(配列の関係により5-1である4)
	for (let pointi = 1.0; pointi > 0.0; pointi -= 0.2) {
		//解析結果のpointが分類に当てはまれば、点数による分類添え字(pi)を決定
		//ダメなら段階を一つ下げる
		if (point > pointi) {
			break;
		}
		pi--;
	}

	// カテゴリー分けと点数から結果の画像と分類を決定
	let imgNum = null;
	let parseCategory = "";
	switch (category) {
		case "Positive":
			parseCategory = "いい感じ！";
			if (point >= 0.8) {
				imgNum = 1;
			} else if (point >= 0.6) {
				imgNum = 2;
			} else {
				imgNum = 3;
			}
			break;
		case "Neutral":
			parseCategory = "微妙かな";
			imgNum = 4;
			break;
		case "Negative":
			parseCategory = "うーん...";
			imgNum = 5;
			break;
	}



	//感情にまつわる配列を表示用にパース
	let parsePhraseArray = [];
	for (let pi = 0; pi < phraseArray.length; pi++) {
		parsePhraseArray.push(phraseArray[pi].form);
	}


	/*アドバイスをDOMに反映*/
	//
	document.getElementById("result_img").src = "img/grade/" + imgNum + ".png";
	document.getElementById("result_category").innerText = parseCategory;
	document.getElementById("result_point").innerText =
		parseCategory + "度：" + Math.round(point * 100) + "点";
	document.getElementById("result_advice").innerText = advice[category][pi];
	document.getElementById("result_phrase").innerText =
		"抽出された感情にまつわる単語:" + parsePhraseArray.join(" , ");
	//デフォルト文を消し、結果文を表示
	document.getElementById("result_default").classList.add("exit-erase");
	document.getElementById("result_response").classList.remove("exit-erase");
}





const diagnoseBt = document.getElementById("diagnose_bt");
// const clientId = document.getElementById("client_id");
// const clientSecret = document.getElementById("client_secret");
const clientId = "QX3Ai1OBaBQ3RCAPDwFsFrGH6fIXAeva";
const clientSecret = "Ns2NwXG2CwEhAPrY";

const diagAtention = document.getElementById("diag_caution");



//ボタンにPOSTのイベントリスナーを付与
diagnoseBt.addEventListener("click", function() {
	if (recText != "") {
		requestAPIKey();
		diagAtention.classList.add("after-materialize");
	} else {
		diagAtention.classList.remove("after-materialize");
	}
});

document
	.getElementById("one_more_game_bt")
	.addEventListener("click", function() {
		location.reload();
		scrollTo(0, 0);
	});














