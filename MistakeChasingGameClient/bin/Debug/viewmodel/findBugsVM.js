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
                    MistakeChasingGameClient.app.navigate({ view: "questionDetail" });
                });
            }
        };

        this.showBug = function () {
            
           
        };

    }
})();