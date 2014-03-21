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




        var idtext = 0;

        $.connection.hub.url = "http://localhost:8080/signalr";


        // nhan listQ tu sever cho ca 2 client
        $.connection.gamesHub.client.getQuestionList = function (listQ) {
            // alert("getted question list")
            //self.question1(listQ[0].id);
            //self.question2(listQ[1].id);
            //self.question3(listQ[2].id);
        }
        //


        $.connection.gamesHub.client.refeshAmountOfPlayer = function (message) {
            //self.text(self.text() + name + " : " + message);
            //alert(self.store.length)
            // alert(message);
            self.username("Welcome : " + localStorage.username);
            self.numberPlayer('Number of player: ' + message.totalClient);
        };

        //no opponent
        $.connection.gamesHub.client.noOpponents = function (message) {

            self.message("There is no opponent Try Again later");
            //    alert("Looking for an opponent!");
        };

        $.connection.gamesHub.client.foundOpponent = function (message) {
            self.message("");
            self.oname(message.oName);
            self.oplevel(message.oLevel);
            self.opoint(message.oPoint);
            document.getElementById("opponent").style.display = "initial";
            document.getElementById("readybtn").style.display = "inline-block";
            document.getElementById("findbtn").style.display = "none";
        };

        //add done question
        $.connection.gamesHub.client.addMarkerPlacement = function (message) {
            .4
            document.getElementById("question" + message.MarkerPosition).style.backgroundColor = "red";
            self.question1(message.OpponentName + "has checked")
            //alert(message.OpponentName + " has checked question " + message.MarkerPosition);
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

        this.Ready = function () {
            //client thap nhat tao listQ roi chuyen len sever
            //$.connection.gamesHub.client.createQuestionList = function () {

            //    alert("aaa");
            //    $.connection.gamesHub.server.getValue(localStorage.point);
            //}
            MistakeChasingGameClient.app.navigate('User');

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
            var filteredFindbugs = MistakeChasingGameClient.db.findbugsdb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").toArray();
            randomQuestion = filteredFindbugs[Math.floor(Math.random() * filteredFindbugs.length)];
        };
        this.randomFillingBlanks = function () {
            var filteredFillBlank = MistakeChasingGameClient.db.fillingblankdb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").toArray();
            randomQuestion = filteredFillBlank[Math.floor(Math.random() * filteredFillBlank.length)];
        };
        this.randomSingleChoice = function () {
            var filteredSingle = MistakeChasingGameClient.db.multiplechoicedb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").toArray();
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
        this.loadQuestion = function () {
            ////giu level khi chuyen view    
            //if (Number(params) % 1 == 0)
            //    localStorage.currentlevel = params;
            //if (Number(localStorage.currentlevel) < 8) {
            //    localStorage.maxIndex = 3;
            //} 
            //this.singleChoiceTab.rendered(false);
            //this.fillingBlanksTab.rendered(false);
            //this.findBugsTab.rendered(false);
            //////////////////////////////////////////
            //if (Number(localStorage.maxIndex) < 4 && Number(localStorage.currentIndex) == 1) {
            //    this.randomFindBugs();
            //    this.loadFindBugs();                
            //    selectedTab(0);
            //    this.findBugsTab.rendered(true);
            //}
            //else if (Number(localStorage.maxIndex) < 4 && Number(localStorage.currentIndex) == 2) {
            //    this.randomFillingBlanks();
            //    this.loadFillingBlanks();
            //    selectedTab(1);
            //    this.fillingBlanksTab.rendered(true);
            //}
            //else if (Number(localStorage.maxIndex) < 4 && Number(localStorage.currentIndex) == 3) {
            //    this.randomSingleChoice();
            //    this.loadSingleChoice();
            //    selectedTab(2);
            //    this.singleChoiceTab.rendered(true);
            //};

                selectedTab(0);
                this.RoomTab.rendered(true);
        };



    
    };
})();