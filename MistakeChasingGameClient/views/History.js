MistakeChasingGameClient.History = function (params) {

    //var array = 
    //var abc = new DevExpress.data.ArrayStore({
    //    data: array,
    //    key: 'id'
    //});

    var viewModel = {
        
        HistorySource: ko.observable(""),

        lookupNoDataText : "You have not played any match yet",

        viewShown: function () {

            var temp = MistakeChasingGameClient.LocalDB.historyDb.createQuery()
            .filter([["id", ">=", 1], "and", ["id", "<=", 10]])
            .sortBy("index",true)
            .select("id", "oppName", "result", "score", "date")
            .toArray();

            viewModel.HistorySource(temp);
        },
        viewHidden: function () {

            
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