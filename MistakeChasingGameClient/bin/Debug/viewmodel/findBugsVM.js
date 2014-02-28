(function () {
    "use strict";
    MistakeChasingGameClient.findBugsVM = function (id) {
        this.src = ko.observable();
        this.bwidth = ko.observable();
        this.bheight = ko.observable();
        this.bleft = ko.observable();
        this.btop = ko.observable();
        var data;

        MistakeChasingGameClient.db.findbugsdb.byKey(id).done(function (e) { data = e });
        var countX = 0;        
        this.fromJS = function () {
            this.src(data.src);
            this.bwidth(data.width);
            this.bheight(data.height);
            this.bleft(data.left);
            this.btop(data.top);
        };

        this.myEventHandler = function () {
            countX += 1;
            var showX = document.getElementById("miss" + countX);
            showX.style.visibility = "visible";

            if (countX >= 3) {
                this.resultDialog = DevExpress.ui.dialog.alert("You have earn " + 0 + " star points!", "Result");
                this.resultDialog.done(function () {
                    localStorage.curentIndex = Number(localStorage.curentIndex) + 1;
                    MistakeChasingGameClient.app.navigate({ view: "questionDetail"});
                });
            }
        };

        this.showBug = function () {
            var showMe = document.getElementById("bug");
            showMe.style.borderStyle = "solid";
            points = curQuestion.question.dif * 50;
            resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " star points!", "Result");
            resultDialog.done(function () {
                MistakeChasingGameClient.app.navigate({ view: "questionDetail" });
            });           
        };
    }
})();