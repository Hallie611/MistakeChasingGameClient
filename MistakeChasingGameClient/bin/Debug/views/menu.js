

MCG_Prototype1.menu = function (params) {

    var viewModel = {
    };

    // Create list of beginner find bug questions
    beginnerFg = DevExpress.data.query(MCG_Prototype1.db.findbugs)
            .filter(["dif", "<=", 4])
            .sortBy("id").toArray();
    
    // Create array list to get item from array
    beginnerFg = new DevExpress.data.ArrayStore({
        data: beginnerFg,
        key: "id"
    });
    
    // Get item by key 'id' and pass to param: data
    beginnerFg.byKey(1).done(function (dataItem) {
        // process 'dataItem'
        data = dataItem;
    });

    // Show red box
    showBug = function () {
        var showme = document.getElementById("bug");
        showme.style.borderStyle = "solid";
    }

    return viewModel;

};

//// variables for time units
//var minutes, seconds;
//minutes = 0;
//seconds = 60;

//// get tag element
//var countdown = document.getElementById("countdown");

//function startClock() {
//    // update the tag with id "countdown" every 1 second
//    var interval = setInterval(function () {

//        if (seconds == 0) {
//            seconds = 60;
//        }
//        seconds = seconds - 1;
//        if (seconds == 0) {
//            minutes = minutes - 1;
//        }
//        if (minutes < 0) {
//            DevExpress.ui.dialog.alert("Time's up!", "Game Over");
//            clearInterval(interval);
//            minutes = 0;
//            seconds = 60;
//            return;
//        }
//        seconds = checkTime(seconds);

//        // format countdown string + set tag value
//        document.getElementById('countdown').innerHTML = minutes + ": " + seconds;

//    }, 1000);
//}

//function checkTime(i) {
//    if (i < 10) {
//        i = "0" + i;
//    }
//    return i;
//}
// startClock();