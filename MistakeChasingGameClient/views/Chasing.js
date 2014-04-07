MistakeChasingGameClient.Chasing = function (params) {

    onlineViewModel = new MistakeChasingGameClient.OnlineVM();
    //alert("create");
    onlineClock = new MistakeChasingGameClient.ClockVM("");

    var countX = 0;
    myEventHandlerOnline = function () {
        countX += 1;
        var showX = document.getElementById("miss" + countX);
        showX.style.visibility = "visible";
        if (countX >= 3) {
            countX = 0;
            onlineViewModel.CorrectedQuestion(localStorage.currentIndex, 0, false);
            $("#toastError").dxToast('instance').show();
        }
    };

    showBugOnline = function () {
        var points = onlineViewModel.bugFound();
        $("#toastSuccess").dxToast('instance').show();
    };

    processHidingOnline = function () {
        onlineViewModel.loadListTab();
    };

    submitOnlineFBK = function () {
        var points = onlineViewModel.submitBlanks();
        onlineViewModel.loadListTab();
    };

    submitOnlineSC = function () {
        var points = onlineViewModel.submitChoice();
        onlineViewModel.loadListTab();
    };

    var turnClockOn = ko.computed(function () {
        if (onlineViewModel.clockOn()) {
            onlineViewModel.clockOn(false);
            onlineClock.setClock();
        }
    });
    var timeOutOnline = ko.computed(function () {
        if (onlineClock.timeOut()) {
            onlineClock.timeOut(false);
            var points = onlineViewModel.timeUp();
            onlineViewModel.loadRoomTab();
            //showEndDialog();
        }
    });

    return $.extend(onlineViewModel, {
        viewShown: function () {
            //goi ham load cau hoi len dua theo id truyen qua
            //onlineViewModel = new MistakeChasingGameClient.OnlineVM();
            //alert(onlineViewModel);
            onlineViewModel.loadRoomTab();
        },
        viewDisposing: function () {
            $.connection.hub.stop();
            //onlineViewModel.clearListQ();
        },
        viewHidden: function () {
            $.connection.hub.stop();
            //onlineViewModel.clearListQ();
        },
        viewDisposed: function () {
            $.connection.hub.stop();
            //onlineViewModel.clearListQ();
        }
    });
};