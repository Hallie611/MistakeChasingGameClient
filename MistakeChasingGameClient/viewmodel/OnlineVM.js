(function () {
    "use strict";

    MistakeChasingGameClient.OnlineVM = function (data) {

        var isUser = ko.observable(false);
        var answerSC;
        var answer1;
        var answer2;
        var answer3;
        //////////////////////////
        var difCurrentQ;
        var randomQuestion; // = ko.observable();
        var randomAns; // = ko.observable();
        ///////////////////////////////
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
        /////////////////////////
        var numberPlayer;
        var connected = false;
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
            point: ko.observable(localStorage.point),
            oname: ko.observable(),
            oplevel: ko.observable(''),
            opoint: ko.observable(),
            pointwin: ko.observable(),
            poinlose: ko.observable(Number(localStorage.level) * 10),
            ResultVisible: ko.observable(),
            resultPoint: ko.observable(),
            ImageResult: ko.observable(),
            result: ko.observable(),
            okResult: function () {
                self.RoomTab.ResultVisible(false);
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
        ///////////////////////////////////////////////Load tab        
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
        /////////////////////////////////////////////////
        this.loadRoomTab = function () {
            self.ListTab.player1point(0);
            self.ListTab.player2point(0);
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            this.ListTab.rendered(false);
            this.RoomTab.rendered(true);
            this.RoomTab.point(localStorage.point);
            if ($.connection.hub.state == 1) {
                self.RoomTab.message('');
                document.getElementById("opponent").style.display = "none";
                document.getElementById("readybtn").style.display = "none";
                document.getElementById("cntbtn").style.display = "none";
                document.getElementById("Cancelbtn").style.display = "none";
              
                document.getElementById("findbtn").style.display = "";
                
                self.RoomTab.message("");
                document.getElementById("menubtn").style.display = "";
                if (localStorage.point < localStorage.level * 10) {
                    DevExpress.ui.dialog.alert('Your point at least '+localStorage.level*10+'for chasing', 'Not Enough Point').done(
                        function () {
                            MistakeChasingGameClient.app.navigate('home', { root: true });
                        });
                }
            }
            else if ($.connection.hub.state == 4) {
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
            // set maxIndex for clock
            self.setMaxIndex();
            document.getElementById("menubtn").style.display = "none";
            this.singleChoiceTab.rendered(false);
            this.fillingBlanksTab.rendered(false);
            this.findBugsTab.rendered(false);
            this.RoomTab.rendered(false);
            this.ListTab.rendered(true);
            this.ListTab.listDataSource(self.listQ);
            selectedTab(1);
        };

        this.setMaxIndex = function () {
            this.listQ.totalCount().done(function (result) {
                localStorage.maxIndex = result;
            });
        };
        var counter;

        ////////////////////////////////////////////////////////
        this.ConnectToSever = function () {
            self.RoomTab.message('...');
            //$.connection.hub.url = "http://localhost:8080/signalr";
            $.connection.hub.url = "http://signalr-13.apphb.com/signalr";

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
                    self.RoomTab.message(opponent + " ready .Game start after " + count + " s");
                    //Do code for showing the number of seconds here
                }

                
            };            //sever tra ve ca 2 client deu ready vao game
            $.connection.gamesHub.client.gameReady = function () {
                clearInterval(counter);
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
               
                if (result.isMax) {
                    self.listQ.update(result.index, { status: result.Name }); // cái này update cái gì đây
                    self.ListTab.listDataSource(self.listQ);
                }
                if (localStorage.currentIndex == result.index && result.isMax == true) {
                    self.loadListTab();
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
                clearInterval(counter);
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
            self.RoomTab.message("Watting opponent ready ...");
            $.connection.gamesHub.server.playerReady();
        }
        this.Cancel = function () {
            localStorage.point = Number(localStorage.point) - 5;
            DevExpress.ui.dialog.alert('You cancel game, your point -5', 'Notify');
            $.connection.gamesHub.server.outOfMath();
            clearInterval(counter);
            self.RoomTab.message("Click To Opponent");
            self.loadRoomTab();
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
        /////////////////////////////////////////
        this.getQuestion = function (questionId) {
            MistakeChasingGameClient.db.questionDb.byKey(questionId).done(function (dataItem) {
                randomQuestion = dataItem;
                //alert(randomQuestion.id + " random Id getQuestion");
            });
        };
        this.getFindBugsAns = function () {
            randomAns = MistakeChasingGameClient.db.findBugsDb.createQuery().filter(["questionId", "=", randomQuestion.id]).toArray()[0];
        };
        this.getFillingBlanksAns = function () {
            randomAns = MistakeChasingGameClient.db.fillingBlanksDb.createQuery().filter(["questionId", "=", randomQuestion.id]).sortBy("answerIndex").toArray();
        };
        this.getSingleChoiceAns = function () {
            //alert(randomQuestion.id + "random Id getSingleChoiceAns");
            var correctAns = MistakeChasingGameClient.db.singleChoiceDb.createQuery().filter(["questionId", "=", randomQuestion.id]).select("mistakeId").toArray()[0].mistakeId;
            //alert(correctAns + "correctAns getSingleChoiceAns");
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
                            //alert(listAns.length + "length list");
                            randomAns.listAns = [listAns[0].content, listAns[1].content, listAns[2].content];
                            randomAns.ans = MistakeChasingGameClient.db.mistakeTypesDb.createQuery().filter(["id", "=", correctAns]).select("content").toArray()[0].content;
                        };
                    };
                };
            };
        };
        ////////////////////////////////////////////////add question
        this.addQuestionOnline = function (item) {
            this.getQuestion(item.questionId);
            if (item.type == "Find Bugs") {
                this.getFindBugsAns();
            }
            else if (item.type == "Fill Blanks") {
                this.getFillingBlanksAns();
            }
            else if (item.type == "Single Choice") {
                this.getSingleChoiceAns();
            }

            this.listQ.insert({
                index: item.index,
                question: randomQuestion,
                ans: randomAns,
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
               // this.listQ.update(localStorage.currentIndex, { status: "Correct" });
                //}
                //            var points = self.questionVM.submitBlanks();
                //            self.questionVM.listQ.byKey(localStorage.currentIndex).done(function (dataItem) {
                //                // ham bao cho sever bik da lam cau nay roi
                //                if (dataItem.status == "Correct") {
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
            if (answerSC == this.singleChoiceTab.choiceSC()) {
                points += difCurrentQ * 5;
                //this.listQ.update(localStorage.currentIndex, { status: "Correct" });
                //}
                //self.questionVM.listQ.byKey(localStorage.currentIndex).done(function (dataItem) {
                // ham bao cho sever bik da lam cau nay roi
                //if (dataItem.status == "Correct") {
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
            self.CorrectedQuestion(0, 0, false); // cái gì đây? sao lại 0, 0, false
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
            self.listQ.update(index, { status: 'done' }); // update trong các function submit
            self.ListTab.listDataSource(self.listQ); // để trong function load list tab
            $.connection.gamesHub.server.correctQuestion(index, mark, getMaxPoint);
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
          

            if (itemData.type == "Find Bugs" && itemData.status == "Available") {
                randomQuestion = itemData.question;
                randomAns = itemData.ans;
                this.loadFindBugs();
                selectedTab(2);
                this.findBugsTab.rendered(true);
                this.ListTab.rendered(false);
            }
            else if (itemData.type == "Fill Blanks" && itemData.status == "Available") {
                randomQuestion = itemData.question;
                randomAns = itemData.ans;
                this.loadFillingBlanks();
                selectedTab(3);
                this.fillingBlanksTab.rendered(true);
                this.ListTab.rendered(false);
            }
            else if (itemData.type == "Single Choice" && itemData.status == "Available") {
                randomQuestion = itemData.question;
                randomAns = itemData.ans;
                this.loadSingleChoice();
                selectedTab(4);
                this.singleChoiceTab.rendered(true);
                this.ListTab.rendered(false);
            }
        };
        this.backToHome = function () {
            if ($.connection.hub.state == 1) {
                $.connection.gamesHub.server.outOfMath();
            }
            
            $.connection.hub.stop();
            localStorage.currentIndex = 1;
            MistakeChasingGameClient.app.navigate('home', { root: true });
        }




    };
})();