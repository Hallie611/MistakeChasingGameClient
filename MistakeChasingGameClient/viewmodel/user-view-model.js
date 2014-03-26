(function () {
    "use strict";

    
    //if (!localStorage.username) {
    //    localStorage.username = "newbine";
    //    localStorage.level = "1";
    //    localStorage.point = "100";
    //};

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

        this.changeName = function () {
            localStorage.username = this.username();
        }

        //this.LevelUp = function (data) {
        //    localStorage.point = Number(localStorage.point) + Number(data);
        //    if (Number(localStorage.point) > 500) {
        //        localStorage.level = "./images/level/level2.jpg";
        //    }
        //  //  MistakeChasingGameClient.app.navigate('home', { root: true });
        //};

    
        //  this.fromJS(data);
    };
})();