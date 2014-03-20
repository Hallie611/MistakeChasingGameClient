(function () {
    "use strict";


    MistakeChasingGameClient.OnlineVM = function (data) {

        var self = this;
        self.numberPlayer = ko.observable();
        self.message = ko.observable();
        self.username = ko.observable(localStorage.username);
        self.level = ko.observable(localStorage.level);
        self.point = ko.observable(localStorage.point);

        self.oppname = ko.observable();

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
            self.question1(listQ[0].id + listQ[0].type);
            self.question2(listQ[1].id + listQ[1].type);
            self.question3(listQ[2].id + listQ[2].type);
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


            //    alert("Looking for an opponent!");
        };

        $.connection.gamesHub.client.foundOpponent = function (message) {
            alert("Let's play");
            document.getElementById("player").style.display = "none";
            document.getElementById("listQuest").style.display = "initial";

        };

        //add done question
        $.connection.gamesHub.client.addMarkerPlacement = function (message) {
            document.getElementById("question" + message.MarkerPosition).style.backgroundColor = "red";
            self.question1(message.OpponentName + "has checked")
            //alert(message.OpponentName + " has checked question " + message.MarkerPosition);
        };



        $.connection.hub.start().done(function () {
            //alert("connected");

            $.connection.gamesHub.server.register(localStorage.username).done(function () {
                //  alert('added');
            });

            // hub is now ready
        }).fail(function () {
            alert("can not connect to sever");
        });


        this.findOpponent = function () {
            $.connection.gamesHub.server.findOpponent(localStorage.point);
        };

        this.play = function () {
            $.connection.gamesHub.server.play(1);
        };

        this.User = function () {

        }
    };
})();