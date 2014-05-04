MistakeChasingGameClient.Dictionary = function (params) {

    // Audio
    var bgAudioDictionary = ko.observable();

    var viewModel = {
        soundSrc: ko.observable("sound/Memories.mp3"),
        id: ko.observable('0'),
        
        selectType: ko.observable(''),

        selectedTable: ko.observable(),

        keyWords: MistakeChasingGameClient.LocalDB.keyWordsdb,

        bugsType: MistakeChasingGameClient.LocalDB.bugsTypedb,

        dictionaryType : [
            { id: 1, content: "Key Words", table: "keyWords"},
            { id: 2, content: "Bug Types", table: "bugsType" }],

        imgsrc: ko.observable(),
        viewShown: function () {
            // Audio
            bgAudioDictionary(document.getElementById('bgAudioDictionary'));
            //alert(bgAudioDictionary());
            bgAudioDictionary().play();
        },
        viewHidden: function () {
            //alert(bgAudioDictionary());
            bgAudioDictionary().pause();
        }

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