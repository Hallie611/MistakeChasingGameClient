MistakeChasingGameClient.Chasing = function (params) {

    var viewModel = new MistakeChasingGameClient.OnlineVM();
    


    return $.extend(viewModel, {
        viewShown: function () {
            //goi ham load cau hoi len dua theo id truyen qua
            viewModel.loadRoomTab();
            //setClock();
        }
    });
};