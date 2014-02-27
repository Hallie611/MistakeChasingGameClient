
(function () {
    "use strict";
    MistakeChasingGameClient.FillBlankVM = function (id) {



        //lay cau hoi dua theo id truyn vao data tam
        var data;
        MistakeChasingGameClient.db.fillingblankdb.byKey(id).done(function (e) { data=e });

        // khai bao bien
        this.src = ko.observable();
        this.answwer1source = ko.observable();
        this.answwer2source = ko.observable();
        this.answwer3source = ko.observable();

        this.choice1 = ko.observable('Choice');
        this.choice2 = ko.observable('Choice');
        this.choice3 = ko.observable('Choice');

        var answer1;
        var answer2;
        var answer3;

        var result="";


        this.Multidata = ko.observable();
        this.mes = ko.observable();
        // ham dung de  lay dap an user chon
        this.Answer1Click = function (clickOptions) {
            this.choice1(clickOptions.itemData);
        };
        this.Answer2Click = function (clickOptions) {
            this.choice2(clickOptions.itemData);
        };
        this.Answer3Click = function (clickOptions) {
            this.choice3(clickOptions.itemData);
        };


       
        // ham dung de load du lieu len questiondetail view by data
        this.fromJS = function (data) {
            if (!data) {
                return;
            }
            else {
                this.src(data.src);
                this.answwer1source(data.listA);
                this.answwer2source(data.listB);
                this.answwer3source(data.listC);
                answer1 = data.A;
                answer2 = data.B;
                answer3 = data.c;
            }

        };

        //summit method
        this.summit = function () {
            result = "";
            if (this.choice1() == answer1) {
                result += "1 correct";
            }
            if (this.choice2() == answer2) {
                result += "2 correct";
            }
            if (this.choice3() == answer3) {
                result += "3 correct";
            }
            alert(result);
        };
    };
})();

