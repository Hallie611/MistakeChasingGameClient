MistakeChasingGameClient.training = function (params) {

    viewModel = new MistakeChasingGameClient.trainingVM(params.id);
    clock = new MistakeChasingGameClient.ClockVM("");
    resultPopup = {
        curPoints: ko.observable(),
        button: {
            text: ko.observable(),
            action: ko.observable()
        },
        homeButton: {
            text: "Back to Home",
            action: backToHome
        },
        resultList: ko.observable()
    };

    var countX = 0;
    myEventHandler = function () {
        countX += 1;
        var showX = document.getElementById("miss" + countX);
        showX.style.visibility = "visible";
        if (countX >= 3) {
            countX = 0;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            viewModel.loadQuestion();
        }
    };

    showBug = function () {
        var points = viewModel.bugFound();
        $("#toastContainer").dxToast('instance').show();
    };
    processHiding = function () {
        viewModel.loadQuestion();
    };

    submitFBK = function () {
        var points = viewModel.submitBlanks();
        viewModel.loadQuestion();
    };

    submitSC = function () {
        var points = viewModel.submitChoice();
        showEndDialog();
    };
    //////////////////
    function showEndDialog() {
        $('#resultPopup').dxPopup('instance').beginUpdate();
        countX = 0;
        resultPopup.curPoints(localStorage.currentPoint);
        resultPopup.resultList(viewModel.listQ);
        var isPassed = viewModel.isPassed();
        clock.clearClock();

        if (isPassed) {
            resultPopup.button.text("Next Level");
            resultPopup.button.action(next);
            alert("pass");
        }
        else {
            resultPopup.button.text("Try Again");
            resultPopup.button.action(tryAgain);
            alert("fail");
        }
        $('#resultPopup').dxPopup('instance').endUpdate();
        $('#resultPopup').dxPopup('instance').show();
    };

    function tryAgain() {
        $('#resultPopup').dxPopup('instance').hide();
        localStorage.currentIndex = 1;
        localStorage.currentPoint = 0;
        viewModel.randomQuestion();
        viewModel.loadQuestion();
        clock.setClock();
    };

    function next() {
        $('#resultPopup').dxPopup('instance').hide();
        localStorage.currentIndex = 1;
        localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
        localStorage.currentPoint = 0;
        var nextLevel = Number(localStorage.currentlevel) + 1;
        localStorage.currentlevel = nextLevel;
        viewModel.randomQuestion();
        viewModel.loadQuestion();
        clock.setClock();
    };

    function backToHome() {
        $('#resultPopup').dxPopup('instance').hide();
        localStorage.currentIndex = 1;
        localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
        localStorage.currentPoint = 0;
        localStorage.currentlevel = 0;
        MistakeChasingGameClient.app.navigate('home', { root: true });
    };

    var timeOut = ko.computed(function () {
        if (clock.timeOut()) {
            clock.timeOut(false);
            var points = viewModel.timeUp();
            showEndDialog();
        }
    });

    return $.extend(viewModel, {
        viewShown: function () {
            //goi ham load cau hoi len dua theo id truyen qua
            viewModel.randomQuestion();
            viewModel.loadQuestion();
            clock.setClock();
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
//    restartClock = ko.observable(true);
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
//    function runClock() {
//        if (restartClock()) {
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
//            restartClock(false);
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
//            clearClock();
//            var points = viewModel.timeUp();
//            showEndDialog();
//        }
//    };

//    var interval; // = setInterval(runClock, 1000);

//    function clearClock() {
//        clearInterval(interval);
//    };
//    function setClock() {
//        restartClock(true);
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
//        interval = setInterval(runClock, 1000);
//    };