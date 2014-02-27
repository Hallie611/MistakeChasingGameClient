MistakeChasingGameClient.questionDetail = function (params) {
    


    var viewModel = new MistakeChasingGameClient.QuestionVM(params.id);


    return  $.extend(viewModel, {
        viewShown: function () {
            viewModel.changeView();
        }
    });
};