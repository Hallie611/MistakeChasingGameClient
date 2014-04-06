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
        var randomAns = ko.observable();

        //giu index random array question
        if (!localStorage.currentIndex)
            localStorage.currentIndex = 0;
        // giu diem
        if (!localStorage.currentPoint)
            localStorage.currentPoint = 0;
        ///////////////////////////////        
        this.listQ = new DevExpress.data.ArrayStore({
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
            this.listQ.update(localStorage.currentIndex, { status: "Correct" });
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
            if (points == difCurrentQ * 6) {
                this.listQ.update(localStorage.currentIndex, { status: "Correct" });
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
                this.listQ.update(localStorage.currentIndex, { status: "Correct" });
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
            var filteredQuestion = MistakeChasingGameClient.db.questionDb.createQuery().filter([["dif", "=", Number(localStorage.currentlevel)],
                                        "and", ["type", "=", "findbugs"]]).sortBy("id").toArray();
            randomQuestion = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
            randomAns = MistakeChasingGameClient.db.findBugsDb.createQuery().filter(["questionId", "=", randomQuestion.id]).toArray()[0];
        };
        this.randomFillingBlanks = function () {
            var filteredQuestion = MistakeChasingGameClient.db.questionDb.createQuery().filter([["dif", "=", Number(localStorage.currentlevel)],
                                        "and", ["type", "=", "fillingBlanks"]]).sortBy("id").toArray();
            randomQuestion = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
            randomAns = MistakeChasingGameClient.db.fillingBlanksDb.createQuery().filter(["questionId", "=", randomQuestion.id]).sortBy("answerIndex").toArray();
        };
        this.randomSingleChoice = function () {
            var filteredQuestion = MistakeChasingGameClient.db.questionDb.createQuery().filter([["dif", "=", Number(localStorage.currentlevel)],
                                        "and", ["type", "=", "singleChoice"]]).sortBy("id").toArray();
            randomQuestion = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
            var correctAns = MistakeChasingGameClient.db.singleChoiceDb.createQuery().filter(["questionId", "=", randomQuestion.id]).select("mistakeId").toArray()[0].mistakeId;
            var randomAns1, randomAns2;
            var isRepeat = true;
            while (isRepeat) {
                randomAns1 = Math.floor(Math.random() * 10) + 1;
                if (randomAns1 != correctAns) {
                    while (isRepeat) {
                        randomAns2 = Math.floor(Math.random() * 10) + 1;
                        if (randomAns2 != randomAns1 && randomAns2 != correctAns) {
                            isRepeat = false;
                            var listAns = MistakeChasingGameClient.db.mistakeTypesDb.createQuery().filter([["id", "=", randomAns1],
                                                        "or", ["id", "=", randomAns2], "or", ["id", "=", correctAns]]).sortBy("id").select("content").toArray();
                            randomAns.listAns = [listAns[0].content, listAns[1].content, listAns[2].content];
                            randomAns.ans = MistakeChasingGameClient.db.mistakeTypesDb.createQuery().filter(["id", "=", correctAns]).select("content").toArray()[0].content;
                        };
                    };
                };
            };
        };

        this.loadFindBugs = function () {
            this.findBugsTab.src(randomQuestion.src);
            this.findBugsTab.bwidth(randomAns.width);
            this.findBugsTab.bheight(randomAns.height);
            this.findBugsTab.bleft(randomAns.left);
            this.findBugsTab.btop(randomAns.top);
            difCurrentQ = randomQuestion.dif;
        };
        this.loadFillingBlanks = function () {
            this.fillingBlanksTab.src(randomQuestion.src);
            this.fillingBlanksTab.answer1source(randomAns[0].list);
            this.fillingBlanksTab.answer2source(randomAns[1].list);
            this.fillingBlanksTab.answer3source(randomAns[2].list);
            answer1 = randomAns[0].ans;
            answer2 = randomAns[1].ans;
            answer3 = randomAns[2].ans;
            difCurrentQ = randomQuestion.dif;
        };
        this.loadSingleChoice = function () {
            this.singleChoiceTab.src(randomQuestion.src);
            this.singleChoiceTab.listAns(randomAns.listAns);
            answerSC = randomAns.ans;
            difCurrentQ = randomQuestion.dif;
        };
        this.addQuestion = function (index, type) {
            this.listQ.insert({
                index: index,
                question: randomQuestion,
                ans: randomAns,
                type: type,
                status: "Incorrect"
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
            var maxIndex = 0;
            this.listQ.totalCount().done(function (result) {
                maxIndex = result;
            });
            if (maxIndex != 0) {
                for (var i = 1; i <= maxIndex; i++) {
                    this.listQ.remove(i);
                }
            };
            this.listQ.totalCount().done(function (result) {
                alert(result);
            });
            ////////////////////////////////////////            
            if (Number(localStorage.currentlevel) <= 21 && Number(localStorage.currentlevel) > 14) {
                localStorage.maxIndex = 5;
                this.randomFive();
            }
            else if (Number(localStorage.currentlevel) < 15 && Number(localStorage.currentlevel) > 7) {
                localStorage.maxIndex = 4;
                this.randomFour();
            }
            else if (Number(localStorage.currentlevel) < 8) {
                localStorage.maxIndex = 3;
                this.randomThree();
            }
        };
        this.loadQuestion = function (obj) {
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            ///////////////////////////////////////////////
            var question, index;

            index = Number(localStorage.currentIndex);
            this.listQ.byKey(index).done(function (dataItem) {
                question = dataItem;
                //alert(question.question.dif);
            });
            if (question.type == "FindBugs") {
                randomQuestion = question.question;
                randomAns = question.ans;
                this.loadFindBugs();
                selectedTab(0);
                this.findBugsTab.rendered(true);
            }
            else if (question.type == "FillingBlanks") {
                randomQuestion = question.question;
                randomAns = question.ans;
                this.loadFillingBlanks();
                selectedTab(1);
                this.fillingBlanksTab.rendered(true);
            }
            else if (question.type == "SingleChoice") {
                randomQuestion = question.question;
                randomAns = question.ans;
                this.loadSingleChoice();
                selectedTab(2);
                this.singleChoiceTab.rendered(true);
            }
        };
    }
})();