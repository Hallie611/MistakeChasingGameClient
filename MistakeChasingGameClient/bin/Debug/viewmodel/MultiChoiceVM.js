
(function () {
    "use strict";
    MistakeChasingGameClient.MultiChoiceVM = function (id) {



        this.src = ko.observable();
        this.mes = ko.observable();
        this.Multidata = ko.observable(null);
        this.value = ko.observable();
     
        this.selectedValue = ko.observable(null);
        var result = "";
        var choice = "";

        var data;
        
        MistakeChasingGameClient.db.multiplechoicedb.byKey(id).done(function (e) { data = e });
        // ham nhan du lieu tu database vao de xu ly
        this.fromJS = function () {
            this.src(data.src);
          this.Multidata(data.listAns);
          result = data.ans;

        };

        // ham de luu choice cua user
        this.select = function (e) {
            choice = e.itemData;
        };

        // ham de summit cau hoi
        this.summit = function () {
            
            if (result == choice)
                result = "true";
            else
                result = "false";
           
            this.resultDialog = DevExpress.ui.dialog.alert(result);
            this.resultDialog.done(function () {
                localStorage.curentIndex = Number(localStorage.curentIndex) + 1;
                MistakeChasingGameClient.app.navigate({ view: "questionDetail" });
            });
        };
    };
})();

