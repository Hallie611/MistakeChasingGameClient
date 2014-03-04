MistakeChasingGameClient.FillBlankQuestion = function (params) {
    var viewModel = new MistakeChasingGameClient.FillBlankVM(params.id);
    
    return $.extend(viewModel, {
        viewShown: function () {
            //goi ham load cau hoi len dua theo id truyen qua
            viewModel.fromJS();
        }

    });
};