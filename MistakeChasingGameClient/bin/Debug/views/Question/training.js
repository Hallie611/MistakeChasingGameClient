MistakeChasingGameClient.training = function (params) {

    //giu level khi chuyen view
    if (Number(params.id) % 1 == 0)
        localStorage.currentlevel = params.id;
    var viewModel = new MistakeChasingGameClient.trainingVM(params.id);
    var countX = 0;    

    myEventHandler = function () {
        countX += 1;
        var showX = document.getElementById("miss" + countX);
        showX.style.visibility = "visible";
        if (countX >= 3) {
            countX = 0;
            resultDialog = DevExpress.ui.dialog.alert("You have earn " + 0 + " star points!", "Result");
            resultDialog.done(function () {
                localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
                viewModel.loadQuestion();
            });
        }
    };

    showBug = function () {
        var points = viewModel.bugFound();
        resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " star points!", "Result");
        resultDialog.done(function () {
            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            viewModel.loadQuestion();
        });
    };

    submitFBK = function () {
        var points = viewModel.submitBlanks();
        resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " points!", "Result");
        resultDialog.done(function () {
            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            viewModel.loadQuestion();

        });
    };

    submitSC = function () {
        var points = viewModel.submitChoice();
        resultDialog = DevExpress.ui.dialog.alert("You have earn " + points + " points!", "Result");
        resultDialog.done(function () {
            localStorage.currentPoint = Number(localStorage.currentPoint) + points;
            localStorage.currentIndex = Number(localStorage.currentIndex) + 1;
            var curPoints = ko.observable(Number(localStorage.currentPoint));
            var isPassed = viewModel.isPassed();

            var passDialog = DevExpress.ui.dialog.custom({
                title: "Result",
                message: "You have earn " + curPoints() + " points!",
                buttons: [
            { text: "Next Level", clickAction: next },
            { text: "Back to Home", clickAction: backToMenu}]
            });

            var failDialog = DevExpress.ui.dialog.custom({
                title: "Result",
                message: "You have earn " + curPoints() + " points!",
                buttons: [
            { text: "Try Again", clickAction: tryAgain },
            { text: "Back to Home", clickAction: backToMenu}]
            });
            if (isPassed) {
                passDialog.show();
            }
            else failDialog.show();
        });
    };

    function tryAgain() {
        localStorage.currentIndex = 1;
        localStorage.currentPoint = 0;
        viewModel.loadQuestion();
    };

    function next() {        
        localStorage.currentIndex = 1;
        localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
        localStorage.currentPoint = 0;
        var nextLevel = Number(localStorage.currentlevel) + 1;
        localStorage.currentlevel = nextLevel;
        //alert(Number(localStorage.currentlevel));
        viewModel.loadQuestion();
    };

    function backToMenu() {
        localStorage.currentIndex = 1;
        localStorage.point = Number(localStorage.point) + Number(localStorage.currentPoint);
        localStorage.currentPoint = 0;
        localStorage.currentlevel = 0;
        MistakeChasingGameClient.app.navigate('home', { root: true });
    };

    return $.extend(viewModel, {
        viewShown: function () {
            //goi ham load cau hoi len dua theo id truyen qua
            viewModel.loadQuestion();
        }
    });
};

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