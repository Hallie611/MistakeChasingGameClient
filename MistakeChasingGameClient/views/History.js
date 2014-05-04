MistakeChasingGameClient.History = function (params) {

    // Audio
    var bgAudioHistory = ko.observable();

    //var array = 
    //var abc = new DevExpress.data.ArrayStore({
    //    data: array,
    //    key: 'id'
    //});

    var viewModel = {
        soundSrc: ko.observable("sound/Where the Ancestors Sleep.mp3"),
        HistorySource: ko.observable(""),

        viewShown: function () {
            // Audio
            bgAudioHistory(document.getElementById('bgAudioHistory'));
            //alert(bgAudioHistory());
            bgAudioHistory().play();

            var temp = MistakeChasingGameClient.LocalDB.historyDb.createQuery()
            .filter([["id", ">=", 1], "and", ["id", "<=", 10]])
            .sortBy("index",true)
            .select("id", "oppName", "result", "score", "date")
            .toArray();

            viewModel.HistorySource(temp);
        },
        viewHidden: function () {
            //alert(bgAudioHistory());
            bgAudioHistory().pause();
        }
    };

    //var historyDb = new DevExpress.data.LocalStore({
    //    name: "historyData",
    //    key: "id"
    //}),

    //var self = this;

    //insertHistory : function (id, opponentName, result, score) {
    //MistakeChasingGameClient.HistoryModel.historyDb.insert({
    //    id: id,
    //    opponentName: opponentName,
    //    result: result,
    //    date: Date.now.toString("dd/MM/yy"),
    //    score: score
    //})
    //MistakeChasingGameClient.LocalDB.insertHistory("Peter", "W", 10);
    //MistakeChasingGameClient.LocalDB.insertHistory("Peter", "L", 20);
    //MistakeChasingGameClient.LocalDB.insertHistory("Peter", "D", -30);
    //MistakeChasingGameClient.LocalDB.insertHistory("Peter", "W", 40);
    //MistakeChasingGameClient.LocalDB.insertHistory("Peter", "L", -50);
    //MistakeChasingGameClient.LocalDB.insertHistory("Peter", "L", 60);
    //MistakeChasingGameClient.LocalDB.insertHistory("Peter", "D", -70);
    //MistakeChasingGameClient.LocalDB.insertHistory("Peter", "D", -80);
    //MistakeChasingGameClient.LocalDB.insertHistory("Peter", "W", 90);
    //MistakeChasingGameClient.LocalDB.insertHistory("Peter", "W", -100);
    return viewModel;
};