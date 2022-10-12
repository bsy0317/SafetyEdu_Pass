// ==UserScript==
// @name         SafetyEdu_AutoClick
// @namespace    http://www.safetyedu.org/
// @version      0.1
// @description  연구실 안전교육 자동클릭
// @author       BaeSeoyeon(bsy0317)
// @match        http://www.safetyedu.org/Contents/IMGT2019/*
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


    function click_next() {
        var nowTime = new Date().getTime();
        var gapTime = parseInt((nowTime - prevTime) / 1000);
        console.log("Now_gapTime:" + gapTime);
        console.log("Complete_gapTime:" + Math.floor(duration));
        if (gapTime >= Math.floor(duration)) {
            let event = new Event("mousedown");
            this.nextPageBtn.dispatchEvent(event);
        }
    }

    setInterval(function timeout() {
        click_next();
    }, 200);
})();