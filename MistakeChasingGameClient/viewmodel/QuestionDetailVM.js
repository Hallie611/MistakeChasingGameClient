
(function () {
    "use strict";
    MistakeChasingGameClient.QuestionVM = function (level) {


        this.mes = ko.observable();
        var randomFindBugs;
        var randomFillBlank;
        var randomMultiple;

        //giu index random array question
        if (!localStorage.curentIndex)
            localStorage.curentIndex = 0;


        //giu level khi chuyen view
        if (Number(level) % 1 == 0)
            localStorage.curentlevel = level;

        // giu diem
        if (!localStorage.curentPoint)
            localStorage.curentPoint = 0;

        var playingQuest = new DevExpress.data.ArrayStore({
            //name: "playingQ",
            key: "index"
        });


        this.changeView = function () {


            if (Number(localStorage.curentIndex) == 0) {
                var filteredFindbugs = MistakeChasingGameClient.db.findbugsdb.createQuery().filter(["dif", "=", Number(localStorage.curentlevel)]).sortBy("id").select("id").toArray();
                randomFindBugs = filteredFindbugs[Math.floor(Math.random() * filteredFindbugs.length)];
                MistakeChasingGameClient.app.navigate({
                    view: 'findBugs',
                    id: randomFindBugs.id
                });

            }
            else if (Number(localStorage.curentIndex) == 1) {
                var filteredFillBlank = MistakeChasingGameClient.db.fillingblankdb.createQuery().filter(["dif", "=", Number(localStorage.curentlevel)]).sortBy("id").select("id").toArray();

                randomFillBlank = filteredFillBlank[Math.floor(Math.random() * filteredFillBlank.length)];
                MistakeChasingGameClient.app.navigate({
                    view: 'FillBlankQuestion',
                    id: randomFillBlank.id
                });

            }
            else if (Number(localStorage.curentIndex) == 2) {
                var filteredMultiple = MistakeChasingGameClient.db.multiplechoicedb.createQuery().filter(["dif", "=", Number(localStorage.curentlevel)]).sortBy("id").select("id").toArray();
                randomMultiple = filteredMultiple[Math.floor(Math.random() * filteredMultiple.length)];
                MistakeChasingGameClient.app.navigate({
                    view: 'MultipleChoiceQuestion',
                    id: randomMultiple.id
                });
            }
            else
                localStorage.curentIndex = 0;
        };
        this.PlayAgain = function () {
            this.changeView();
        };

        this.Next = function () {
            var nextLevel = Number(localStorage.curentlevel) + 1;
            MistakeChasingGameClient.app.navigate({ view: "home", level: nextLevel });
        };
    };
})();

