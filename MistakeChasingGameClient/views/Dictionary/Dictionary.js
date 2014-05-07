MistakeChasingGameClient.Dictionary = function (params) {

    // Audio
    

    var viewModel = {
    
        id: ko.observable('0'),
        
        selectType: ko.observable(''),

        selectedTable: ko.observable(),

        keyWords: MistakeChasingGameClient.LocalDB.keyWordsdb,

        bugsType: MistakeChasingGameClient.LocalDB.bugsTypedb,

        dictionaryType : [
            { id: 1, content: "Key Words", table: "keyWords"},
            { id: 2, content: "Bug Types", table: "bugsType" }],

        imgsrc: ko.observable(),
        visibleBugType: ko.observable(false),
        visibleKeyWord: ko.observable(false)
       
        //scrollDistance: ko.observable(-100000),

        //doScroll : function () {
        //    $("#scrollViewContainer").dxScrollView("instance").scrollBy(scrollDistance());
        //}

    };

    viewModel.selectType.subscribe(function (newValue) {
        if (viewModel.selectedType == null) {

        }
        if (newValue == "keyWords") {
            //viewModel.selectedTable("");
            //viewModel.selectedTable(MistakeChasingGameClient.LocalDB.keyWordsdb);
            viewModel.visibleKeyWord(true);
            viewModel.visibleBugType(false);
            //lookup.dataSource = viewModel.keyWords;
            //lookup.repaint();
        } else {
            //viewModel.selectedTable("");
            //viewModel.selectedTable(MistakeChasingGameClient.LocalDB.bugsTypedb);
            //$("#LookupBugtype").dxLookup('instance').repaint();
            viewModel.visibleKeyWord(false);
            viewModel.visibleBugType(true);
            //lookup.dataSource = viewModel.bugsType;
            //lookup.repaint();
        }
    });
    
    return viewModel;
};