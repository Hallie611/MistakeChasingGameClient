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

        var numberPlayer;

        var listQ = new DevExpress.data.ArrayStore({
            key: "index"
        });

        var connected = false;


        //giu index random array question
        if (!localStorage.currentIndex)
            localStorage.currentIndex = 0;
        // giu diem
        if (!localStorage.currentPoint)
            localStorage.currentPoint = 0;
        ///////////////////////////////        
        ///////////////////////zoom
        var myScroll;
        function loaded() {
            myScroll = new iScroll('wrapper', { zoom: true, zoomMax: 2 });
        };
        //////////////////////
        var selectedTab = ko.observable();

        this.clockOn = ko.observable(false);

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
            message: ko.observable(""),
            username: ko.observable(localStorage.username),
            level: ko.observable(localStorage.level),
            point: ko.observable(localStorage.point),
            oname: ko.observable(),
            oplevel: ko.observable(''),
            opoint: ko.observable(),
            pointwin: ko.observable(),
            poinlose: ko.observable(Number(localStorage.level) * 10),
            ResultVisible: ko.observable(),
            resultPoint: ko.observable(),
            ImageResult: ko.observable(),
            result:ko.observable(),
            okResult: function () {
                self.RoomTab.ResultVisible(false);
            }

        };
        ///List Tab
        this.ListTab = {
            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 1;
            }),
            username: ko.observable(localStorage.username),
            oname: ko.observable(),
            player1point: ko.observable(0),
            player2point: ko.observable(0),
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
         
            self.ListTab.player1point(0);
            self.ListTab.player2point(0);
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            this.ListTab.rendered(false);
            this.RoomTab.rendered(true);
            this.RoomTab.point(localStorage.point);
            if ($.connection.hub.state==1) {
                self.RoomTab.message('');
                document.getElementById("opponent").style.display = "none";
                document.getElementById("readybtn").style.display = "none";
                document.getElementById("cntbtn").style.display = "none";
                document.getElementById("Cancelbtn").style.display = "none";
                document.getElementById("findbtn").style.display = "";
                document.getElementById("menubtn").style.display = "";-
                self.RoomTab.message("");
            }
            else if ($.connection.hub.state ==4) {
                self.RoomTab.message('');
                document.getElementById("menubtn").style.display = "";
                document.getElementById("opponent").style.display = "none";
                document.getElementById("readybtn").style.display = "none";
                document.getElementById("findbtn").style.display = "none";
                document.getElementById("Cancelbtn").style.display = "none";
                document.getElementById("cntbtn").style.display = "";
            }

            selectedTab(0);


        };

        this.loadListTab = function () {
            document.getElementById("menubtn").style.display = "none"; 
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            this.RoomTab.rendered(false);
            this.ListTab.rendered(true);
            selectedTab(1);

        };
        function clearListQ() {
            var maxIndex = 0;
            listQ.totalCount().done(function (result) {
                maxIndex = result;
            });
            if (maxIndex != 0) {
                for (var i = 1; i <= maxIndex; i++) {
                    listQ.remove(i);
                }
            }
        };


        this.ConnectToSever = function () {
            self.RoomTab.message('...');
            $.connection.hub.url = "http://localhost:8080/signalr";
            // $.connection.hub.url = "http://signalr-13.apphb.com/signalr";

            // nhan listQ tu sever cho ca 2 client
            $.connection.gamesHub.client.getQuestionList = function (temp) {
                clearListQ();
                temp.forEach(function (item) {
                    listQ.insert({
                        id: item.id,
                        index: item.index,
                        questionId: item.questionId,
                        type: item.type,
                        status: 'available'
                    })
                });
                //// temp la listQ tra ve cho ca 2 client
                self.ListTab.listDataSource(listQ);
            }

            //
            ///ham sver yeu cau tao list Q
            $.connection.gamesHub.client.createQuestionList = function () {
                self.randomQuestion();

                listQ.load().done(function (theArray) {
                    $.connection.gamesHub.server.postQuestion(theArray);
                });
            }

            $.connection.gamesHub.client.refeshAmountOfPlayer = function (message) {
                self.numberPlayer = message.totalClient;
                self.RoomTab.message("Number of player online : " + self.numberPlayer);

            };
            //no opponent
            $.connection.gamesHub.client.noOpponents = function (message) {
                //                self.loadRoomTab();

            };

            $.connection.gamesHub.client.foundOpponent = function (message) {
                self.RoomTab.message("");
                self.RoomTab.oname(message.oName);

                self.RoomTab.oplevel(message.oLevel);
                self.RoomTab.opoint(message.oPoint);
                self.RoomTab.poinlose(Number(localStorage.level) * 10);
                self.RoomTab.pointwin(Number(message.oLevel) * 10);

                document.getElementById("opponent").style.display = "";
                document.getElementById("readybtn").style.display = "";
                document.getElementById("Cancelbtn").style.display = "";
                document.getElementById("findbtn").style.display = "none";
            };


            //sever tra ve ca 2 client deu ready vao game
            $.connection.gamesHub.client.gameReady = function () {
                self.loadListTab();
                self.clockOn(true);
            };

            //update 2 client cau nao lam roi
            $.connection.gamesHub.client.updateCorrectedQuestion = function (result) {
                
                if (result.Name == self.RoomTab.username()) {

                    self.ListTab.player1point(self.ListTab.player1point() + result.point);
                }
                else {
                    
                    self.ListTab.player2point(self.ListTab.player2point() + result.point);
                }
                if (localStorage.currentIndex == result.index && result.isMax==true) {
                    self.loadListTab();
                }
                if (result.isMax) {
                    listQ.update(result.index, { status: result.Name });
                    self.ListTab.listDataSource(listQ);

                }

            }

            $.connection.gamesHub.client.gameOver = function (name) {
                //if (localStorage.username == name.Name) {
                //    DevExpress.ui.dialog.alert("Winner is " + name.Name + " Your Point +" + self.RoomTab.pointwin(), 'Result');
                //    localStorage.point = Number(localStorage.point) + Number(self.RoomTab.pointwin());
                //}
                //else if(name.Name='none'){
                //    DevExpress.ui.dialog.alert("DRAW", 'Result');
                //}
                //else{

                //    DevExpress.ui.dialog.alert("winner is " + name.Name + " Your Point -" + self.RoomTab.poinlose(), 'Result');
                //    localStorage.point = Number(localStorage.point) - Number(self.RoomTab.poinlose());
                //}

            
                if (localStorage.username == name.Name) {
                    self.RoomTab.ImageResult('win.png');
                    self.RoomTab.resultPoint("Your Point +"+self.RoomTab.pointwin());
                    localStorage.point = Number(localStorage.point) + Number(self.RoomTab.pointwin());
                    self.RoomTab.result("WIN");
                }
                else if (name.Name == "none") {
                    self.RoomTab.result("DRAW");
                    self.RoomTab.ImageResult("Draw.png");
                    self.RoomTab.resultPoint("");
                }
                else {
                    self.RoomTab.result("LOSE");
                    self.RoomTab.ImageResult("lose.png");
                    self.RoomTab.resultPoint("Your Point -"+self.RoomTab.poinlose());
                    localStorage.point = Number(localStorage.point) - Number(self.RoomTab.poinlose());
                }
                self.RoomTab.ResultVisible(true);

                self.loadRoomTab();

            }

            $.connection.gamesHub.client.OpponentDisconnect = function () {
                localStorage.point = Number(localStorage.point) + 5;
                DevExpress.ui.dialog.alert('Your Opponent has out of match your point +5', 'Notify');

                self.loadRoomTab();
            }

            $.connection.hub.start().done(function () {
                self.RoomTab.message("");
                $.connection.gamesHub.server.connectSever(localStorage.username, localStorage.level, localStorage.point).done(function () {
                    connected = true;
                    document.getElementById("findbtn").style.display = "";
                    document.getElementById("cntbtn").style.display = "none";
                });
                // hub is now ready
            }).fail(function () {

            });

        }

        this.findOpponent = function () {


            self.RoomTab.message("Finding opponent...");
            $.connection.gamesHub.server.findOpponent();
        };

        this.play = function () {
            $.connection.gamesHub.server.play(1);
        };

        //bao la ben nay da ready
        this.Ready = function () {
            self.RoomTab.message("Watting opponent ready...");
            $.connection.gamesHub.server.playerReady();
        }
        this.Cancel = function () {
            localStorage.point = Number(localStorage.point) - 5;
            DevExpress.ui.dialog.alert('You cancel game, your point -5', 'Notify');
            $.connection.gamesHub.server.outOfMath();
            this.loadRoomTab();
        }
        ////////////////////////////////////////////////////
        /////////////////////////////////////////


        this.bugFound = function () {

            var showMe = document.getElementById("bug");
            showMe.style.borderStyle = "solid";
            var points = difCurrentQ * 5;
            this.CorrectedQuestion(1, points, true);

            return points;
        };
        //////////////////////////////////////////
        //submit method
        this.submitBlanks = function () {
            var maxpoint = difCurrentQ * 2 * 3;

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
            // ham bao cho sever bik da lam cau nay roi
            if (points == maxpoint) {
                this.CorrectedQuestion(localStorage.currentIndex, points, true);
            }
            else {
                this.CorrectedQuestion(localStorage.currentIndex, points, false);
            }
            return points;
        };
        ////////////////////////////////////////
        this.submitChoice = function () {
            var points = 0;
            if (answerSC == this.singleChoiceTab.choiceSC()) {
                points += difCurrentQ * 5;
                this.CorrectedQuestion(localStorage.currentIndex, points, true);
            }
            else {

                this.CorrectedQuestion(localStorage.currentIndex, points, false);
            }

            //            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
            //            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            return points;
        };

        ///
        /////////////////////////////////////////
        this.timeUp = function () {

            this.CorrectedQuestion(0, 0, false);
            var tabIndex = selectedTab();
            if (tabIndex == 2) {
                return 0;
            } else if (tabIndex == 3) {
                return this.submitBlanks();
            } else if (tabIndex == 4) {
                return this.submitChoice();
            }
        };

        ////
        this.CorrectedQuestion = function (index, mark, getMaxPoint) {
            listQ.update(index, { status: 'done' });
            self.ListTab.listDataSource(listQ);
            $.connection.gamesHub.server.correctQuestion(index, mark, getMaxPoint);
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
               // status: "available"
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

            var isRepeat = true;
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
            clearListQ();

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
            
            localStorage.currentIndex = itemData.index;
            if (itemData.type == "Find Bugs" && itemData.status == "available") {
                MistakeChasingGameClient.db.findbugsdb.byKey(itemData.questionId).done(function (dataItem) {
                    randomQuestion = dataItem;

                });
                this.loadFindBugs();
                selectedTab(2);
                this.findBugsTab.rendered(true);
            }
            else if (itemData.type == "Fill Blanks" && itemData.status == "available") {
                MistakeChasingGameClient.db.fillingblankdb.byKey(itemData.questionId).done(function (dataItem) {
                    randomQuestion = dataItem;

                });
                this.loadFillingBlanks();
                selectedTab(3);
                this.fillingBlanksTab.rendered(true);
                document.addEventListener('DOMContentLoaded', loaded, false);
                loaded();
            }
            else if (itemData.type == "Single Choice" && itemData.status == "available") {
                MistakeChasingGameClient.db.multiplechoicedb.byKey(itemData.questionId).done(function (dataItem) {
                    randomQuestion = dataItem;

                });
                this.loadSingleChoice();
                selectedTab(4);
                this.singleChoiceTab.rendered(true);
                document.addEventListener('DOMContentLoaded', loaded, false);
                loaded();
            }
        };

        this.backToHome = function () {
            if ($.connection.hub.state == 1) {
                $.connection.gamesHub.server.outOfMath();
            }
            $.connection.hub.stop();
            MistakeChasingGameClient.app.navigate('home', { root: false });
        }

        ////////////////////////////
        ////////////////////////////////////

    };
})();