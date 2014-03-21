(function () {
    "use strict";


    MistakeChasingGameClient.OnlineVM = function (data) {
        ///////////////////////////////////////HA
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
                return selectedTab() === 2;
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
                return selectedTab() === 3;
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
                return selectedTab() === 4;
            }),
            listAns: ko.observable(),
            choiceSC: ko.observable('')
        };













        /////////////////////////////////////////////////Du
        var self = this;

        this.RoomTab = {

            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 0;
            }),
            numberPlayer: ko.observable(),
            message: ko.observable(),
            username: ko.observable(localStorage.username),
            level: ko.observable(localStorage.level),
            point: ko.observable(localStorage.point),
            oname: ko.observable(),
            oplevel: ko.observable(),
            opoint: ko.observable()

        };


        ///List Tab
        this.ListTab = {
            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 1;
            }),
            test: ko.observable(localStorage.username),
            question1: ko.observable(),
            question2 :ko.observable(),
            question3 :ko.observable()

        };


        this.loadRoomTab = function () {
            selectedTab(0);
            this.RoomTab.rendered(true);
        };

        this.loadListTab = function () {
            selectedTab(1);
            this.RoomTab.rendered(false);
            this.ListTab.rendered(true);
        };




        $.connection.hub.url = "http://localhost:8080/signalr";


        // nhan listQ tu sever cho ca 2 client
        $.connection.gamesHub.client.getQuestionList = function (temp) {
            question1("a");
            
        }
        //
        ///ham sver yeu cau tao list Q
        var list;
        $.connection.gamesHub.client.createQuestionList = function () {
            listQ.load().done(function (theArray) {
                $.connection.gamesHub.server.getValue(theArray);
            });
           
        }

        //no opponent
        $.connection.gamesHub.client.noOpponents = function (message) {

            self.RoomTab.message("There is no opponent Try Again later");
            //    alert("Looking for an opponent!");
        };

        $.connection.gamesHub.client.foundOpponent = function (message) {
            self.RoomTab.message("");
            self.RoomTab.oname(message.oName);
            self.RoomTab.oplevel(message.oLevel);
            self.RoomTab.opoint(message.oPoint);
            document.getElementById("opponent").style.display = "initial";
            document.getElementById("readybtn").style.display = "inline-block";
            document.getElementById("findbtn").style.display = "none";
        };



        $.connection.hub.start().done(function () {
            //alert("connected");

            $.connection.gamesHub.server.register(localStorage.username, localStorage.level, localStorage.point).done(function () {
                //  alert('added');
            });

            // hub is now ready
        }).fail(function () {
            alert("can not connect to sever");
        });


        this.findOpponent = function () {

            this.randomQuestion();
            $.connection.gamesHub.server.findOpponent(localStorage.level);
        };

        this.play = function () {
            $.connection.gamesHub.server.play(1);
        };


        






        ////////////////////////////////////////////////////
        
        

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
            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            return points;
        };
        ////////////////////////////////////////
        this.submitChoice = function () {
            var points = 0;
            if (answerSC == this.singleChoiceTab.choiceSC()) {
                points += difCurrentQ * 50;
            }
            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
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
            var filteredFindbugs = MistakeChasingGameClient.db.findbugsdb.createQuery().filter(["dif", "=", Number(localStorage.level)]).select("id").sortBy("id").toArray();
            randomQuestion = filteredFindbugs[Math.floor(Math.random() * filteredFindbugs.length)];
        };
        this.randomFillingBlanks = function () {
            var filteredFillBlank = MistakeChasingGameClient.db.fillingblankdb.createQuery().filter(["dif", "=", Number(localStorage.level)]).select("id").sortBy("id").toArray();
            randomQuestion = filteredFillBlank[Math.floor(Math.random() * filteredFillBlank.length)];
        };
        this.randomSingleChoice = function () {
            var filteredSingle = MistakeChasingGameClient.db.multiplechoicedb.createQuery().filter(["dif", "=", Number(localStorage.level)]).select("id").sortBy("id").toArray();
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



        



        var listQ = new DevExpress.data.ArrayStore({
            key: "index"
        });
        //////////////////////////
        this.randomQuestion = function () {
            //giu level khi chuyen view    
            //            if (Number(params) % 1 == 0)
            //                localStorage.currentlevel = params;

            if (Number(localStorage.level) <= 21 && Number(localStorage.level) > 14) {
                localStorage.maxIndex = 5;
            }
            else if (Number(localStorage.level) < 15 && Number(localStorage.level) > 7) {
                localStorage.maxIndex = 4;
            }
            else if (Number(localStorage.level) < 8) {
                localStorage.maxIndex = 3;
            }
            ////////////////////////////////////////
            if (Number(localStorage.maxIndex) == 3) {
                this.randomFindBugs();
                listQ.insert({
                    index: 1,
                    questionId: randomQuestion.id,
                    type: "FindBugs"
                });
                this.randomFillingBlanks();
                listQ.insert({
                    index: 2,
                    questionId: randomQuestion.id,
                    type: "FillingBlanks"
                });
                this.randomSingleChoice();
                listQ.insert({
                    index: 3,
                    questionId: randomQuestion.id,
                    type: "SingleChoice"
                });
            }
            else if (Number(localStorage.maxIndex) == 4) {
                var isRepeat = true;
                var random1;
                this.randomFindBugs();
                listQ.insert({
                    index: 1,
                    questionId: randomQuestion.id,
                    type: "FindBugs"
                });
                random1 = randomQuestion;
                while (isRepeat) {
                    this.randomFindBugs();
                    if (random1 != randomQuestion) {
                        isRepeat = false;
                        listQ.insert({
                            index: 2,
                            questionId: randomQuestion.id,
                            type: "FindBugs"
                        });
                    };
                }
                this.randomFillingBlanks();
                listQ.insert({
                    index: 3,
                    questionId: randomQuestion.id,
                    type: "FillingBlanks"
                });
                this.randomSingleChoice();
                listQ.insert({
                    index: 4,
                    questionId: randomQuestion.id,
                    type: "SingleChoice"
                });
            }
            else if (Number(localStorage.maxIndex) == 5) {
                var isRepeat = true;
                var random1;
                this.randomFindBugs();
                listQ.insert({
                    index: 1,
                    questionId: randomQuestion.id,
                    type: "FindBugs"
                });
                random1 = randomQuestion;
                while (isRepeat) {
                    this.randomFindBugs();
                    if (random1 != randomQuestion) {
                        isRepeat = false;
                        listQ.insert({
                            index: 2,
                            questionId: randomQuestion.id,
                            type: "FindBugs"
                        });
                    };
                }
                this.randomFillingBlanks();
                listQ.insert({
                    index: 3,
                    questionId: randomQuestion.id,
                    type: "FillingBlanks"
                });
                isRepeat = true;
                random1 = randomQuestion;
                while (isRepeat) {
                    this.randomFillingBlanks();
                    if (random1 != randomQuestion) {
                        isRepeat = false;
                        listQ.insert({
                            index: 4,
                            questionId: randomQuestion.id,
                            type: "FillingBlanks"
                        });
                    };
                }
                this.randomSingleChoice();
                listQ.insert({
                    index: 5,
                    questionId: randomQuestion.id,
                    type: "SingleChoice"
                });
            }
        };

        /////////////////////////////
        this.loadQuestion = function () {
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            ///////////////////////////////////////////////
            var maxIndex, question, index;
            listQ.totalCount().done(function (result) {
                maxIndex = result;
                //alert(maxIndex);
            });
            index = Number(localStorage.currentIndex);
            listQ.byKey(index).done(function (dataItem) {
                question = dataItem;
                //alert(question.question.dif);
            });
            if (question.type == "FindBugs") {
                randomQuestion = question.question;
                this.loadFindBugs();
                selectedTab(2);
                this.findBugsTab.rendered(true);
            }
            else if (question.type == "FillingBlanks") {
                randomQuestion = question.question;
                this.loadFillingBlanks();
                selectedTab(3);
                this.fillingBlanksTab.rendered(true);
            }
            else if (question.type == "SingleChoice") {
                randomQuestion = question.question;
                this.loadSingleChoice();
                selectedTab(4);
                this.singleChoiceTab.rendered(true);
                for (var i = 1; i <= maxIndex; i++) {
                    listQ.remove(i);
                }
            }
        };
        ////////////////////////////
    
    };
})();