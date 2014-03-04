(function () {
    "use strict";
    MistakeChasingGameClient.findBugsVM = function (level) {
        this.src = ko.observable();
        this.bwidth = ko.observable();
        this.bheight = ko.observable();
        this.bleft = ko.observable();
        this.btop = ko.observable();
        var points;
        var difCurrentQ;
        var randomFindBugs = ko.observable();
        var countX = 0;
        
        //giu index random array question
        if (!localStorage.currentIndex)
            localStorage.currentIndex = 0;

        //giu level khi chuyen view
        if (Number(level) % 1 == 0)
            localStorage.currentlevel = level;

        // giu diem
        if (!localStorage.currentPoint)
            localStorage.currentPoint = 0;

        if (Number(localStorage.currentlevel) < 8) {
            localStorage.maxIndex = 3;
        }

        this.fromJS = function () {
            alert(randomFindBugs.src);
            if (Number(localStorage.currentIndex) == 1) {
                var filteredFindbugs = MistakeChasingGameClient.db.findbugsdb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").toArray();
                randomFindBugs = filteredFindbugs[Math.floor(Math.random() * filteredFindbugs.length)];
                alert(randomFindBugs.src);
            }
            this.src(randomFindBugs.src);
            this.bwidth(randomFindBugs.width);
            this.bheight(randomFindBugs.height);
            this.bleft(randomFindBugs.left);
            this.btop(randomFindBugs.top);
            difCurrentQ = randomFindBugs.dif;
        };

        this.myEventHandler = function () {
            countX += 1;
            var showX = document.getElementById("miss" + countX);
            showX.style.visibility = "visible";
            if (countX >= 3) {
                this.resultDialog = DevExpress.ui.dialog.alert("You have earn " + 0 + " star points!", "Result");
                this.resultDialog.done(function () {
                    localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
                    MistakeChasingGameClient.app.navigate({ view: "FillBlankQuestion" });
                });
            }
        };

        this.showBug = function () {
            var showMe = document.getElementById("bug");
            showMe.style.borderStyle = "solid";
            points = difCurrentQ * 50;
            this.resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " star points!", "Result");
            this.resultDialog.done(function () {
                localStorage.currentPoint = Number(localStorage.currentPoint) + points;
                localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
                MistakeChasingGameClient.app.navigate('FillBlankQuestion', { target: 'current' });
            });
        };
    }
})();