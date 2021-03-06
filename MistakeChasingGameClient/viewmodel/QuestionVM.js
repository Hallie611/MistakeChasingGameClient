﻿(function () {
    "use strict";
    MistakeChasingGameClient.QuestionVM = function (params) {
        //////////////////////////
        var difCurrentQ;
        var randomQuestion//= ko.observable();
        var randomAns//= ko.observable();

        //giu index random array question
        if (!localStorage.currentIndex)
            localStorage.currentIndex = 1;
        // giu diem
        if (!localStorage.currentPoint)
            localStorage.currentPoint = 0;
        ///////////////////////////////        
        this.listQ = new DevExpress.data.ArrayStore({
            key: "index"
        });
        //////////////////////
        var selectedTab = ko.observable(0);
        var self = this;

        this.findBugsTab = {
            src: ko.observable(),
            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 2;
            }),
            bwidth: ko.observable(),
            bheight: ko.observable(),
            bleft: ko.observable(),
            btop: ko.observable(),
            srcX: "images/redX.png",
            loadFindBugs: function () {
                self.findBugsTab.src(randomQuestion.src);
                self.findBugsTab.bwidth(randomAns.width);
                self.findBugsTab.bheight(randomAns.height);
                self.findBugsTab.bleft(randomAns.left);
                self.findBugsTab.btop(randomAns.top);
                difCurrentQ = randomQuestion.dif;
            }
        };
        this.fillingBlanksTab = {
            src: ko.observable(),
            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 3;
            }),
            answer1source: ko.observable(),
            answer2source: ko.observable(),
            answer3source: ko.observable(),

            choice1: ko.observable(''),
            choice2: ko.observable(''),
            choice3: ko.observable(''),
            answer1: "",
            answer2: "",
            answer3: "",
            loadFillingBlanks: function () {
                self.fillingBlanksTab.src(randomQuestion.src);
                self.fillingBlanksTab.answer1source(randomAns[0].list);
                self.fillingBlanksTab.answer2source(randomAns[1].list);
                self.fillingBlanksTab.answer3source(randomAns[2].list);
                self.fillingBlanksTab.answer1 = randomAns[0].ans;
                self.fillingBlanksTab.answer2 = randomAns[1].ans;
                self.fillingBlanksTab.answer3 = randomAns[2].ans;

                self.fillingBlanksTab.choice1('');
                self.fillingBlanksTab.choice2('');
                self.fillingBlanksTab.choice3('');
                difCurrentQ = randomQuestion.dif;
            }
        };
        this.singleChoiceTab = {
            src: ko.observable(),
            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 4;
            }),
            listAns: ko.observable(),
            choiceSC: ko.observable(''),
            answerSC: "",
            loadSingleChoice: function () {
                self.singleChoiceTab.src(randomQuestion.src);
                self.singleChoiceTab.listAns(randomAns.listAns);
                self.singleChoiceTab.choiceSC('');
                self.singleChoiceTab.answerSC = randomAns.ans;
                difCurrentQ = randomQuestion.dif;
            }
        };
        /////////////////////////////////////////
        this.bugFound = function () {
            var showMe = document.getElementById("bug");
            showMe.style.borderStyle = "solid";
            var points = difCurrentQ * 5;
            this.listQ.update(localStorage.currentIndex, { status: "Correct" });
            return points;
        };
        ////////////////////////////////////////////submit method
        this.submitBlanks = function () {
            var points = 0;
            if (this.fillingBlanksTab.choice1() == this.fillingBlanksTab.answer1) {
                points += difCurrentQ * 2;
            }
            if (this.fillingBlanksTab.choice2() == this.fillingBlanksTab.answer2) {
                points += difCurrentQ * 2;
            }
            if (this.fillingBlanksTab.choice3() == this.fillingBlanksTab.answer3) {
                points += difCurrentQ * 2;
            }
            if (points == difCurrentQ * 6) {
                this.listQ.update(localStorage.currentIndex, { status: "Correct" });
            }
            return points;
        };
        ////////////////////////////////////////
        this.submitChoice = function () {
            var points = 0;
            if (this.singleChoiceTab.answerSC == this.singleChoiceTab.choiceSC()) {
                points += difCurrentQ * 5;
                this.listQ.update(localStorage.currentIndex, { status: "Correct" });
            }
            return points;
        };

        this.checkPassed = function () {
            var crit;
            if (Number(localStorage.currentlevel) <= 21 && Number(localStorage.currentlevel) > 14) {
                crit = Number(localStorage.currentlevel) * 5 * 4;
            }
            else if (Number(localStorage.currentlevel) < 15 && Number(localStorage.currentlevel) > 7) {
                crit = Number(localStorage.currentlevel) * 5 * 3;
            }
            else if (Number(localStorage.currentlevel) < 8) {
                crit = Number(localStorage.currentlevel) * 5 * 2;
            }
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
            if (tabIndex == 2) {
                return 0;
            } else if (tabIndex == 3) {
                return this.submitBlanks();
            } else if (tabIndex == 4) {
                return this.submitChoice();
            }
        };
        ///////////////////////////////////////////
        this.clearListQ = function () {
            var maxIndex = 0;
            this.listQ.totalCount().done(function (result) {
                maxIndex = result;
            });
            if (maxIndex != 0) {
                for (var i = 1; i <= maxIndex; i++) {
                    this.listQ.remove(i);
                }
            };
        };
        ////////////////////////////////////////////////add question
        this.addQuestion = function (index, type) {
            this.listQ.insert({
                index: index,
                question: randomQuestion,
                ans: randomAns,
                type: type,
                status: "Incorrect"
            });
        };
        ///////////////////////////////////////////////random list questions
        this.randomThree = function () {
            //alert(randomQuestion);
            randomQuestion = MistakeChasingGameClient.LocalDB.randomFindBugs();
            //alert(randomQuestion);
            randomAns = MistakeChasingGameClient.LocalDB.getFindBugsAns(randomQuestion.id);
            this.addQuestion(1, "FindBugs");
            randomQuestion = MistakeChasingGameClient.LocalDB.randomFillingBlanks();
            randomAns = MistakeChasingGameClient.LocalDB.getFillingBlanksAns(randomQuestion.id);
            this.addQuestion(2, "FillingBlanks");
            randomQuestion = MistakeChasingGameClient.LocalDB.randomSingleChoice();
            randomAns = MistakeChasingGameClient.LocalDB.getSingleChoiceAns(randomQuestion.id);
            this.addQuestion(3, "SingleChoice");
        };
        this.randomFour = function () {
            randomQuestion = MistakeChasingGameClient.LocalDB.randomFindBugs();
            randomAns = MistakeChasingGameClient.LocalDB.getFindBugsAns(randomQuestion.id);
            this.addQuestion(1, "FindBugs");

            var isRepeat = true;
            var count = 0;
            var random1 = randomQuestion;
            while (isRepeat && count < 10) {
                randomQuestion = MistakeChasingGameClient.LocalDB.randomFindBugs();
                randomAns = MistakeChasingGameClient.LocalDB.getFindBugsAns(randomQuestion.id);
                count++;
                if (random1 != randomQuestion) {
                    isRepeat = false;
                    this.addQuestion(2, "FindBugs");
                };
            }
            randomQuestion = MistakeChasingGameClient.LocalDB.randomFillingBlanks();
            randomAns = MistakeChasingGameClient.LocalDB.getFillingBlanksAns(randomQuestion.id);
            this.addQuestion(3, "FillingBlanks");
            randomQuestion = MistakeChasingGameClient.LocalDB.randomSingleChoice();
            randomAns = MistakeChasingGameClient.LocalDB.getSingleChoiceAns(randomQuestion.id);
            this.addQuestion(4, "SingleChoice");
        };
        this.randomFive = function () {
            var isRepeat = true;
            var count = 0;
            randomQuestion = MistakeChasingGameClient.LocalDB.randomFindBugs();
            randomAns = MistakeChasingGameClient.LocalDB.getFindBugsAns(randomQuestion.id);
            this.addQuestion(1, "FindBugs");

            var random1 = randomQuestion;
            while (isRepeat && count < 10) {
                randomQuestion = MistakeChasingGameClient.LocalDB.randomFindBugs();
                randomAns = MistakeChasingGameClient.LocalDB.getFindBugsAns(randomQuestion.id);
                count++;
                if (random1 != randomQuestion) {
                    isRepeat = false;
                    this.addQuestion(2, "FindBugs");
                };
            }
            randomQuestion = MistakeChasingGameClient.LocalDB.randomFillingBlanks();
            randomAns = MistakeChasingGameClient.LocalDB.getFillingBlanksAns(randomQuestion.id);
            this.addQuestion(3, "FillingBlanks");

            isRepeat = true;
            count = 0;
            random1 = randomQuestion;
            while (isRepeat && count < 10) {
                randomQuestion = MistakeChasingGameClient.LocalDB.randomFillingBlanks();
                randomAns = MistakeChasingGameClient.LocalDB.getFillingBlanksAns(randomQuestion.id);
                count++;
                if (random1 != randomQuestion) {
                    isRepeat = false;
                    this.addQuestion(4, "FillingBlanks");
                };
            }
            randomQuestion = MistakeChasingGameClient.LocalDB.randomSingleChoice();
            randomAns = MistakeChasingGameClient.LocalDB.getSingleChoiceAns(randomQuestion.id);
            this.addQuestion(5, "SingleChoice");
        };
        this.randomQuestion = function () {
            this.clearListQ();
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
        ////////////////////////////////////////////////////load question
        this.loadQuestion = function () {
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            ///////////////////////////////////////////////
            var question, index;

            index = Number(localStorage.currentIndex);
            this.listQ.byKey(index).done(function (dataItem) {
                question = dataItem;
            });
            if (question.type == "FindBugs") {
                randomQuestion = question.question;
                randomAns = question.ans;
                this.findBugsTab.loadFindBugs();
                selectedTab(2);
                this.findBugsTab.rendered(true);
            }
            else if (question.type == "FillingBlanks") {
                randomQuestion = question.question;
                randomAns = question.ans;
                this.fillingBlanksTab.loadFillingBlanks();
                selectedTab(3);
                this.fillingBlanksTab.rendered(true);
            }
            else if (question.type == "SingleChoice") {
                randomQuestion = question.question;
                randomAns = question.ans;
                this.singleChoiceTab.loadSingleChoice();
                selectedTab(4);
                this.singleChoiceTab.rendered(true);
            }
        };
    }
})();