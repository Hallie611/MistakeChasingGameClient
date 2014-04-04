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
        var findBugsAns = ko.observable();
        var fillingBlanksAns = ko.observable();
        var singleChoiceAns = ko.observable();

        //giu index random array question
        if (!localStorage.currentIndex)
            localStorage.currentIndex = 0;
        // giu diem
        if (!localStorage.currentPoint)
            localStorage.currentPoint = 0;
        ///////////////////////////////        
        var listQ = new DevExpress.data.ArrayStore({
            key: "index"
        });
        //var listQ = ko.observable();

        ///////////////////////zoom
        var myScroll;
        function loaded() {
            myScroll = new iScroll('wrapper', { zoom: true, zoomMax: 2 });
        };
        //////////////////////
        var selectedTab = ko.observable(0);

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
            var points = difCurrentQ * 5;
            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            return points;
        };
        //////////////////////////////////////////
        //submit method
        this.submitBlanks = function () {
            var points = 0;
            if (this.fillingBlanksTab.choice1() == answer1) {
                points += difCurrentQ * 2;
            }
            if (this.fillingBlanksTab.choice2() == answer2) {
                points += difCurrentQ * 2;
            }
            if (this.fillingBlanksTab.choice3() == answer3) {
                points += difCurrentQ * 2;
            }
            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            return points;
        };
        ////////////////////////////////////////
        this.submitChoice = function () {
            var points = 0;
            if (answerSC == this.singleChoiceTab.choiceSC()) {
                points += difCurrentQ * 5;
            }
            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            return points;
        };

        this.isPassed = function () {
            var crit = Number(localStorage.currentlevel) * 5 * 2;

            if (Number(localStorage.currentPoint) >= crit) {
                if (Number(localStorage.currentlevel) == Number(localStorage.level)) {
                    localStorage.level = Number(localStorage.currentlevel) + 1;
                }
                return true;
            }
            else return false;
        };
        /////////////////////////////////////////
        this.timeUp = function () {
            var tabIndex = selectedTab();
            if (tabIndex == 0) {
                return 0;
            } else if (tabIndex == 1) {
                return this.submitBlanks();
            } else if (tabIndex == 2) {
                return this.submitChoice();
            }
        };
        /////////////////////////////////////////
        this.randomFindBugs = function () {
            var filteredQuestion = MistakeChasingGameClient.db.questionDb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)],
                                        "and", ["type", "=", "findbugs"]).sortBy("id").toArray();
            randomQuestion = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
            findBugsAns = MistakeChasingGameClient.db.findBugsDb.createQuery().filter(["questionId", "=", randomQuestion.id]);
        };
        this.randomFillingBlanks = function () {
            var filteredQuestion = MistakeChasingGameClient.db.questionDb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)],
                                        "and", ["type", "=", "fillingBlanks"]).sortBy("id").toArray();
            randomQuestion = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
            fillingBlanksAns = MistakeChasingGameClient.db.fillingBlanksDb.createQuery().filter(["questionId", "=", randomQuestion.id]).sortBy("id").toArray();
        };
        this.randomSingleChoice = function () {
            var filteredQuestion = MistakeChasingGameClient.db.questionDb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)],
                                        "and", ["type", "=", "singleChoice"]).sortBy("id").toArray();
            randomQuestion = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
            singleChoiceAns = MistakeChasingGameClient.db.singleChoiceDb.createQuery().filter(["questionId", "=", randomQuestion.id]).sortBy("id").toArray();
        };
        this.loadFindBugs = function () {
            this.findBugsTab.src(randomQuestion.src);
            this.findBugsTab.bwidth(findBugsAns.width);
            this.findBugsTab.bheight(findBugsAns.height);
            this.findBugsTab.bleft(findBugsAns.left);
            this.findBugsTab.btop(findBugsAns.top);
            difCurrentQ = randomQuestion.dif;
        };
        this.loadFillingBlanks = function () {
            this.fillingBlanksTab.src(randomQuestion.src);
            this.fillingBlanksTab.answer1source(fillingBlanksAns[0].list);
            this.fillingBlanksTab.answer2source(fillingBlanksAns[1].list);
            this.fillingBlanksTab.answer3source(fillingBlanksAns[2].list);
            answer1 = fillingBlanksAns[0].ans;
            answer2 = fillingBlanksAns[1].ans;
            answer3 = fillingBlanksAns[2].ans;
            difCurrentQ = randomQuestion.dif;
        };
        this.loadSingleChoice = function () {
            this.singleChoiceTab.src(randomQuestion.src);
            this.singleChoiceTab.listAns(singleChoiceAns.listAns);
            answerSC = singleChoiceAns.ans;
            difCurrentQ = randomQuestion.dif;
        };
        this.addQuestion = function (index, type) {
            listQ.insert({
                index: index,
                question: randomQuestion,
                type: type
            });
        };
        this.randomThree = function () {
            this.randomFindBugs();
            this.addQuestion(1, "FindBugs");
            this.randomFillingBlanks();
            this.addQuestion(2, "FillingBlanks");
            this.randomSingleChoice();
            this.addQuestion(3, "SingleChoice");
        };
        this.randomFour = function () {
            this.randomFindBugs();
            this.addQuestion(1, "FindBugs");

            var isRepeat = true;
            var count = 0;
            var random1 = randomQuestion;
            while (isRepeat && count < 10) {
                this.randomFindBugs();
                count++;
                if (random1 != randomQuestion) {
                    isRepeat = false;
                    this.addQuestion(2, "FindBugs");
                };
            }
            this.randomFillingBlanks();
            this.addQuestion(3, "FillingBlanks");
            this.randomSingleChoice();
            this.addQuestion(4, "SingleChoice");
        };
        this.randomFive = function () {
            var isRepeat = true;
            var count = 0;
            this.randomFindBugs();
            this.addQuestion(1, "FindBugs");

            var random1 = randomQuestion;
            while (isRepeat && count < 10) {
                this.randomFindBugs();
                count++;
                if (random1 != randomQuestion) {
                    isRepeat = false;
                    this.addQuestion(2, "FindBugs");
                };
            }
            this.randomFillingBlanks();
            this.addQuestion(3, "FillingBlanks");

            isRepeat = true;
            count = 0;
            random1 = randomQuestion;
            while (isRepeat && count < 10) {
                this.randomFillingBlanks();
                count++;
                if (random1 != randomQuestion) {
                    isRepeat = false;
                    this.addQuestion(4, "FillingBlanks");
                };
            }
            this.randomSingleChoice();

            this.addQuestion(5, "SingleChoice");
        };
        this.randomQuestion = function () {
            if (Number(localStorage.currentlevel) <= 21 && Number(localStorage.currentlevel) > 14) {
                localStorage.maxIndex = 5;
            }
            else if (Number(localStorage.currentlevel) < 15 && Number(localStorage.currentlevel) > 7) {
                localStorage.maxIndex = 4;
            }
            else if (Number(localStorage.currentlevel) < 8) {
                localStorage.maxIndex = 3;
            }
            ////////////////////////////////////////
            var maxIndex = 0;
            listQ.totalCount().done(function (result) {
                maxIndex = result;
            });
            if (maxIndex != 0) {
                for (var i = 1; i <= maxIndex; i++) {
                    listQ.remove(i);
                }
            };

            if (Number(localStorage.maxIndex) == 3) {
                this.randomThree();
            }
            else if (Number(localStorage.maxIndex) == 4) {
                this.randomFour();
            }
            else if (Number(localStorage.maxIndex) == 5) {
                this.randomFive();
            }
        };
        this.loadQuestion = function (obj) {
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            ///////////////////////////////////////////////
            var question, index;

            index = Number(localStorage.currentIndex);
            listQ.byKey(index).done(function (dataItem) {
                question = dataItem;
                //alert(question.question.dif);
            });
            if (question.type == "FindBugs") {
                randomQuestion = question.question;
                this.loadFindBugs();
                selectedTab(0);
                this.findBugsTab.rendered(true);
            }
            else if (question.type == "FillingBlanks") {
                randomQuestion = question.question;
                this.loadFillingBlanks();
                selectedTab(1);
                this.fillingBlanksTab.rendered(true);
                document.addEventListener('DOMContentLoaded', loaded, false);
                loaded();
            }
            else if (question.type == "SingleChoice") {
                randomQuestion = question.question;
                this.loadSingleChoice();
                selectedTab(2);
                this.singleChoiceTab.rendered(true);
                document.addEventListener('DOMContentLoaded', loaded, false);
                loaded();
            }
        };
    }
})();