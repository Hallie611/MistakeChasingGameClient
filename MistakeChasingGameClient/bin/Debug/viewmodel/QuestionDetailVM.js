
(function () {
    "use strict";
    MistakeChasingGameClient.QuestionVM = function (level) {


        this.mes = ko.observable();
        var randomFindBugs;
        var randomFillBlank;
        var randomMultiple;

        var curentIndex;
        if (!curentIndex)
            curentIndex = 0;

        var playingQuest = new DevExpress.data.ArrayStore({
            //name: "playingQ",
            key: "index"
        });


        this.randomQuestions = function () {
            var filteredFindbugs = MistakeChasingGameClient.db.findbugsdb.createQuery().filter(["dif", "=", level]).sortBy("id").select("id").toArray();
            randomFindBugs = filteredFindbugs[Math.floor(Math.random() * filteredFindbugs.length)];

            var filteredFillBlank = MistakeChasingGameClient.db.findbugsdb.createQuery().filter(["dif", "=", level]).sortBy("id").select("id").toArray();
            randomFillBlank = filteredFindbugs[Math.floor(Math.random() * filteredFindbugs.length)];

            var filteredMultiple = MistakeChasingGameClient.db.findbugsdb.createQuery().filter(["dif", "=", level]).sortBy("id").select("id").toArray();
            randomMultiple = filteredFindbugs[Math.floor(Math.random() * filteredFindbugs.length)];


            //MistakeChasingGameClient.app.navigate({
            //    view: 'findBugs',
            //    id: randomFindBugs.id
            //});
            alert(curentIndex);
            if (curentIndex == 0) {
                MistakeChasingGameClient.app.navigate({
                    view: 'findBugs',
                    id: randomFindBugs.id
                }); 
            }
            else if (curentIndex == 1) {
                
                MistakeChasingGameClient.app.navigate({
                    view: 'FillBlankQuestion',
                    id: filteredFillBlank.id
                });
              
            }
           else  if (curentIndex == 2) {
                curentIndex++;
                MistakeChasingGameClient.app.navigate({
                    view: 'MultipleChoiceQuestion',
                    id: randomMultiple.id
                });
              
            }
            curentIndex++;
                return;
            
        };







    };
})();

