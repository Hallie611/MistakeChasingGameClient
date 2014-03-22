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
        var listQ = new DevExpress.data.ArrayStore({
            key: "index"
        });
        //var listQ = ko.observable();

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
            listDataSource: ko.observable()
        };
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

        this.loadRoomTab = function () {
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            selectedTab(0);
            this.RoomTab.rendered(true);
        };

        this.loadListTab = function () {
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            selectedTab(1);
            this.RoomTab.rendered(false);
            this.ListTab.rendered(true);
        };

        $.connection.hub.url = "http://localhost:8080/signalr";

        // nhan listQ tu sever cho ca 2 client
        $.connection.gamesHub.client.getQuestionList = function (temp) {

            //// temp la listQ tra ve cho ca 2 client
            var listDataSource = new DevExpress.data.DataSource({
                store: temp
            });
            self.ListTab.listDataSource(listDataSource);
        }
        //
        ///ham sver yeu cau tao list Q
        $.connection.gamesHub.client.createQuestionList = function () {
            self.randomQuestion();
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

        //sever tra ve ca 2 client deu ready vao game
        $.connection.gamesHub.client.gameReady = function () {
            self.loadListTab();
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
            
            $.connection.gamesHub.server.findOpponent(localStorage.level);
        };

        this.play = function () {
            $.connection.gamesHub.server.play(1);
        };

        //bao la ben nay da ready
        this.Ready = function () {
            self.RoomTab.message("Watting opponent ready...");
            $.connection.gamesHub.server.playerReady();
        }
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
//            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
//            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            return points;
        };
        ////////////////////////////////////////
        this.submitChoice = function () {
            var points = 0;
            if (answerSC == this.singleChoiceTab.choiceSC()) {
                points += difCurrentQ * 50;
            }
//            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
//            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            return points;
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
        this.addQuestion = function (index, type) {
            listQ.insert({
                index: index,
                questionId: randomQuestion.id,
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
        this.processClick = function (item) {
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            ///////////////////////////////////////////////
            var itemData = item.itemData;
            if (itemData.type == "FindBugs") {
                MistakeChasingGameClient.db.findbugsdb.byKey(itemData.questionId).done(function (dataItem) {
                    randomQuestion = dataItem;
                    //alert(question.question.dif);
                });
                this.loadFindBugs();
                selectedTab(2);
                this.findBugsTab.rendered(true);
            }
            else if (itemData.type == "FillingBlanks") {
                MistakeChasingGameClient.db.fillingblankdb.byKey(itemData.questionId).done(function (dataItem) {
                    randomQuestion = dataItem;
                    //alert(question.question.dif);
                });
                this.loadFillingBlanks();
                selectedTab(3);
                this.fillingBlanksTab.rendered(true);
            }
            else if (itemData.type == "SingleChoice") {
                MistakeChasingGameClient.db.multiplechoicedb.byKey(itemData.questionId).done(function (dataItem) {
                    randomQuestion = dataItem;
                    //alert(question.question.dif);
                });
                this.loadSingleChoice();
                selectedTab(4);
                this.singleChoiceTab.rendered(true);
            }
        }
    };
})();