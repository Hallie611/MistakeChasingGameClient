MistakeChasingGameClient.MultipleChoiceQuestion = function (params) {

    var viewModel = new MistakeChasingGameClient.MultiChoiceVM(params.id);

    return $.extend(viewModel, {
        viewShown: function () {

            // MistakeChasingGameClient.db.multiplechoice.byKey(1).done(function (data) { viewModel.fromJS(data); });
            viewModel.fromJS();
        }
    });
};