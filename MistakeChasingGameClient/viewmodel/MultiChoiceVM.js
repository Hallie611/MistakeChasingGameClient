
(function () {
    "use strict";
    MistakeChasingGameClient.MultiChoiceVM = function (id) {

        this.src = ko.observable();
        this.Multidata = ko.observable(null);
        var result = "";
        this.choice = ko.observable('');
        var difCurrentQ;
        var points = 0;
        var data;

        MistakeChasingGameClient.db.multiplechoicedb.byKey(id).done(function (e) { data = e });
        // ham nhan du lieu tu database vao de xu ly
        this.fromJS = function () {
            this.src(data.src);
            this.Multidata(data.listAns);
            result = data.ans;
            difCurrentQ = data.dif;
        };

        // ham de submit cau hoi
        this.submit = function () {
            if (result == this.choice()) {
                points += difCurrentQ * 50;
            }
            this.resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " points!");
            this.resultDialog.done(function () {
                localStorage.curentPoint = Number(localStorage.curentPoint) + points;
                localStorage.curentIndex = Number(localStorage.curentIndex) + 1;
                MistakeChasingGameClient.app.navigate({ view: "questionDetail" });
            });
        };
    };
})();

