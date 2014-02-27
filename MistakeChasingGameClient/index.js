window.MistakeChasingGameClient = window.MistakeChasingGameClient || {};

$(function() {
    MistakeChasingGameClient.app = new DevExpress.framework.html.HtmlApplication({
        namespace: MistakeChasingGameClient,
        navigationType: MistakeChasingGameClient.config.navigationType,
        navigation: MistakeChasingGameClient.config.navigation
    });
    MistakeChasingGameClient.app.router.register(":view/:id", { view: "home", id: undefined });

    MistakeChasingGameClient.app.navigate();

});
