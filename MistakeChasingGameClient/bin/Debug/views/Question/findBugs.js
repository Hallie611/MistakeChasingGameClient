MistakeChasingGameClient.findBugs = function (params) {

    var viewModel = new MistakeChasingGameClient.findBugsVM(params.id);
//    function findLayout(name) {
//        var currentPlatform = DevExpress.devices.current().platform;
//        var result = $.grep(DevExpress.framework.html.layoutControllers, function (item, index) {
//            return (item.navigationType == name && item.platform == currentPlatform);
//        });
//        return result.length ? result[0].controller : null;
//    };
//    var controller = findLayout('slideout');
//    if (controller)
//        controller.navButtonItem.hide();

    return $.extend(viewModel, {
        viewShown: function () {

            // MistakeChasingGameClient.db.multiplechoice.byKey(1).done(function (data) { viewModel.fromJS(data); });
            viewModel.fromJS();
        }
    });
};