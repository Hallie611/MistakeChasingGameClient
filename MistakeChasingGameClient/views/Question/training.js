MistakeChasingGameClient.training = function (params) {

    trainingViewModel = new MistakeChasingGameClient.QuestionVM(params.id);
    trainingClock = new MistakeChasingGameClient.ClockVM("");
    curPoints = ko.observable();
    button = {
        text: ko.observable(),
        action: ko.observable()
    };
    resultList = ko.observable();
    isClick = ko.observable(false);

    var countX = 0;
    myEventHandler = function () {
        countX += 1;
        var showX = document.getElementById("miss" + countX);
        showX.style.visibility = "visible";
        if (countX >= 3) {
            countX = 0;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            trainingViewModel.loadQuestion();
        }
    };

    showBug = function () {
        countX = 0;
        var points = trainingViewModel.bugFound();
        localStorage.currentPoint = Number(localStorage.currentPoint) + points;
        localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
        $("#toastContainer").dxToast('instance').show();
    };
    processHiding = function () {
        trainingViewModel.loadQuestion();
    };
    processHidingPopup = function () {
        if (!isClick()) {
            localStorage.currentIndex = 1;
            localStorage.currentPoint = 0;
            MistakeChasingGameClient.app.navigate('home', { root: true });
        }        
    };

    submitFBK = function () {
        var points = trainingViewModel.submitBlanks();
        localStorage.currentPoint = Number(localStorage.currentPoint) + points;
        localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
        trainingViewModel.loadQuestion();
    };

    submitSC = function () {
        var points = trainingViewModel.submitChoice();
        localStorage.currentPoint = Number(localStorage.currentPoint) + points;
        localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
        showEndDialog();
    };
    //////////////////
    function showEndDialog() {
        isClick(false);
        //$('#resultPopup').dxPopup('instance').beginUpdate();
        countX = 0;
        curPoints(localStorage.currentPoint);
        resultList(trainingViewModel.listQ);
        localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
        var isPassed = trainingViewModel.checkPassed();
        trainingClock.clearClock();

        if (isPassed) {
            button.text("Next Level");
            button.action(next);
        }
        else {
            button.text("Try Again");
            button.action(tryAgain);
        }
        //$('#resultPopup').dxPopup('instance').endUpdate();
        $('#resultPopup').dxPopup('instance').show();
    };

    function tryAgain() {
        isClick(true);
        $('#resultPopup').dxPopup('instance').hide();
        localStorage.currentIndex = 1;
        localStorage.currentPoint = 0;
        localStorage.currentlevel = localStorage.currentlevel;
        trainingViewModel.randomQuestion();
        trainingViewModel.loadQuestion();
        trainingClock.setClock();
    };

    function next() {
        isClick(true);
        $('#resultPopup').dxPopup('instance').hide();
        localStorage.currentIndex = 1;
        //localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
        localStorage.currentPoint = 0;
        var nextLevel = Number(localStorage.currentlevel) + 1;
        localStorage.currentlevel = nextLevel;
        trainingViewModel.randomQuestion();
        trainingViewModel.loadQuestion();
        trainingClock.setClock();
    };

    backToHome = function () {
        isClick(true);
        $('#resultPopup').dxPopup('instance').hide();
        localStorage.currentIndex = 1;
        //localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
        localStorage.currentPoint = 0;
        localStorage.currentlevel = 0;
        MistakeChasingGameClient.app.navigate('home', { root: true });
    };

    var timeUp = ko.computed(function () {
        if (trainingClock.timeUp()) {
            trainingClock.timeUp(false);
            var points = trainingViewModel.timeUp();
            showEndDialog();
        }
    });

    return $.extend(trainingViewModel, {
        viewShown: function () {
            //goi ham load cau hoi len dua theo id truyen qua
            trainingViewModel.randomQuestion();
            trainingViewModel.loadQuestion();
            trainingClock.setClock();
        }
    });
};

//    function findLayout(name) {
//        var currentPlatform = DevExpress.devices.current().platform;
//        var result = $.grep(DevExpress.framework.html.layoutControllers, function (item, index) {
//            return (item.navigationType == name && item.platform == currentPlatform);
//        });
//        return result.length ? result[0].controller : null;
//    };
//    var controller = findLayout('slideout');
//    if (controller)
//        controller.navButtonItem.hide();

////////////////////////////////////
// variables for time units
//    txMinutes = ko.observable("");
//    txSeconds = ko.observable("");
//    restarttrainingClock = ko.observable(true);
//    time = ko.computed(function () {
//        return txMinutes() + " : " + txSeconds();
//    }, this);

//    //seconds, minutes;
//    function checkTime(i) {
//        if (i < 10) {
//            i = "0" + i;
//        }
//        return i;
//    };
//    function runtrainingClock() {
//        if (restarttrainingClock()) {
//            if (Number(localStorage.maxIndex) == 3) {
//                seconds = 0;
//                minutes = 3;
//            }
//            else if (Number(localStorage.maxIndex) == 4) {
//                seconds = 0;
//                minutes = 4;
//            }
//            else if (Number(localStorage.maxIndex) == 5) {
//                seconds = 0;
//                minutes = 5;
//            }
//            restarttrainingClock(false);
//        };
//        // restart second when reach 0
//        if (seconds == 0) {
//            seconds = 59;
//            minutes = minutes - 1;
//        }
//        seconds = seconds - 1;
//        var newSecond = checkTime(seconds);
//        txSeconds(newSecond + "");
//        txMinutes(minutes + "");
//        //alert(minutes() + " " + seconds());

//        if (minutes == 0 && seconds == 0) {
//            cleartrainingClock();
//            var points = trainingViewModel.timeUp();
//            showEndDialog();
//        }
//    };

//    var interval; // = setInterval(runtrainingClock, 1000);

//    function cleartrainingClock() {
//        clearInterval(interval);
//    };
//    function settrainingClock() {
//        restarttrainingClock(true);
//        if (Number(localStorage.maxIndex) == 3) {
//            txMinutes("3");
//            txSeconds("00");
//        }
//        else if (Number(localStorage.maxIndex) == 4) {
//            txMinutes("4");
//            txSeconds("00");
//        }
//        else if (Number(localStorage.maxIndex) == 5) {
//            txMinutes("5");
//            txSeconds("00");
//        }
//        interval = setInterval(runtrainingClock, 1000);
//    };