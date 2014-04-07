MistakeChasingGameClient.home = function (params) {

    localStorage.currentIndex = 1;
    localStorage.currentPoint = 0;
    //localStorage.currentlevel = 0 ;
    popupVisible = ko.observable(false);
    username = ko.observable('');
    message = ko.observable();
    txtUNVisible = ko.observable(false);
    btnLoadAgain = ko.observable(false);

    var viewModel = {

        tabs: [
           { text: "Beginner" },
           { text: "Intermediate" },
           { text: "Advanced" }
        ],

        selectedTab: ko.observable(),

        beginner: {
            src: "images/roadmap.jpg",
            rendered: ko.observable(false)
        },

        intermediate: {
            src: "images/roadmap4.jpg",
            rendered: ko.observable(false)
        },

        advanced: {
            src: "images/roadmap2.jpg",
            rendered: ko.observable(false)
        }
    };

    register = function () {
        popupVisible(true);
        $.connection.hub.url = "http://localhost:8080/signalr";
        //$.connection.hub.url = "http://signalr-13.apphb.com/signalr";
        $.connection.hub.start()
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

    if (!localStorage.username) {
        register();
    };

    loadAgain = function () {
        message('...');
        register();
    };


    SaveName = function () {        
        if (username() == '') {
            message("Name can not be blank");
        }
        else {
            message('...');
            $.connection.gamesHub.server.register(username()).done(function (result) {
                if (result == true) {
                            localStorage.username = username();
                            localStorage.level = "1";
                            localStorage.point = "100";
                            popupVisible(false);
                            $.connection.hub.stop();
                        }
                        else {
                            message("Username has used, Try another please");
                        }
            });
        }
    };


    $.each(["beginner", "intermediate", "advanced"], function (i, maps) {
        viewModel[maps].mapVisible = ko.computed(function () {
            return viewModel.selectedTab() === i;
        });

        viewModel.selectedTab.subscribe(function (value) {
            if (viewModel[maps].rendered())
                return;
            if (value === i)
                viewModel[maps].rendered(true);
        });
    });

    clickLevel = function (level) {
        if (level > Number(localStorage.level)) {
            $("#toastContainer").dxToast('instance').show();
        } else {
            localStorage.currentlevel = level;
            MistakeChasingGameClient.app.navigate('training', { root: true });
        }
    };

    viewModel.selectedTab(0);
    ///////////////////////////////////////////////////

    return viewModel;
};
