
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
        var randomFillBlank = ko.observable("");
        //        function findLayout(name) {
        //            var currentPlatform = DevExpress.devices.current().platform;
        //            var result = $.grep(DevExpress.framework.html.layoutControllers, function (item, index) {
        //                return (item.navigationType == name && item.platform == currentPlatform);
        //            });
        //            return result.length ? result[0].controller : null;
        //        };
        //            var controller = findLayout('slideout');
        //            if (controller)
        //                controller.navButtonItem.hide();

        // ham dung de load du lieu len questiondetail view by data
        this.fromJS = function () {
            if (Number(localStorage.currentIndex) == 2) {
                var filteredFillBlank = MistakeChasingGameClient.db.fillingblankdb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").toArray();
                randomFillBlank = filteredFillBlank[Math.floor(Math.random() * filteredFillBlank.length)];              
            } 
            this.src(randomFillBlank.src);
            this.answer1source(randomFillBlank.listA);
            this.answer2source(randomFillBlank.listB);
            this.answer3source(randomFillBlank.listC);
            answer1 = randomFillBlank.A;
            answer2 = randomFillBlank.B;
            answer3 = randomFillBlank.C;
            difCurrentQ = randomFillBlank.dif;
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
                MistakeChasingGameClient.app.navigate('MultipleChoiceQuestion', { target: 'current' });
            });
        };
    };
})();

