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
                self.questionVM.ListTab.listDataSource(listQ);
            };
            //
            $.connection.gamesHub.client.refeshAmountOfPlayer = function (message) {
                self.numberPlayer = message.totalClient;
                self.questionVM.RoomTab.message("Number of player online : " + self.numberPlayer);

            };
            //no opponent
            $.connection.gamesHub.client.noOpponents = function (message) {
                //                self.loadRoomTab();
            };

            $.connection.gamesHub.client.foundOpponent = function (message) {
                self.questionVM.RoomTab.message("");
                self.questionVM.RoomTab.oname(message.oName);

                self.questionVM.RoomTab.oplevel(message.oLevel);
                self.questionVM.RoomTab.opoint(message.oPoint);
                self.questionVM.RoomTab.poinlose(Number(localStorage.level) * 10);
                self.questionVM.RoomTab.pointwin(Number(message.oLevel) * 10);

                document.getElementById("opponent").style.display = "";
                document.getElementById("readybtn").style.display = "";
                document.getElementById("Cancelbtn").style.display = "";
                document.getElementById("findbtn").style.display = "none";
            };

            //sever tra ve ca 2 client deu ready vao game
            $.connection.gamesHub.client.gameReady = function () {
                self.questionVM.loadListTab();
                self.clockOn(true);
            };

            //update 2 client cau nao lam roi
            $.connection.gamesHub.client.updateCorrectedQuestion = function (result) {
                if (result.Name == self.questionVM.RoomTab.username()) {
                    self.questionVM.ListTab.player1point(self.questionVM.ListTab.player1point() + result.point);
                }
                else {
                    self.questionVM.ListTab.player2point(self.questionVM.ListTab.player2point() + result.point);
                }
                if (localStorage.currentIndex == result.index && result.isMax == true) {
                    self.questionVM.loadListTab();
                }
                if (result.isMax) {
                    self.questionVM.listQ.update(result.index, { status: result.Name });
                    self.questionVM.ListTab.listDataSource(listQ);
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
                    self.questionVM.RoomTab.ImageResult('win.png');
                    self.questionVM.RoomTab.resultPoint("Your Point +" + self.questionVM.RoomTab.pointwin());
                    localStorage.point = Number(localStorage.point) + Number(self.questionVM.RoomTab.pointwin());
                    self.questionVM.RoomTab.result("WIN");
                }
                else if (name.Name == "none") {
                    self.questionVM.RoomTab.result("DRAW");
                    self.questionVM.RoomTab.ImageResult("Draw.png");
                    self.questionVM.RoomTab.resultPoint("");
                }
                else {
                    self.questionVM.RoomTab.result("LOSE");
                    self.questionVM.RoomTab.ImageResult("lose.png");
                    self.questionVM.RoomTab.resultPoint("Your Point -" + self.questionVM.RoomTab.poinlose());
                    localStorage.point = Number(localStorage.point) - Number(self.questionVM.RoomTab.poinlose());
                }
                self.questionVM.RoomTab.ResultVisible(true);
                self.questionVM.loadRoomTab();
            }

            $.connection.gamesHub.client.OpponentDisconnect = function () {
                localStorage.point = Number(localStorage.point) + 5;
                DevExpress.ui.dialog.alert('Your Opponent has out of match your point +5', 'Notify');
                self.questionVM.loadRoomTab();
            }

            $.connection.hub.start().done(function () {
                self.questionVM.RoomTab.message("");
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
            self.questionVM.RoomTab.message("Finding opponent...");
            $.connection.gamesHub.server.findOpponent();
        };

        this.play = function () {
            $.connection.gamesHub.server.play(1);
        };

        //bao la ben nay da ready
        this.Ready = function () {
            self.questionVM.RoomTab.message("Watting opponent ready...");
            $.connection.gamesHub.server.playerReady();
        }
        this.Cancel = function () {
            localStorage.point = Number(localStorage.point) - 5;
            DevExpress.ui.dialog.alert('You cancel game, your point -5', 'Notify');
            $.connection.gamesHub.server.outOfMath();
            self.questionVM.loadRoomTab();
        }
        //////////////////////////////////////////////////////submit method
        /////////////////////////////////////////
        this.bugFound = function () {
            var points = self.questionVM.bugFound();
            this.CorrectedQuestion(1, points, true);
            return points;
        };   
        this.submitBlanks = function () {
            var points = self.questionVM.submitBlanks();
            self.questionVM.listQ.byKey(localStorage.currentIndex).done(function (dataItem) {
                // ham bao cho sever bik da lam cau nay roi
                if (dataItem.status == "Correct") {
                    this.CorrectedQuestion(localStorage.currentIndex, points, true);
                }
                else {
                    this.CorrectedQuestion(localStorage.currentIndex, points, false);
                }
            });
            return points;
        };
        this.submitChoice = function () {
            var points = self.questionVM.submitChoice();
            self.questionVM.listQ.byKey(localStorage.currentIndex).done(function (dataItem) {
                // ham bao cho sever bik da lam cau nay roi
                if (dataItem.status == "Correct") {
                    this.CorrectedQuestion(localStorage.currentIndex, points, true);
                }
                else {
                    this.CorrectedQuestion(localStorage.currentIndex, points, false);
                }
            });
            return points;
        };
        /////////////////////////////////////////time up
        this.timeUp = function () {
            this.CorrectedQuestion(0, 0, false); // cái gì đây? sao lại 0, 0, false
            self.questionVM.timeUp();
        };
        ///////////////////////////////////////////////
        this.CorrectedQuestion = function (index, mark, getMaxPoint) {
            //listQ.update(index, { status: 'done' }); // update trong các function submit
            //self.questionVM.ListTab.listDataSource(self.questionVM.listQ);// để trong function load list tab
            $.connection.gamesHub.server.correctQuestion(index, mark, getMaxPoint);
        };
        /////////////////////////////////////////load question
        this.processClick = function (item) {
            self.questionVM.loadQuestionOnline(item);
        };

        this.backToHome = function () {
            if ($.connection.hub.state == 1) {
                $.connection.gamesHub.server.outOfMath();
            }
            $.connection.hub.stop();
            MistakeChasingGameClient.app.navigate('home', { root: false });
        }        
    };
})();