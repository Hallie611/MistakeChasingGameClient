(function () {
    "use strict";

    MistakeChasingGameClient.OnlineVM = function (data) {



        var numberPlayer;
        var connected = false;
        this.clockOn = ko.observable(false);
        this.questionVM = new MistakeChasingGameClient.QuestionVM();
        /////////////////////////////////////////////////Du
        var self = this;

        this.ConnectToSever = function () {
            self.questionVM.RoomTab.message('...');
            $.connection.hub.url = "http://localhost:8080/signalr";
            // $.connection.hub.url = "http://signalr-13.apphb.com/signalr";

            // nhan listQ tu sever cho ca 2 client
            $.connection.gamesHub.client.getQuestionList = function (temp) {
                self.questionVM.clearListQ();
                temp.forEach(function (item) {
                    self.questionVM.addQuestionOnline(item);
                });
                //// temp la listQ tra ve cho ca 2 client
                self.ListTab.listDataSource(listQ);
            };

            //
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
                if (localStorage.currentIndex == result.index && result.isMax == true) {
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
                    self.RoomTab.resultPoint("Your Point +" + self.RoomTab.pointwin());
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
                    self.RoomTab.resultPoint("Your Point -" + self.RoomTab.poinlose());
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
        this.processClick = function (item) {
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