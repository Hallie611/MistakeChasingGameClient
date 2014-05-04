MistakeChasingGameClient.home = function (params) {

    localStorage.currentIndex = 1;
    localStorage.currentPoint = 0;
    //localStorage.currentlevel = 0 ;

    if (!localStorage.level) {
        localStorage.level = 1;
        localStorage.point = 10;
    }

    if (localStorage.level < 8) {
        localStorage.rank = "Beginner";
    }
    else if (localStorage.level > 7 && localStorage.level < 15) {
        localStorage.rank = "Intermediate";
    } else {
        localStorage.rank = "Advanced"
    }

    // Audio
    var bgAudioHome = ko.observable(); //document.getElementById('bgAudio');

    var viewModel = {
        soundSrc: ko.observable("sound/Daily Life.mp3"),
        //bgAudio: ko.observable(),
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
        },
        level: ko.observable(""),
        point: ko.observable(""),
        rank: ko.observable(""),

        viewShown: function () {
            if ($.connection.hub.state == 1)
                $.connection.hub.stop();

            viewModel.point(localStorage.point);
            viewModel.level(localStorage.level);
            viewModel.rank(localStorage.rank);
            //if ($.connection.hub.state == 1) {
            //    $.connection.hub.stop();
            //}
            //alert(viewModel.level());

            // Audio
            bgAudioHome(document.getElementById('bgAudioHome'));
            bgAudioHome().play();

            //audio.currentTime = 0;
            //audio.seekable.start();
        },
        viewHidden: function () {
            //alert(bgAudio());
            bgAudioHome().pause();
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
