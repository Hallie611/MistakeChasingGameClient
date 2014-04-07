MistakeChasingGameClient.home = function (params) {

    localStorage.currentIndex = 1;
    localStorage.currentPoint = 0;
    //localStorage.currentlevel = 0 ;
    popupVisible = ko.observable(false);
    username = ko.observable('');
    message = ko.observable();
    txtUNVisible = ko.observable(false);
    btnLoadAgain = ko.observable(false);

    if (!localStorage.level) {
        localStorage.level = 1;
        localStorage.point = 0;
    }
    level= ko.observable(localStorage.level);
    point= ko.observable(localStorage.point);


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
