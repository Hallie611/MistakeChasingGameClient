(function () {
    "use strict";
    MistakeChasingGameClient.trainingVM = function (params) {

        var answerSC;
        var answer1;
        var answer2;
        var answer3;
        //////////////////////////
        var difCurrentQ;
        var randomQuestion = ko.observable();

        //giu index random array question
        if (!localStorage.currentIndex)
            localStorage.currentIndex = 0;
        // giu diem
        if (!localStorage.currentPoint)
            localStorage.currentPoint = 0;
        ///////////////////////////////        

        var selectedTab = ko.observable();

        this.findBugsTab = {
            src: ko.observable(),
            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 0;
            }),
            bwidth: ko.observable(),
            bheight: ko.observable(),
            bleft: ko.observable(),
            btop: ko.observable(),
            srcX: "images/redX.png"
        };

        this.fillingBlanksTab = {
            src: ko.observable(),
            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 1;
            }),
            answer1source: ko.observable(),
            answer2source: ko.observable(),
            answer3source: ko.observable(),

            choice1: ko.observable(''),
            choice2: ko.observable(''),
            choice3: ko.observable('')
        };

        this.singleChoiceTab = {
            src: ko.observable(),
            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 2;
            }),
            listAns: ko.observable(),
            choiceSC: ko.observable('')
        };

        /////////////////////////////////////////
        this.bugFound = function () {
            var showMe = document.getElementById("bug");
            showMe.style.borderStyle = "solid";
            var points = difCurrentQ * 50;
            return points;
        };
        //////////////////////////////////////////
        //submit method
        this.submitBlanks = function () {
            var points = 0;
            if (this.fillingBlanksTab.choice1() == answer1) {
                points += difCurrentQ * 25;
            }
            if (this.fillingBlanksTab.choice2() == answer2) {
                points += difCurrentQ * 25;
            }
            if (this.fillingBlanksTab.choice3() == answer3) {
                points += difCurrentQ * 25;
            }
            return points;
        };
        ////////////////////////////////////////
        this.submitChoice = function () {
            var points = 0;
            if (answerSC == this.singleChoiceTab.choiceSC()) {
                points += difCurrentQ * 50;
            }
            return points;
        };

        this.isPassed = function () {
            var crit = Number(localStorage.currentlevel) * 50 * 2;
            //alert(crit);
            if (Number(localStorage.currentPoint) >= crit) {
                return true;
            }
            else return false;
        };
        /////////////////////////////////////////
        this.randomFindBugs = function () {
            var filteredFindbugs = MistakeChasingGameClient.db.findbugsdb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").toArray();
            randomQuestion = filteredFindbugs[Math.floor(Math.random() * filteredFindbugs.length)];
        };
        this.randomFillingBlanks = function () {
            var filteredFillBlank = MistakeChasingGameClient.db.fillingblankdb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").toArray();
            randomQuestion = filteredFillBlank[Math.floor(Math.random() * filteredFillBlank.length)];
        };
        this.randomSingleChoice = function () {
            var filteredSingle = MistakeChasingGameClient.db.multiplechoicedb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").toArray();
            randomQuestion = filteredSingle[Math.floor(Math.random() * filteredSingle.length)];
        };
        this.loadFindBugs = function () {
            this.findBugsTab.src(randomQuestion.src);
            this.findBugsTab.bwidth(randomQuestion.width);
            this.findBugsTab.bheight(randomQuestion.height);
            this.findBugsTab.bleft(randomQuestion.left);
            this.findBugsTab.btop(randomQuestion.top);
            difCurrentQ = randomQuestion.dif;
        };
        this.loadFillingBlanks = function () {
            this.fillingBlanksTab.src(randomQuestion.src);
            this.fillingBlanksTab.answer1source(randomQuestion.listA);
            this.fillingBlanksTab.answer2source(randomQuestion.listB);
            this.fillingBlanksTab.answer3source(randomQuestion.listC);
            answer1 = randomQuestion.A;
            answer2 = randomQuestion.B;
            answer3 = randomQuestion.C;
            difCurrentQ = randomQuestion.dif;
        };
        this.loadSingleChoice = function () {
            this.singleChoiceTab.src(randomQuestion.src);
            this.singleChoiceTab.listAns(randomQuestion.listAns);
            answerSC = randomQuestion.ans;
            difCurrentQ = randomQuestion.dif;
        };
        this.loadQuestion = function () {

            if (Number(localStorage.currentlevel) < 8) {
                localStorage.maxIndex = 3;
            }
            ////////////////////////////////////////
            if (Number(localStorage.maxIndex) < 4 && Number(localStorage.currentIndex) == 1) {
                this.randomFindBugs();
                this.loadFindBugs();
                this.singleChoiceTab.rendered(false);
                this.fillingBlanksTab.rendered(false);
                selectedTab(0);
                this.findBugsTab.rendered(true);
            }
            else if (Number(localStorage.maxIndex) < 4 && Number(localStorage.currentIndex) == 2) {
                this.randomFillingBlanks();
                this.loadFillingBlanks();
                this.singleChoiceTab.rendered(false);
                this.findBugsTab.rendered(false);
                selectedTab(1);
                this.fillingBlanksTab.rendered(true);
            }
            else if (Number(localStorage.maxIndex) < 4 && Number(localStorage.currentIndex) == 3) {
                this.randomSingleChoice();
                this.loadSingleChoice();
                this.findBugsTab.rendered(false);
                this.fillingBlanksTab.rendered(false);
                selectedTab(2);
                this.singleChoiceTab.rendered(true);
            };

        };
    }
})();