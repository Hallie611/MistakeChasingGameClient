MistakeChasingGameClient.Chasing = function (params) {

    viewModel = new MistakeChasingGameClient.OnlineVM();
    clock = new MistakeChasingGameClient.ClockVM("");

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
        localStorage.currentPoint = Number(localStorage.currentPoint) + points;
        localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
        $("#toastContainer").dxToast('instance').show();
    };


    var countX = 0;
    myEventHandler = function () {
        if (countX >= 3) {
            canFind = false;
            viewModel.CorrectedQuestion(localStorage.currentIndex, 0, false);
            $("#toastError").dxToast('instance').show();
            countX = 0;
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
        viewModel.questionVM.loadListTab();
    };

    submitFBK = function () {
        var points = viewModel.submitBlanks();
        viewModel.questionVM.loadListTab();
    };

    submitSC = function () {
        var points = viewModel.submitChoice();
        viewModel.questionVM.loadListTab();
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
            viewModel.questionVM.loadRoomTab();
            //showEndDialog();
        }
    });

    return $.extend(viewModel, {
        viewShown: function () {
            //goi ham load cau hoi len dua theo id truyen qua
            viewModel.questionVM.loadRoomTab();

        },
        viewHidden : function(){
            $.connection.hub.stop();
        }
    });
};