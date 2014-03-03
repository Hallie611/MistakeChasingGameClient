
(function () {
    "use strict";
    MistakeChasingGameClient.FillBlankVM = function (id) {

        // khai bao bien
        this.src = ko.observable();
        this.answer1source = ko.observable();
        this.answer2source = ko.observable();
        this.answer3source = ko.observable();

        this.choice1 = ko.observable('');
        this.choice2 = ko.observable('');
        this.choice3 = ko.observable('');
        var difCurrentQ;
        var points = 0;
        var answer1;
        var answer2;
        var answer3;

        // ham dung de load du lieu len questiondetail view by data
        this.fromJS = function (data) {
            //lay cau hoi dua theo id truyn vao data tam
            var data;
            MistakeChasingGameClient.db.fillingblankdb.byKey(id).done(function (e) { data = e });

            this.src(data.src);
            this.answer1source(data.listA);
            this.answer2source(data.listB);
            this.answer3source(data.listC);
            answer1 = data.A;
            answer2 = data.B;
            answer3 = data.C;
            difCurrentQ = data.dif;
        };

        //submit method
        this.submit = function () {
            if (this.choice1() == answer1) {
                points += difCurrentQ * 25;
            }
            if (this.choice2() == answer2) {
                points += difCurrentQ * 25;
            }
            if (this.choice3() == answer3) {
                points += difCurrentQ * 25;
            }
            this.resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " points!");
            this.resultDialog.done(function () {
                localStorage.currentPoint = Number(localStorage.currentPoint) + points;
                localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
                MistakeChasingGameClient.app.navigate({ view: "questionDetail" });
            });
        };
    };
})();

