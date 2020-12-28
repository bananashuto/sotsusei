//=====================================
//以下、COTOHA APIへのリクエスト処理
//=====================================
//Tokenを取得するためのHTTPリクエスト
const apikeyXhr = new XMLHttpRequest();
function requestAPIKey() {
	apikeyXhr.open("POST", "https://api.ce-cotoha.com/v1/oauth/accesstokens");
	apikeyXhr.setRequestHeader("Content-Type", "application/json");
	let requestJson = {};
    requestJson.grantType = "client_credentials";
    //COTOHA ID記入
	requestJson.clientId = "QX3Ai1OBaBQ3RCAPDwFsFrGH6fIXAeva"; 
    requestJson.clientSecret = "Ns2NwXG2CwEhAPrY"; 
	apikeyXhr.send(JSON.stringify(requestJson));
}


apikeyXhr.onreadystatechange = function() {
	//レスポンス取得完了後
	if (this.readyState == 4) {
		const responseResult = JSON.parse(apikeyXhr.responseText || false);
		{
			//responseが正常ならば
			if (responseResult != false) {
				requestAnalisys(responseResult.access_token);
			}
		}
	}
};



//=====================================
//感情分析するためのHTTPリクエスト
//=====================================
const analisysXhr = new XMLHttpRequest();

function requestAnalisys(token) {
	analisysXhr.open(
		"POST",
		"https://api.ce-cotoha.com/api/dev/nlp/v1/sentiment"
	);
	analisysXhr.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8"
	);
	analisysXhr.setRequestHeader("Authorization", "Bearer " + token);
	let requestJson = {};
	requestJson.sentence = recText;//録音したテキストを送信
	analisysXhr.send(JSON.stringify(requestJson));
}


//レスポンスが返ってきたら
analisysXhr.onreadystatechange = function() {
	if (this.readyState == 4) {
		const responseResult = JSON.parse(analisysXhr.responseText || false);
		if (responseResult != false) {
			console.log(responseResult);
			createDiagResult(
				responseResult.result.sentiment,
				responseResult.result.score,
				responseResult.result.emotional_phrase
			);
		}
	}
};





