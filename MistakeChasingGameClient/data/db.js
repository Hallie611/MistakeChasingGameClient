/// <reference path="../js/jquery-1.9.1.min.js" />
/// <reference path="../js/knockout-2.2.1.js" />
/// <reference path="../js/dx.all.js" />

(function () {

    // Data for find bug questions
    var findbugs = [

        { id: 1, src: "images/findbugQ/P1.jpg", dif: 2, width: "9%", height: "5%", top: "9%", left: "42%" },
        { id: 2, src: "images/findbugQ/P2.jpg", dif: 1, width: "5%", height: "5%", top: "12% ", left: "9%" },
        { id: 3, src: "images/findbugQ/P3.jpg", dif: 2, width: "5% ", height: "5%", top: "11% ", left: "31%" },
        { id: 4, src: "images/findbugQ/P4.jpg", dif: 1, width: "5%", height: "5%", top: "2%", left: "20%" },
        { id: 5, src: "images/findbugQ/P5.jpg", dif: 3, width: "7%", height: "5%", top: "10%", left: "13%" },
        { id: 6, src: "images/findbugQ/P6.jpg", dif: 2, width: "10%", height: "5%", top: "7%", left: "19%" },
        { id: 7, src: "images/findbugQ/P7.jpg", dif: 1, width: "11%", height: "5%", top: "11%", left: "59%" },
        { id: 8, src: "images/findbugQ/P8.jpg", dif: 1, width: "5%", height: "5%", top: "22%", left: "54%" },
        { id: 9, src: "images/findbugQ/P9.jpg", dif: 3, width: "12%", height: "5%", top: "24%", left: "16%" },
        { id: 10, src: "images/findbugQ/P10.jpg", dif: 3, width: "12%", height: "5%", top: "10%", left: "19%" }
    ]

    // Data for filling blank questions
    var fillingblank = [
        { id: 1, src: "images/roadmap.jpg", dif: 1, a: "asd", b: "lkjhg" }
    ]

    // Data for multiple choices questions
    var multiplechoice = [
        { id: 1, src: "images/lvBtn.png", dif: 1, ans: "qwertyui" }
    ]

    MistakeChasingGameClient.db = {

        findbugs: findbugs,
        fillingblank: fillingblank,
        multiplechoice: multiplechoice

    };
})();