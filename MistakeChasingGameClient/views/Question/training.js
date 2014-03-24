MistakeChasingGameClient.training = function (params) {

    var viewModel = new MistakeChasingGameClient.trainingVM(params.id);
    var countX = 0;

    myEventHandler = function () {
        countX += 1;
        var showX = document.getElementById("miss" + countX);
        showX.style.visibility = "visible";
        if (countX >= 3) {
            countX = 0;
            //resultDialog = DevExpress.ui.dialog.alert("You have earn " + 0 + " star points!", "Result");
            //resultDialog.done(function () {
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            viewModel.loadQuestion();
            //});
        }
    };

    showBug = function () {
        var points = viewModel.bugFound();
        localStorage.currentPoint = Number(localStorage.currentPoint) + points;
        localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
        $("#toastContainer").dxToast('instance').show();
    };
    processHiding = function () {
        viewModel.loadQuestion();
    };

    submitFBK = function () {
        var points = viewModel.submitBlanks();
        //resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " points!", "Result");
        //resultDialog.done(function () {
        //            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
        //            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
        viewModel.loadQuestion();
    };

    submitSC = function () {
        var points = viewModel.submitChoice();
        clearClock();
        //resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " points!", "Result");
        //resultDialog.done(function () {
        //            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
        //            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
        showEndDialog();
    }; 
    ///////////
    var myScroll;
    function loaded() {
        myScroll = new iScroll('wrapper', { zoom: true, zoomMax: 4 });
    };

    document.addEventListener('DOMContentLoaded', loaded, false);
    //loaded();
    //////////////////
    function showEndDialog() {
        countX = 0;
        var curPoints = ko.observable(Number(localStorage.currentPoint));
        var isPassed = viewModel.isPassed();

        var passDialog = DevExpress.ui.dialog.custom({
            title: "Result",
            message: "You have earn " + curPoints() + " points!",
            buttons: [
            { text: "Next Level", clickAction: next },
            { text: "Back to Home", clickAction: backToMenu}]
        });

        var failDialog = DevExpress.ui.dialog.custom({
            title: "Result",
            message: "You have earn " + curPoints() + " points!",
            buttons: [
            { text: "Try Again", clickAction: tryAgain },
            { text: "Back to Home", clickAction: backToMenu}]
        });
        if (isPassed) {
            passDialog.show();
        }
        else failDialog.show();
    };

    function tryAgain() {
        localStorage.currentIndex = 1;
        localStorage.currentPoint = 0;
        viewModel.randomQuestion();
        viewModel.loadQuestion();
        setClock();
    };

    function next() {
        localStorage.currentIndex = 1;
        localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
        localStorage.currentPoint = 0;
        var nextLevel = Number(localStorage.currentlevel) + 1;
        localStorage.currentlevel = nextLevel;
        viewModel.randomQuestion();
        viewModel.loadQuestion();
        setClock();
    };

    function backToMenu() {
        localStorage.currentIndex = 1;
        localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
        localStorage.currentPoint = 0;
        localStorage.currentlevel = 0;
        clearClock();
        MistakeChasingGameClient.app.navigate('home', { root: true });
    };
    ////////////////////////////////////
    // variables for time units
    txMinutes = ko.observable("");
    txSeconds = ko.observable("");
    restartClock = ko.observable(true);
    time = ko.computed(function () {
        return txMinutes() + " : " + txSeconds();
    }, this);

    //seconds, minutes;
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };
    function runClock() {
        if (restartClock()) {
            if (Number(localStorage.maxIndex) == 3) {
                seconds = 0;
                minutes = 3;
            }
            else if (Number(localStorage.maxIndex) == 4) {
                seconds = 0;
                minutes = 4;
            }
            else if (Number(localStorage.maxIndex) == 5) {
                seconds = 0;
                minutes = 5;
            }
            restartClock(false);
        };
        // restart second when reach 0
        if (seconds == 0) {
            seconds = 59;
            minutes = minutes - 1;
        }
        seconds = seconds - 1;
        var newSecond = checkTime(seconds);
        txSeconds(newSecond + "");
        txMinutes(minutes + "");
        //alert(minutes() + " " + seconds());

        if (minutes == 0 && seconds == 0) {
            clearClock();
            var points = viewModel.timeUp();
            showEndDialog();
        }
    };

    var interval; // = setInterval(runClock, 1000);

    function clearClock() {
        clearInterval(interval);
    };
    function setClock() {
        restartClock(true);
        if (Number(localStorage.maxIndex) == 3) {
            txMinutes("3");
            txSeconds("00");
        }
        else if (Number(localStorage.maxIndex) == 4) {
            txMinutes("4");
            txSeconds("00");
        }
        else if (Number(localStorage.maxIndex) == 5) {
            txMinutes("5");
            txSeconds("00");
        }
        interval = setInterval(runClock, 1000);
    };

    return $.extend(viewModel, {
        viewShown: function () {
            //goi ham load cau hoi len dua theo id truyen qua
            viewModel.randomQuestion();
            viewModel.loadQuestion();
            setClock();
            loaded();
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