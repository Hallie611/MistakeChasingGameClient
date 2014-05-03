MistakeChasingGameClient.Chasing = function (params) {

    onlineViewModel = new MistakeChasingGameClient.OnlineVM();
    //alert("create");
    onlineClock = new MistakeChasingGameClient.ClockVM("");

    username = ko.observable();
    popupVisible = ko.observable(false);

    message = ko.observable();
    txtUNVisible = ko.observable(false);
    btnLoadAgain = ko.observable(false);

    var countX = 0;
    var connection;

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
        countX = 0;
        var points = onlineViewModel.bugFound();
        $("#toastSuccess").dxToast('instance').show();
    };

    processHidingOnline = function () {
        onlineViewModel.ListTab.loadListTab();
    };

    submitOnlineFBK = function () {
        var points = onlineViewModel.submitBlanks();
        onlineViewModel.ListTab.loadListTab();
    };

    submitOnlineSC = function () {
        var points = onlineViewModel.submitChoice();
        onlineViewModel.ListTab.loadListTab();
    };

    var turnClockOn = ko.computed(function () {
        if (onlineViewModel.clockOn()) {
            //  alert(onlineViewModel.clockOn());
            //onlineViewModel.clockOn(false);
            //alert("set clock");
            onlineClock.setClock();
        }
    });

    var turnClockOff = ko.computed(function () {
        if (!onlineViewModel.clockOn()) {
            // alert(onlineViewModel.clockOn());
            //alert("clear clock");
            onlineClock.clearClock();
        }
    });
    var timeUpOnline = ko.computed(function () {
        if (onlineClock.timeUp()) {
            onlineClock.timeUp(false);
            var points = onlineViewModel.timeUp();
            onlineViewModel.ListTab.ResultVisible(true);
            // onlineViewModel.RoomTab.loadRoomTab();
            //  showEndDialog();
        }
    });

    backHome = function () {
        MistakeChasingGameClient.app.navigate('home', { root: 'true' });
        popupVisible(false);
    }

    register = function () {
        message('connecting');
        txtUNVisible(false);
        username('');
        popupVisible(true);
        $.connection.hub.url = "http://signalr-13.apphb.com/signalr";
        $.connection.hub.start()
            .done(function () {
                message('');
                btnLoadAgain(false);
                txtUNVisible(true);
            })
            .fail(function () {
                message("Check connection server for creating user in first play");
                btnLoadAgain(true);
                txtUNVisible(false);
            });
    };


    loadAgain = function () {
        message('...');
        register();
    };


    SaveName = function () {
        message("...");
        if (username() == '') {
            message("Name can not be blank");
        }
        else if (username().length > 10) {
            message("Name must be less than 10 characters");
        }
        else {

            $.connection.gamesHub.server.register(username()).done(function (result) {
                if (result == true) {
                    localStorage.username = username();
                    onlineViewModel.RoomTab.username(localStorage.username),
                     onlineViewModel.RoomTab.level(localStorage.level),
                     onlineViewModel.RoomTab.point(localStorage.point),
                    popupVisible(false);
                    //$.connection.hub.stop();
                    onlineViewModel.RoomTab.loadRoomTab();
                }
                else {
                    message("Username was used. Try again please");
                }
            });
        }
    };

    ///////////////////////////////////
    return $.extend(onlineViewModel, {
        viewShown: function () {
            

            //$.ajax({
            //    url: "http://signalr-13.apphb.com/signalR/hubs",
            //    type: 'GET',
            //    headers: { 'Access-Control-Allow-Origin': '*' },
            //    crossDomain: true,
            //    contentType: "application/json;charset=utf-8",
            //    success: function (data) {
            if (localStorage.username) {
                //   $.connection.hub.stop();
                onlineViewModel.RoomTab.loadRoomTab();
            } else {
                register();
            }

            //    },
            //    error: function (request) {
            //        if (request.status == 0 || request.status == 404) {

            //            DevExpress.ui.dialog.alert("Check your connection !").done(function () {
            //                MistakeChasingGameClient.app.navigate('home', { root: true });
            //            });
            //        }
            //        else {
            //            DevExpress.ui.dialog.alert("Server Maintenance! Come back later").done(function () {
            //                MistakeChasingGameClient.app.navigate('home', { root: true });
            //            });
            //        }

            //    }
            //});


        },
        viewDisposing: function () {
            //$.connection.hub.stop();
            message('');
            clearInterval(couter);
            //onlineViewModel.clearListQ();
        },
        viewHidden: function () {
            if (counter) {
                clearInterval(couter);
                alert(counter);
            }
            //$.connection.hub.stop();
            message('');
            //onlineViewModel.clearListQ();
        },
        viewDisposed: function () {
            message('');
            //$.connection.hub.stop();
            //onlineViewModel.clearListQ();
        }
    });
};