
(function () {
    "use strict";
    MistakeChasingGameClient.MultiChoiceVM = function (id) {

        this.src = ko.observable();
        this.listAns = ko.observable(null);
        var answer;
        this.choice = ko.observable('');
        var difCurrentQ;
        var points = 0;
        var randomMultiple = ko.observable();
        this.showMe = ko.observable();
        /////////////

        // ham nhan du lieu tu database vao de xu ly
        this.fromJS = function () {
            if (Number(localStorage.currentIndex) == 3) {
                var filteredMultiple = MistakeChasingGameClient.db.multiplechoicedb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").toArray();
                randomMultiple = filteredMultiple[Math.floor(Math.random() * filteredMultiple.length)];
            }

            this.src(randomMultiple.src);
            this.listAns(randomMultiple.listAns);
            answer = randomMultiple.ans;
            difCurrentQ = randomMultiple.dif;
            this.showMe(false);
        };

        // ham de submit cau hoi
        this.submit = function () {
            if (answer == this.choice()) {
                points += difCurrentQ * 50;
            }
            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            this.showMe(true);
            //            this.resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " points!", "Result");
            //            this.resultDialog.done(function () {
            //                
            //            });
        };

        this.PlayAgain = function () {
            localStorage.currentIndex = 1;
            localStorage.currentPoint = 0;
            MistakeChasingGameClient.app.navigate('findBugs/' + localStorage.currentlevel, { root: true });
        };

        this.Next = function () {
            localStorage.currentIndex = 1;
            localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
            localStorage.currentPoint = 0;
            var nextLevel = Number(localStorage.currentlevel) + 1;
            localStorage.currentlevel = nextLevel;
            MistakeChasingGameClient.app.navigate('findBugs/' + nextLevel, { root: true });
        };

        this.backToMenu = function () {
            localStorage.currentIndex = 1;
            localStorage.currentPoint = 0;
            localStorage.currentlevel = 0;
            MistakeChasingGameClient.app.navigate('home', { root: true });
        };
    };
})();

