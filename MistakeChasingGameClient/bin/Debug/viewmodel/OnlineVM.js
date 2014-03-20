(function () {
    "use strict";


    MistakeChasingGameClient.OnlineVM = function (data) {

        var self = this;
        self.numberPlayer = ko.observable();
        self.message = ko.observable();
        self.username = ko.observable(localStorage.username);
        self.level = ko.observable(localStorage.level);
        self.point = ko.observable(localStorage.point);

        self.oname = ko.observable();
        self.oplevel = ko.observable();
        self.opoint = ko.observable();



        self.question1 = ko.observable();
        self.question2 = ko.observable();
        self.question3 = ko.observable();

        var idtext = 0;
        var Question = function (id, type) {
            this.id = id;
            this.type = type;
        };

        $.connection.hub.url = "http://localhost:8080/signalr";
       

        // nhan listQ tu sever cho ca 2 client
        $.connection.gamesHub.client.getQuestionList = function (listQ) {
            //self.question1(listQ[0].id);
            //self.question2(listQ[1].id);
            //self.question3(listQ[2].id);
        }
        //

        //client thap nhat tao listQ roi chuyen len sever
        $.connection.gamesHub.client.createQuestionList = function () {

            // ham tao listQ
            $.connection.gamesHub.server.getValue(localStorage.point);
        }

        $.connection.gamesHub.client.refeshAmountOfPlayer = function (message) {
            //self.text(self.text() + name + " : " + message);
            //alert(self.store.length)
            // alert(message);
            self.username("Welcome : " + localStorage.username);
            self.numberPlayer('Number of player: ' + message.totalClient);
        };

        //no opponent
        $.connection.gamesHub.client.noOpponents = function (message) {

            self.message("There is no opponent");
            //    alert("Looking for an opponent!");
        };

        $.connection.gamesHub.client.foundOpponent = function (message) {


            self.oname(message.oName);
            self.oplevel(message.oLevel);
            self.opoint(message.oPoint);
            document.getElementById("opponent").style.display = "initial";
            document.getElementById("readybtn").style.display = "inline-block";
            document.getElementById("findbtn").style.display = "none";
            
           

        };

        //add done question
        $.connection.gamesHub.client.addMarkerPlacement = function (message) {.4
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

        this.User = function () {

        }
    };
})();