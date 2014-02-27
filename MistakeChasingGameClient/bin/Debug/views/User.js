"use strict";
MistakeChasingGameClient.User = function (params) {

    var viewModel = new MistakeChasingGameClient.UserViewModel();

    return $.extend(viewModel, {
        viewShown: function () {
            viewModel.fromJS();
        }

    });
};