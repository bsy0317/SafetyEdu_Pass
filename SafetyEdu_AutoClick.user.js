// ==UserScript==
// @name         SafetyEdu_AutoClick
// @namespace    http://www.safetyedu.org/
// @version      1.0
// @description  연구실 안전교육 자동클릭
// @author       배서연(bsy0317)
// @match        *://safety.kw.ac.kr/Contents/IMGT*
// @match        *://safety.hs.ac.kr/Contents/IMGT*
// @match        *://www.safetyedu.org/Contents/IMGT*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=safetyedu.org
// @grant        none
// ==/UserScript==
(function() {
    var quizOk = false;
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

    /*퀴즈 선택 폼*/
    async function check_quiz(){
        var isQuiz = chapterInfo[this.nowPageNum-1].script[0].indexOf('퀴즈') == -1 ? false:true;
        if(isQuiz && !quizOk){
            var quizAll = document.querySelectorAll(".quiz");
            totalQCnt = quizAll.length; // 전체 문항수
            for (var i=0; i<quizAll.length; i++) {
                initQuiz(quizAll[i]);
                var quizStartBtn = document.querySelector(".quizStartBtn");
                quizStartBtn.dispatchEvent(new Event("click"));
                this.checkValue = document.querySelectorAll('div.quiz')[0].attributes[1].value;
                document.querySelectorAll('.correctBtn')[0].dispatchEvent(new Event("click"));
                document.querySelectorAll('.nextQuizBtn')[0].dispatchEvent(new Event("click"));
            }
            quizOk = isQuiz;
            await sleep(10);		//데이터 전송까지 잠시 대기
        }
    }
    /*END*/

    async function click_next() {
        var nowTime = new Date().getTime();
        var pTime = document.querySelector("#footer > div > div.timeDiv > div.dTime").innerText.split(':');
        var prevTime = new Date().setHours(pTime[0]);
        prevTime = new Date(prevTime).setMinutes(pTime[1]);
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
        check_quiz();
        click_next();
    }, 200);
})();