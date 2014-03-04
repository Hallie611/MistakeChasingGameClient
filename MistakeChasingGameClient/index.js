window.MistakeChasingGameClient = window.MistakeChasingGameClient || {};

function findController(name, controllers) {
    var result = $.grep(controllers, function (item, index) {
        return item.navigationType == name;
    });
    return result.length ? result[0].controller : null;
}

$(function () {
    MistakeChasingGameClient.app = new DevExpress.framework.html.HtmlApplication({
        namespace: MistakeChasingGameClient,
        navigationType: MistakeChasingGameClient.config.navigationType,
        navigation: MistakeChasingGameClient.config.navigation
    });
    MistakeChasingGameClient.app.router.register(":view/:id", { view: "home", id: undefined });

    MistakeChasingGameClient.app.resolveLayoutController.add(function (args) {
        if (args.viewInfo.viewName == 'findBugs') {
            args.layoutController = findController('simple', args.availableLayoutControllers);
        } else if (args.viewInfo.viewName == 'FillBlankQuestion') {
            args.layoutController = findController('simple', args.availableLayoutControllers);
        } else if (args.viewInfo.viewName == 'MultipleChoiceQuestion') {
            args.layoutController = findController('simple', args.availableLayoutControllers);
        }
    });

    ///////////
    MistakeChasingGameClient.app.navigate();

});
