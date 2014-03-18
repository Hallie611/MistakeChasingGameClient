MistakeChasingGameClient.Dictionary = function (params) {

    var viewModel = {

        id: ko.observable('0'),
        
        selectType: ko.observable(''),

        selectedTable: ko.observable(),

        keyWords: MistakeChasingGameClient.db.keyWordsdb,

        bugsType: MistakeChasingGameClient.db.bugsTypedb,

        dictionaryType : [
            { id: 1, content: "Key Words", table: "keyWords"},
            { id: 2, content: "Bug Types", table: "bugsType" }],

        imgsrc: ko.observable()

    };

    viewModel.selectType.subscribe(function (newValue) {
        if (viewModel.selectedType == null) {

        }
        if (newValue == "keyWords") {
            viewModel.selectedTable(viewModel.keyWords);
        } else {
            viewModel.selectedTable(viewModel.bugsType);
        }
    });
    
    return viewModel;
};