MistakeChasingGameClient.Chasing = function (params) {

    onlineViewModel = new MistakeChasingGameClient.OnlineVM();
    //alert("create");
    onlineClock = new MistakeChasingGameClient.ClockVM("");

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
          //  alert(onlineViewModel.clockOn());
            //onlineViewModel.clockOn(false);
            onlineClock.setClock();
        }
    });

    var turnClockOff = ko.computed(function () {
        if (!onlineViewModel.clockOn()) {
           // alert(onlineViewModel.clockOn());
            onlineClock.clearClock();
        }
    });
    var timeOutOnline = ko.computed(function () {
        if (onlineClock.timeOut()) {
            onlineClock.timeOut(false);
            var points = onlineViewModel.timeUp();
            onlineViewModel.ListTab.ResultVisible(true);
           // onlineViewModel.loadRoomTab();
          //  showEndDialog();
        }
    });

    backHome = function () {
        MistakeChasingGameClient.app.navigate('home', { root: 'true' });
        popupVisible(false);
    }

    register = function () {
        popupVisible(true);
       // $.connection.hub.url = "http://localhost:8080/signalr";
        $.connection.hub.url = "http://signalr-13.apphb.com/signalr";

        $.connection.hub.start({ transport: 'longPolling' })
            .done(function () {
                btnLoadAgain(false);
                txtUNVisible(true);
            })
            .fail(function () {
                message("Check connection server  for creating user in first play");
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
            message("Name muss less than 10 char");
        }
        else {
            message('...');
            $.connection.gamesHub.server.register(username()).done(function (result) {
                if (result == true) {
                    localStorage.username = username();
                    onlineViewModel.RoomTab.username(localStorage.username),
                     onlineViewModel.RoomTab.level(localStorage.level),
                     onlineViewModel.RoomTab.point(localStorage.point),

                    popupVisible(false);
                    $.connection.hub.stop();
                    onlineViewModel.loadRoomTab();

                }
                else {
                    message("Username has used, Try another please");
                }
            });
        }
    };

    ///////////////////////////////////

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
                        onlineViewModel.loadRoomTab();
                    } else {
                        register();
                    }


            //    },
            //    error: function (request) {
            //        if (request.status == 0 || request.status == 404) {

            //            DevExpress.ui.dialog.alert("Please connect to the internet").done(function () {
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