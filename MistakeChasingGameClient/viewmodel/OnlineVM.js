(function () {
    "use strict";

    MistakeChasingGameClient.OnlineVM = function (data) {

        var checkConnect;

        //////////////////////////
        var difCurrentQ;
        var randomQuestion; // = ko.observable();
        var randomAns; // = ko.observable();
        ///////////////////////////////
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
        /////////////////////////
        var numberPlayer;
        this.clockOn = ko.observable(false);
        //this.questionVM = new MistakeChasingGameClient.QuestionVM();
        /////////////////////////////////////////////////Du
        var self = this;
        var selectedTab = ko.observable(0);

        this.RoomTab = {
            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 0;
            }),
            numberPlayer: ko.observable(),
            message: ko.observable(""),
            username: ko.observable(localStorage.username),
            level: ko.observable(localStorage.level),
            rank: ko.observable(localStorage.rank),
            point: ko.observable(localStorage.point),
            oname: ko.observable(),
            oplevel: ko.observable(''),
            opoint: ko.observable(),
            pointwin: ko.observable(),
            poinlose: ko.observable(Number(localStorage.level) * 10),
            fbtndisable: ko.observable(true),
            readyDisable: ko.observable(false),
            loadRoomTab: function () {
                checkConnect = true;
                self.ListTab.player1point(0);
                self.ListTab.player2point(0);
                self.singleChoiceTab.rendered(false);
                self.fillingBlanksTab.rendered(false);
                self.findBugsTab.rendered(false);
                self.ListTab.rendered(false);
                self.RoomTab.rendered(true);

                self.RoomTab.point(localStorage.point);
                self.RoomTab.fbtndisable(true);
                if (localStorage.point < localStorage.level * 10) {
                    DevExpress.ui.dialog.alert('Required point for level ' + localStorage.level + ' is ' + localStorage.level * 10 + '. You can earn more points in Training.', 'Not enough points').done(
                    function () {
                        checkConnect = false;
                        MistakeChasingGameClient.app.navigate('home', { root: true });
                    });
                }
                else {
                    if ($.connection.hub.state != 1) {
                        self.RoomTab.message('Connecting...');
                        document.getElementById("findbtn").style.display = "none";
                        document.getElementById("menubtn").style.display = "none";
                        document.getElementById("opponent").style.display = "none";
                        document.getElementById("readybtn").style.display = "none";
                        document.getElementById("Cancelbtn").style.display = "none";
                        document.getElementById("levelImage").style.display = "";
                        self.ConnectToSever();
                        
                    }
                    else {
                        self.RoomTab.message('');
                        self.RoomTab.fbtndisable(false);
                        self.RoomTab.readyDisable(false);
                        document.getElementById("levelImage").style.display = "";
                        document.getElementById("opponent").style.display = "none";
                        document.getElementById("readybtn").style.display = "none";
                        document.getElementById("Cancelbtn").style.display = "normal";
                        document.getElementById("findbtn").style.display = "";
                        self.RoomTab.message("");
                        document.getElementById("menubtn").style.display = "";
                    }
                }
                selectedTab(0);
            }
        };
        this.ListTab = {
            rendered: ko.observable(false),
            tabVisible: ko.computed(function () {
                return selectedTab() === 1;
            }),
            username: ko.observable(localStorage.username),
            oname: ko.observable(),
            player1point: ko.observable(0),
            player2point: ko.observable(0),
            listDataSource: ko.observable(),

            ResultVisible: ko.observable(),
            resultPoint: ko.observable(),
            ImageResult: ko.observable(),
            result: ko.observable(),

            okResult: function () {
                self.ListTab.ResultVisible(false);
                self.RoomTab.loadRoomTab();
            },
            loadListTab: function () {
                // set maxIndex for clock
                self.setMaxIndex();
                document.getElementById("menubtn").style.display = "none";
                self.singleChoiceTab.rendered(false);
                self.fillingBlanksTab.rendered(false);
                self.findBugsTab.rendered(false);
                self.RoomTab.rendered(false);
                self.ListTab.rendered(true);
                self.ListTab.listDataSource(self.listQ);
                selectedTab(1);
            }
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
        ////////////////////////////////////////////////////////
        this.setMaxIndex = function () {
            this.listQ.totalCount().done(function (result) {
                localStorage.maxIndex = result;
            });
        };
        var counter;
        ////////////////////////////////////////////////////////
        this.ConnectToSever = function () {

            //$.connection.hub.url = "http://localhost:8080/signalr";
            $.connection.hub.url = "http://signalr-13.apphb.com/signalr";

            checkConnect=true;
            // nhan listQ tu sever cho ca 2 client
            $.connection.gamesHub.client.getQuestionList = function (temp) {
                self.clearListQ();
                temp.forEach(function (item) {
                    self.addQuestionOnline(item);
                });
                //// temp la listQ tra ve cho ca 2 client
                self.ListTab.listDataSource(self.listQ);
            };
            //
            $.connection.gamesHub.client.refeshAmountOfPlayer = function (message) {
                self.numberPlayer = message.totalClient;
                self.RoomTab.message("Number of players online : " + self.numberPlayer);
            };
            //no opponent
            $.connection.gamesHub.client.noOpponents = function (message) {
                //                self.loadRoomTab();
            };

            $.connection.gamesHub.client.foundOpponent = function (message) {
                clearInterval(counter);

                self.RoomTab.message("");
                self.RoomTab.oname(message.oName);

                self.RoomTab.oplevel(message.oLevel);
                self.RoomTab.opoint(message.oPoint);
                self.RoomTab.poinlose(Number(localStorage.level) * 10);
                self.RoomTab.pointwin(Number(message.oLevel) * 10);

                document.getElementById("levelImage").style.display = "none";
                document.getElementById("opponent").style.display = "";
                document.getElementById("readybtn").style.display = "";
                document.getElementById("Cancelbtn").style.display = "";
                document.getElementById("findbtn").style.display = "none";
                document.getElementById("menubtn").style.display = "none";
            };

            $.connection.gamesHub.client.oponentReady = function (opponent) {
                var count = 10;
                counter = setInterval(timer, 1000); //1000 will  run it every 1 second

                function timer() {
                    count = count - 1;
                    if (count <= 0) {
                        clearInterval(counter);
                        //counter ended, do something here
                        $.connection.gamesHub.server.playerReady();
                        return;
                    }
                    self.RoomTab.message(opponent + " is ready. Start after " + count + " s");
                    //Do code for showing the number of seconds here
                }
            };

            //sever tra ve ca 2 client deu ready vao game
            $.connection.gamesHub.client.gameReady = function () {
                document.getElementById("menubtn").style.display = "none";
                clearInterval(counter);
                self.ListTab.loadListTab();
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

                if (result.isMax) {
                    self.listQ.update(result.index, { status: result.Name }); // cái này update cái gì đây
                    self.ListTab.listDataSource(self.listQ);
                }
                if (localStorage.currentIndex == result.index && result.isMax == true) {
                    self.ListTab.loadListTab();
                }
            }

            $.connection.gamesHub.client.gameOver = function (name) {



                if (localStorage.username == name.Name) {
                    self.clockOn(false);
                    self.ListTab.ImageResult('win.png');
                    self.ListTab.resultPoint("Your point +" + self.RoomTab.pointwin());
                    localStorage.point = Number(localStorage.point) + Number(self.RoomTab.pointwin());
                    self.ListTab.result("WIN");
                    MistakeChasingGameClient.LocalDB.insertHistory(self.RoomTab.oname(), "W", self.RoomTab.pointwin());
                }
                else if (name.Name == "none") {
                    self.clockOn(false);
                    self.ListTab.result("DRAW");
                    self.ListTab.ImageResult("Draw.png");
                    self.ListTab.resultPoint("");
                    MistakeChasingGameClient.LocalDB.insertHistory(self.RoomTab.oname(), "D", 0);
                }
                else {
                    self.clockOn(false);
                    self.ListTab.result("LOSE");
                    self.ListTab.ImageResult("lose.png");
                    self.ListTab.resultPoint("Your point -" + self.RoomTab.poinlose());
                    localStorage.point = Number(localStorage.point) - Number(self.RoomTab.poinlose());
                    MistakeChasingGameClient.LocalDB.insertHistory(self.RoomTab.oname(), "L", self.RoomTab.poinlose());
                }
                self.ListTab.ResultVisible(true);

            }

            $.connection.gamesHub.client.OpponentDisconnect = function () {
                self.clockOn(false);
                localStorage.point = Number(localStorage.point) + 5;
                DevExpress.ui.dialog.alert('Your opponent has canceled the match. You earn 5 points.', 'Canceled');
                self.RoomTab.loadRoomTab();
                clearInterval(counter);
            }

            $.connection.hub.disconnected(function () {
                if (checkConnect==true) {
                    DevExpress.ui.dialog.alert("Can not connect to server!", 'Connection Error').done(function () {
                        MistakeChasingGameClient.app.navigate('home', { root: true });
                    });
                }
            });

            $.connection.hub.start().done(function () {
                self.RoomTab.message('');
                self.RoomTab.fbtndisable(false);
                self.RoomTab.readyDisable(false);
                document.getElementById("levelImage").style.display = "";
                document.getElementById("opponent").style.display = "none";
                document.getElementById("readybtn").style.display = "none";
                document.getElementById("Cancelbtn").style.display = "normal";
                document.getElementById("findbtn").style.display = "";
                self.RoomTab.message("");
                document.getElementById("menubtn").style.display = "";
                $.connection.gamesHub.server.connectSever(localStorage.username, localStorage.level, localStorage.point);
                // hub is now ready
            }).fail(function () {
                DevExpress.ui.dialog.alert("Check Your Connection!").done(function () {
                    MistakeChasingGameClient.app.navigate('home', { root: true });
                });

            });
        }

        this.findOpponent = function () {
            self.RoomTab.fbtndisable(true);
            $.connection.gamesHub.server.findOpponent();
            var count = 30;
            counter = setInterval(timer, 1000); //1000 will  run it every 1 second
            function timer() {
                count = count - 1;
                if (count <= 0) {
                    window.clearInterval(counter);
                    self.RoomTab.message("No opponent found. Please try again.");
                    $.connection.gamesHub.server.foundNoOpponents();
                    self.RoomTab.fbtndisable(false);
                }
                else {
                    self.RoomTab.message("Finding opponent..." + count + " s");
                }
            }


        };

        this.play = function () {
            $.connection.gamesHub.server.play(1);
        };

        //bao la ben nay da ready
        this.Ready = function () {
           
            self.RoomTab.readyDisable(true);
            self.RoomTab.message("Waiting for " + self.RoomTab.oname() + " to be ready ...");
            $.connection.gamesHub.server.playerReady();
        }
        this.disconnect = function () {
            $.connection.hub.stop();
        }

        this.Cancel = function () {
            DevExpress.ui.dialog.confirm("Cancel the match? You will lose points.", "Confirm ")
                .done(function (dialogResult) {
                    if (dialogResult) {
                        self.clockOn(false);
                        localStorage.point = Number(localStorage.point) - 5;
                        DevExpress.ui.dialog.alert('You canceled the match, you lost 5 points.', 'Notify');
                        $.connection.gamesHub.server.outOfMath();
                        clearInterval(counter);
                        self.RoomTab.message("Click to find opponent");
                        self.RoomTab.loadRoomTab();
                    }
                });
        }
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
        this.addQuestionOnline = function (item) {
            var question = MistakeChasingGameClient.LocalDB.getQuestion(item.questionId);
            //alert("go here " + item.questionId + " " + question);
            if (item.type == "Find Bugs") {
                var answer = MistakeChasingGameClient.LocalDB.getFindBugsAns(item.questionId);
                //alert("answer " + item.questionId + " " + answer);
            }
            else if (item.type == "Fill Blanks") {
                var answer = MistakeChasingGameClient.LocalDB.getFillingBlanksAns(item.questionId);
                //alert("answer " + item.questionId + " " + answer);
            }
            else if (item.type == "Single Choice") {
                var answer = MistakeChasingGameClient.LocalDB.getSingleChoiceAns(item.questionId);
                //alert("answer " + item.questionId + " " + answer);
            }

            this.listQ.insert({
                index: item.index,
                question: question,
                ans: answer,
                type: item.type,
                status: "Available"
            });
            //alert(randomAns + "inserted");
        };
        //////////////////////////////////////////////////////submit method
        this.bugFound = function () {
            //var points = self.questionVM.bugFound();
            var showMe = document.getElementById("bug");
            showMe.style.borderStyle = "solid";
            var points = difCurrentQ * 5;
            //this.listQ.update(localStorage.currentIndex, { status: "Correct" });
            self.CorrectedQuestion(localStorage.currentIndex, points, true);
            return points;
        };
        this.submitBlanks = function () {
            var points = 0;
            if (this.fillingBlanksTab.choice1() == self.fillingBlanksTab.answer1) {
                points += difCurrentQ * 2;
            }
            if (this.fillingBlanksTab.choice2() == self.fillingBlanksTab.answer2) {
                points += difCurrentQ * 2;
            }
            if (this.fillingBlanksTab.choice3() == self.fillingBlanksTab.answer3) {
                points += difCurrentQ * 2;
            }
            if (points == difCurrentQ * 6) {
                self.CorrectedQuestion(localStorage.currentIndex, points, true);
            }
            else {
                self.CorrectedQuestion(localStorage.currentIndex, points, false);
            }
            //});
            return points;
        };
        this.submitChoice = function () {
            var points = 0;
            if (self.singleChoiceTab.answerSC == this.singleChoiceTab.choiceSC()) {
                points += difCurrentQ * 5;
                self.CorrectedQuestion(localStorage.currentIndex, points, true);
            }
            else {
                self.CorrectedQuestion(localStorage.currentIndex, points, false);
            }
            //});
            return points;
        };
        /////////////////////////////////////////time up
        this.timeUp = function () {
            self.CorrectedQuestion(0, 0, false);
            //self.questionVM.timeUp();
            var tabIndex = selectedTab();
            if (tabIndex == 2) {
                return 0;
            } else if (tabIndex == 3) {
                return this.submitBlanks();
            } else if (tabIndex == 4) {
                return this.submitChoice();
            }
        };
        ///////////////////////////////////////////////
        this.CorrectedQuestion = function (index, mark, getMaxPoint) {
            if (getMaxPoint == false) {
                self.listQ.update(index, { status: 'Done' }); // update trong các function submit
            }
            self.ListTab.listDataSource(self.listQ); // để trong function load list tab
            $.connection.gamesHub.server.postAnswer(index, mark, getMaxPoint);
        };
        /////////////////////////////////////////load question
        this.processClick = function (item) {
            //alert(item + "process click");
            //self.questionVM.loadQuestionOnline(item);
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);

            this.RoomTab.rendered(false);
            ///////////////////////////////////////////////
            var itemData = item.itemData;
            localStorage.currentIndex = itemData.index;
            randomQuestion = itemData.question;
            randomAns = itemData.ans;
            //alert(randomQuestion.id + " process click");

            if (itemData.type == "Find Bugs" && itemData.status == "Available") {

                this.findBugsTab.loadFindBugs();
                selectedTab(2);
                this.findBugsTab.rendered(true);
                this.ListTab.rendered(false);
            }
            else if (itemData.type == "Fill Blanks" && itemData.status == "Available") {

                this.fillingBlanksTab.loadFillingBlanks();
                selectedTab(3);
                this.fillingBlanksTab.rendered(true);
                this.ListTab.rendered(false);
            }
            else if (itemData.type == "Single Choice" && itemData.status == "Available") {

                this.singleChoiceTab.loadSingleChoice();
                selectedTab(4);
                this.singleChoiceTab.rendered(true);
                this.ListTab.rendered(false);
            }
        };
        this.backToHome = function () {

            checkConnect = false;
            if ($.connection.hub.state == 1) {
                $.connection.gamesHub.server.outOfMath();
            }
            clearInterval(counter);
            //$.connection.hub.stop();
            localStorage.currentIndex = 1;
            localStorage.currentPoint = 0;
            localStorage.currentlevel = 0;
            MistakeChasingGameClient.app.navigate('home', { root: true });
        }
    };
})();