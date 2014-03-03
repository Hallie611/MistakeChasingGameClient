(function () {
    "use strict";

    
    if (!localStorage.username) {
        localStorage.username = "newbine";
        localStorage.level = "./images/level/level1.jpg";
        localStorage.point = "100";
    };

    MistakeChasingGameClient.UserViewModel = function (data) {        
        this.username = ko.observable();
        this.level = ko.observable();
        this.point = ko.observable();

        this.fromJS = function () {
            // if (!data) return;
            this.username(localStorage.username);
            this.level(localStorage.level);
            this.point(localStorage.point);

        };
        this.toJS = function () {
            localStorage.level = this.level;
            localStorage.point = this.point;
        };


        //this.LevelUp = function (data) {
        //    localStorage.point = Number(localStorage.point) + Number(data);
        //    if (Number(localStorage.point) > 500) {
        //        localStorage.level = "./images/level/level2.jpg";
        //    }
        //  //  MistakeChasingGameClient.app.navigate('home', { root: true });
        //};

        this.clear = function () {
            localStorage.clear();
        };

        //  this.fromJS(data);
    };
})();