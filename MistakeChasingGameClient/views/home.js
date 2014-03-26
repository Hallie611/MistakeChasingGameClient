MistakeChasingGameClient.home = function (params) {

    localStorage.currentIndex = 1;
    localStorage.currentPoint = 0;
    //localStorage.currentlevel = 0 ;
    popupVisible = ko.observable(false);
    username = ko.observable('newbine');
    message = ko.observable();
    txtUNVisible = ko.observable(true);


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
        if ($.connection.hub.state == null) {
            txtUNVisible(false);
            message("Can not connect to sever, check your connection !");
        }
        else {
            $.connection.gamesHub.client.TrySave = function (result) {
              //  alert(result);
                if (result == true) {
                    localStorage.username = username();
                    localStorage.level = "1";
                    localStorage.point = "100";
                    popupVisible(false);
                  //  $.connection.gamesHub.stop();
                }
                else {
                    message("Username has used, Try another please");
                }
            }
            $.connection.hub.start().done(function () {
                alert('done');
            })
        }
    };

    if (!localStorage.username) {
        register();
    };

  

    SaveName = function () {
        
        $.connection.gamesHub.server.register(username());
    };
    loadAgain = function () {
        connect();

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
        //alert(level);
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
