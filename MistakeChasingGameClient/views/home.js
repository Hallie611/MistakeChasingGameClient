MistakeChasingGameClient.home = function (params) {

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
            src: "images/roadmap2.png",
            rendered: ko.observable(false)
        },

        advanced: {
            src: "images/roadmap3.jpg",
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

    viewModel.selectedTab(0);
    ///////////////////////////////////////////////////

    playingQuestions = new DevExpress.data.ArrayStore({
        //name: "playingQ",
        key: "index"
    });

    minDif = ko.observable();
    maxDif = ko.observable();
    curIndex = ko.observable(1);
    curQuestion = ko.observable("");

    // call random for beginner
    playBeginner = function (level) {
        randomQuestions("beginner", level);
    };

    // Change view for types
    function changeView() {
        var index = curIndex();

        //// Get item by key 'index' and pass to curQuestion
        playingQuestions.byKey(index).done(function (dataItem) {
            curQuestion = dataItem;
        });

        if (curQuestion.type == "findBugs") {
            curIndex(curIndex() + 1);
            MCG_Prototype1.app.navigate({ view: "findBugs" });

            bwidth = ko.observable(curQuestion.question.width),
            bheight = ko.observable(curQuestion.question.height),
            btop = ko.observable(curQuestion.question.top),
            bleft = ko.observable(curQuestion.question.left);

            //MCG_Prototype1.app.navigate({ view: "menu" });
        } else if (curQuestion.type == "fillinBlanks") {
            curIndex(curIndex() + 1);
            //MCG_Prototype1.app.navigate({ view: "findBugs" });
            MCG_Prototype1.app.navigate({ view: "fillinBlanks" });
        };
    };

    // Random questions
    function randomQuestions(tab, level) {
        getMinMaxDifficulty(tab, level);

        // Create list of beginner find bug questions
        filteredFindbugs = DevExpress.data.query(MistakeChasingGameClient.db.findbugs)
                    .filter(["dif", ">=", minDif()], "and", ["dif", "<=", maxDif()])
                    .sortBy("id").toArray();
        // Random a question from the filtered list
        randomFindBugs = filteredFindbugs[Math.floor(Math.random() * filteredFindbugs.length)];
        //items[Math.floor(Math.random() * items.length)];

        // Create list of beginner find bug questions
        filteredFillin = DevExpress.data.query(MCG_Prototype1.db.fillingblank)
                    .filter(["dif", ">=", minDif()], "and", ["dif", "<=", maxDif()])
                    .sortBy("id").toArray();
        // Random a question from the filtered list
        randomFillinBlanks = filteredFillin[Math.floor(Math.random() * filteredFillin.length)];
        //items[Math.floor(Math.random() * items.length)];

        // Reset index
        curIndex(1);
        // Add random question item into playing question list
        playingQuestions.insert({
            index: curIndex(),

            type: "findBugs",
            question: randomFindBugs
        }).done(function (dataItem) {
            // process 'dataItem'
            test = dataItem;
        });
        // Add random question item into playing question list
        playingQuestions.insert({
            index: curIndex() + 1,
            type: "fillinBlanks",
            question: randomFillinBlanks
        });

        changeView();
    };

    function getMinMaxDifficulty(tab, level) {
        if (tab == "beginner") {
            if (level <= 4) {
                maxDif(3);
                minDif(1);
            } else {
                maxDif(5);
                minDif(3);
            }
        }
    };
    // Show red box
    showBug = function () {
        var showMe = document.getElementById("bug");
        showMe.style.borderStyle = "solid";
        points = curQuestion.question.dif * 50;
        resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " star points!", "Result");
        resultDialog.done(function () {
            MistakeChasingGameClient.app.navigate({ view: "home" });
        });
    };
    
    // Count misses in find bugs
    countX = ko.observable(0);
    
    myEventHandler = function () {
        countX(countX() + 1);
        var showX = document.getElementById("miss" + countX());
        showX.style.visibility = "visible";

        if (countX() >= 3) {
            resultDialog = DevExpress.ui.dialog.alert("You have earn " + 0 + " star points!", "Result");
            resultDialog.done(function () {
                MistakeChasingGameClient.app.navigate({ view: "home" });
            });
        }
    };

    return viewModel;
};
