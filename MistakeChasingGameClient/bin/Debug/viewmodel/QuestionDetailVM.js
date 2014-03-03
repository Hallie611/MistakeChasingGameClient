
(function () {
    "use strict";
    MistakeChasingGameClient.QuestionVM = function (level) {

        this.mes = ko.observable();
        var randomFindBugs;
        var randomFillBlank;
        var randomMultiple;

        //giu index random array question
        if (!localStorage.currentIndex)
            localStorage.currentIndex = 0;

        //giu level khi chuyen view
        if (Number(level) % 1 == 0)
            localStorage.currentlevel = level;

        // giu diem
        if (!localStorage.currentPoint)
            localStorage.currentPoint = 0;

        var playingQuest = new DevExpress.data.ArrayStore({
            //name: "playingQ",
            key: "index"
        });


        this.changeView = function () {

            if (Number(localStorage.currentIndex) == 0) {
                var filteredFindbugs = MistakeChasingGameClient.db.findbugsdb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").select("id").toArray();
                randomFindBugs = filteredFindbugs[Math.floor(Math.random() * filteredFindbugs.length)];
                MistakeChasingGameClient.app.navigate({
                    view: 'findBugs',
                    id: randomFindBugs.id
                });

            }
            else if (Number(localStorage.currentIndex) == 1) {
                var filteredFillBlank = MistakeChasingGameClient.db.fillingblankdb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").select("id").toArray();

                randomFillBlank = filteredFillBlank[Math.floor(Math.random() * filteredFillBlank.length)];
                MistakeChasingGameClient.app.navigate({
                    view: 'FillBlankQuestion',
                    id: randomFillBlank.id
                });

            }
            else if (Number(localStorage.currentIndex) == 2) {
                var filteredMultiple = MistakeChasingGameClient.db.multiplechoicedb.createQuery().filter(["dif", "=", Number(localStorage.currentlevel)]).sortBy("id").select("id").toArray();
                randomMultiple = filteredMultiple[Math.floor(Math.random() * filteredMultiple.length)];
                MistakeChasingGameClient.app.navigate({
                    view: 'MultipleChoiceQuestion',
                    id: randomMultiple.id
                });
            }
            else
                localStorage.currentIndex = 0;
        };
        this.PlayAgain = function () {
            localStorage.currentIndex = 0;
            localStorage.currentPoint = 0;
            this.changeView();
        };

        this.Next = function () {
            localStorage.currentIndex = 0;
            localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
            localStorage.currentPoint = 0;
            var nextLevel = Number(localStorage.currentlevel) + 1;
            localStorage.currentlevel = nextLevel;
            MistakeChasingGameClient.app.navigate({ view: "questionDetail", level: nextLevel });
        };
    };
})();

