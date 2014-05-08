window.MistakeChasingGameClient = window.MistakeChasingGameClient || {};




function findController(name, controllers) {
    var result = $.grep(controllers, function (item, index) {
        return item.navigationType == name;
    });
    return result.length ? result[0].controller : null;
}

$(function () {
    DevExpress.devices.current({ platform: 'ios' });

    MistakeChasingGameClient.app = new DevExpress.framework.html.HtmlApplication({
        namespace: MistakeChasingGameClient,
        navigationType: MistakeChasingGameClient.config.navigationType,
        navigation: MistakeChasingGameClient.config.navigation
    });
    MistakeChasingGameClient.app.router.register(":view/:id", { view: "home", id: undefined });


    MistakeChasingGameClient.app.resolveLayoutController.add(function (args) {
        if (args.viewInfo.viewName == 'training') {
            args.layoutController = findController('simple', args.availableLayoutControllers);
        }
        else if (args.viewInfo.viewName == 'Chasing') {
            args.layoutController = findController('simple', args.availableLayoutControllers);
        }
    });

    function onBackButton() {
        if (args.viewInfo.viewName == 'training') {
            DevExpress.ui.dialog.confirm("Quit to Home?", "End match").done(function (dialogResult) {
                if (dialogResult == "Confirmed") {
                    localStorage.currentIndex = 1;
                    localStorage.currentPoint = 0;
                    localStorage.currentlevel = 0;
                    MistakeChasingGameClient.app.navigate('home', { root: true });
                }
            });
        }
        else if (args.viewInfo.viewName != 'Chasing') {
            DevExpress.ui.dialog.confirm("Exit game?", "Exit").done(function (dialogResult) {
                if (dialogResult == "Confirmed") {
                    switch (DevExpress.devices.current().platform) {
                        case "tizen":
                            tizen.application.getCurrentApplication().exit();
                            break;
                        case "android":
                            navigator.app.exitApp();
                            break;
                        case "win8":
                            window.external.Notify("DevExpress.ExitApp");
                            break;
                    }
                }
            });
        }
    }
    ///////////
    MistakeChasingGameClient.app.navigate();

});
