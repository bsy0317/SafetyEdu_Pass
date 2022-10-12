// ==UserScript==
// @name         SafetyEdu_AutoClick
// @namespace    http://www.safetyedu.org/
// @version      0.1
// @description  연구실 안전교육 자동클릭
// @author       BaeSeoyeon(bsy0317)
// @match        http://www.safetyedu.org/Contents/IMGT*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=safetyedu.org
// @grant        none
// ==/UserScript==
(function() {
    /*Confrim, Alert 함수의 반환값이 항상 true -> 자동확인*/
    var realConfirm = window.confirm;
    var realAlert = window.alert;
    window.confirm = function() {
        window.confirm = realConfirm;
        return true;
    };
    window.alert = function() {
        window.alert = realAlert;
        return true;
    };
    /*END*/

    /*비동기 대기 함수*/
    function sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec * 1000));
    }
    /*END*/


    async function click_next() {
        var nowTime = new Date().getTime();
        var gapTime = parseInt((nowTime - prevTime) / 1000);
        console.log("Now_gapTime:" + gapTime);
        console.log("Complete_gapTime:" + Math.floor(duration));
        if (gapTime >= Math.floor(duration)) {
            await sleep(3);		//데이터 전송까지 잠시 대기
            let event = new Event("mousedown");
            this.nextPageBtn.dispatchEvent(event);
        }
    }

    setInterval(function timeout() {
        click_next();
    }, 200);
})();