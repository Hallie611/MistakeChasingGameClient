MistakeChasingGameClient.Chasing = function (params) {

    var viewModel = new MistakeChasingGameClient.OnlineVM();

    showBug = function () {
        var points = viewModel.bugFound();
        //        localStorage.currentPoint = Number(localStorage.currentPoint) + points;
        //        localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
        $("#toastContainer").dxToast('instance').show();
    };
    processHiding = function () {
        viewModel.loadListTab();
    };

    submitFBK = function () {
        var points = viewModel.submitBlanks();
        viewModel.loadListTab();
    };

    submitSC = function () {
        var points = viewModel.submitChoice();
        viewModel.loadListTab();
    };


    //Ready = function () {
    //    viewModel.loadListTab();
    //    //setClock();
    //}
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
            viewModel.loadRoomTab();
            //setClock();
        }
    });
};