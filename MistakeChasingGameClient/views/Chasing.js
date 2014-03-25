MistakeChasingGameClient.Chasing = function (params) {

    viewModel = new MistakeChasingGameClient.OnlineVM();
    clock = new MistakeChasingGameClient.ClockVM("");

    var countX = 0;
    var canFind = true;

    myEventHandler = function () {
        if (countX >= 3) {
            canFind = false;
            $("#toastError").dxToast('instance').show();
        } else {
            countX += 1;
            var showX = document.getElementById("miss" + countX);
            showX.style.visibility = "visible";
        }
    };

    showBug = function () {
        if (canFind) {
            var points = viewModel.bugFound();
            $("#toastSuccess").dxToast('instance').show();
        } else {
            $("#toastError").dxToast('instance').show();
        }
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

    var turnClockOn = ko.computed(function () {
        if (viewModel.clockOn()) {
            viewModel.clockOn(false);
            clock.setClock();
        }
    });
    var timeOut = ko.computed(function () {
        if (clock.timeOut()) {
            clock.timeOut(false);
            var points = viewModel.timeUp();
            viewModel.loadRoomTab();
            //showEndDialog();
        }
    });

    return $.extend(viewModel, {
        viewShown: function () {
            //goi ham load cau hoi len dua theo id truyen qua
            viewModel.loadRoomTab();

        }
    });
};