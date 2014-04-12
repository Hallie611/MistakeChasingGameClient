(function () {
    "use strict";

    MistakeChasingGameClient.ClockVM = function (data) {
        // variables for time units
        this.txMinutes = ko.observable("");
        this.txSeconds = ko.observable("");
        this.restartClock = ko.observable(true);
        this.timeUp = ko.observable(false);
        this.getTime = ko.computed(function () {
            return this.txMinutes() + " : " + this.txSeconds();
        }, this);

        var interval, seconds, minutes; // = setInterval(runClock, 1000);

        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        };
        var self = this;
        function runClock() {
            if (self.restartClock()) {
                if (Number(localStorage.maxIndex) == 3) {
                    seconds = 0;
                    minutes = 3;
                }
                else if (Number(localStorage.maxIndex) == 4) {
                    seconds = 0;
                    minutes = 4;
                }
                else if (Number(localStorage.maxIndex) == 5) {
                    seconds = 0;
                    minutes = 5;
                }
                self.restartClock(false);
            };
            // restart second when reach 0
            if (seconds == 0) {
                seconds = 59;
                minutes = minutes - 1;
            }
            seconds = seconds - 1;
            var newSecond = checkTime(seconds);
            self.txSeconds(newSecond + "");
            self.txMinutes(minutes + "");
            //alert(minutes() + " " + seconds());

            if (minutes == 0 && seconds == 0) {
                self.clearClock();
                self.timeUp(true);                
            }
        };

        this.clearClock = function () {
            clearInterval(interval);            
        };

        this.setClock = function () {
            this.restartClock(true);
            this.timeUp(false);
            if (Number(localStorage.maxIndex) == 3) {
                this.txMinutes("3");
                this.txSeconds("00");
            }
            else if (Number(localStorage.maxIndex) == 4) {
                this.txMinutes("4");
                this.txSeconds("00");
            }
            else if (Number(localStorage.maxIndex) == 5) {
                this.txMinutes("5");
                this.txSeconds("00");
            }
            interval = setInterval(runClock, 1000);
        };
    };
})();