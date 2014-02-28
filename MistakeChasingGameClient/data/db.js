﻿/// <reference path="../js/jquery-1.9.1.min.js" />
/// <reference path="../js/knockout-2.2.1.js" />
/// <reference path="../js/dx.all.js" />

(function () {

    var findbugs = [
         { id: 1, src: "images/findbugQ/P1.jpg", dif: 4, width: "9%", height: "5%", top: "9%", left: "42%" },
         { id: 2, src: "images/findbugQ/P2.jpg", dif: 1, width: "5%", height: "5%", top: "12% ", left: "9%" },
         { id: 3, src: "images/findbugQ/P3.jpg", dif: 2, width: "5% ", height: "5%", top: "11% ", left: "31%" },
         { id: 4, src: "images/findbugQ/P4.jpg", dif: 1, width: "5%", height: "5%", top: "2%", left: "20%" },
         { id: 5, src: "images/findbugQ/P5.jpg", dif: 3, width: "7%", height: "5%", top: "10%", left: "13%" },
         { id: 6, src: "images/findbugQ/P6.jpg", dif: 5, width: "10%", height: "5%", top: "7%", left: "19%" },
         { id: 7, src: "images/findbugQ/P7.jpg", dif: 2, width: "11%", height: "5%", top: "11%", left: "59%" },
         { id: 8, src: "images/findbugQ/P8.jpg", dif: 5, width: "5%", height: "5%", top: "22%", left: "54%" },
         { id: 9, src: "images/findbugQ/P9.jpg", dif: 6, width: "12%", height: "5%", top: "24%", left: "16%" },
         { id: 10, src: "images/findbugQ/P10.jpg", dif: 4, width: "12%", height: "5%", top: "10%", left: "19%" },
         { id: 11, src: "images/findbugQ/P11.jpg", dif: 7, width: "17%", height: "5%", top: "40%", left: "19%" },
         { id: 12, src: "images/findbugQ/P12.jpg", dif: 8, width: "7%", height: "5%", top: "32%", left: "14%" },
         { id: 13, src: "images/findbugQ/P13.jpg", dif: 6, width: "7%", height: "5%", top: "13%", left: "18%" },
         { id: 14, src: "images/findbugQ/P14.jpg", dif: 2, width: "12%", height: "5%", top: "20%", left: "21%" },
         { id: 15, src: "images/findbugQ/P15.jpg", dif: 8, width: "13%", height: "5%", top: "35%", left: "52%" },
         { id: 16, src: "images/findbugQ/P16.jpg", dif: 1, width: "11%", height: "5%", top: "10%", left: "5%" },
         { id: 17, src: "images/findbugQ/P17.jpg", dif: 9, width: "9%", height: "5%", top: "8%", left: "15%" },
         { id: 18, src: "images/findbugQ/P18.jpg", dif: 8, width: "9%", height: "5%", top: "11%", left: "10%" },
         { id: 19, src: "images/findbugQ/P19.jpg", dif: 10, width: "8%", height: "5%", top: "30%", left: "26%" },
         { id: 20, src: "images/findbugQ/P20.jpg", dif: 12, width: "24%", height: "5%", top: "22%", left: "12%" },
         { id: 21, src: "images/findbugQ/P21.jpg", dif: 11, width: "18%", height: "5%", top: "2%", left: "58%" },
         { id: 22, src: "images/findbugQ/P22.jpg", dif: 14, width: "10%", height: "5%", top: "15%", left: "20%" },
         { id: 23, src: "images/findbugQ/P23.jpg", dif: 13, width: "19%", height: "5%", top: "13%", left: "16%" },
         { id: 24, src: "images/findbugQ/P24.jpg", dif: 17, width: "47%", height: "5%", top: "16%", left: "8%" },
         { id: 25, src: "images/findbugQ/P25.jpg", dif: 15, width: "10%", height: "5%", top: "15%", left: "21%" },
         { id: 26, src: "images/findbugQ/P26.jpg", dif: 16, width: "10%", height: "5%", top: "21%", left: "6%" },
         { id: 27, src: "images/findbugQ/P27.jpg", dif: 14, width: "16%", height: "5%", top: "0%", left: "39%" },
         { id: 28, src: "images/findbugQ/P28.jpg", dif: 19, width: "14%", height: "5%", top: "32%", left: "11%" },
         { id: 29, src: "images/findbugQ/P29.jpg", dif: 18, width: "13%", height: "5%", top: "15%", left: "7%" },
         { id: 30, src: "images/findbugQ/P30.jpg", dif: 20, width: "12%", height: "5%", top: "32%", left: "12%" }
    ];

    // Data for filling blank questions
    var fillingblank = [
        { id: 1, src: "images/fillinBlankQ/F1.jpg", dif: 4, listA: ["mark >= 49", "mark <= 49", "mark >= 50"], listB: ["pass", "fail", "A&B are true"], listC: ["pass", "fail", "A&B are true"], A: "mark >= 50", B: "pass", C: "fail" },
        { id: 2, src: "images/fillinBlankQ/F2.jpg", dif: 13, listA: ["number/2 != 0", "number/2 == 0", "number/3 == 0"], listB: ["Odd", "Even", "A&B are true"], listC: ["Odd", "Even", "A&B are true"], A: "number/2 == 0", B: "Even", C: "Odd" },
        { id: 3, src: "images/fillinBlankQ/F3.jpg", dif: 1, listA: ["void", "class", "static"], listB: ["void", "class", "abstract"], listC: ["writeln", "println", "write"], A: "class", B: "void", C: "println" },
        { id: 4, src: "images/fillinBlankQ/F4.jpg", dif: 5, listA: ["i = 4", "i = 5", "i = j"], listB: ["j = 4", "j = 0", "j = i"], listC: ["\"*\"", "\"**\"", "\"***\""], A: "i = 5", B: "j = i", C: "\"*\"" },
        { id: 5, src: "images/fillinBlankQ/F5.jpg", dif: 5, listA: ["!", "null", "A&B are false"], listB: ["||", "@@", "<="], listC: ["true", "false", "vacation"], A: "!", B: "||", C: "false" },
        { id: 6, src: "images/fillinBlankQ/F6.jpg", dif: 6, listA: ["||", "&&", "<="], listB: ["||", "<=", "&&"], listC: ["true", "false", "bSmile"], A: "&&", B: "&&", C: "false" },
        { id: 7, src: "images/fillinBlankQ/F7.jpg", dif: 8, listA: ["*", "+", "-"], listB: [">", "<=", "=="], listC: ["+", "-", "*"], A: "+", B: "==", C: "*" },
        { id: 8, src: "images/fillinBlankQ/F8.jpg", dif: 7, listA: [">=", "==", "<="], listB: ["21 + n", "21 - n", "21 * n"], listC: ["+", "-", "*"], A: "<=", B: "21 - n", C: "*" },
        { id: 9, src: "images/fillinBlankQ/F9.jpg", dif: 3, listA: ["||", "==", "&&"], listB: ["<", ">", "="], listC: ["<", ">", "="], A: "&&", B: "<", C: ">" },
		{ id: 10, src: "images/fillinBlankQ/F10.jpg", dif: 3, listA: ["&&", "||", "=="], listB: ["&&", "||", "=="], listC: ["&&", "||", "=="], A: "||", B: "||", C: "&&" },
		{ id: 11, src: "images/fillinBlankQ/F11.jpg", dif: 10, listA: ["class", "void", "synchronized"], listB: ["start()", "stop()", "run()"], listC: ["start()", "stop()", "run()"], A: "synchronized", B: "start()", C: "start()" },
		{ id: 12, src: "images/fillinBlankQ/F12.jpg", dif: 9, listA: ["void", "class", "synchronized"], listB: ["inherits", "extends", "protected"], listC: ["void", "null", "0"], A: "synchronized", B: "extends", C: "null" },
		{ id: 13, src: "images/fillinBlankQ/F13.jpg", dif: 4, listA: ["1", "2", "3"], listB: ["<", ">", "="], listC: ["long", "width", "length"], A: "1", B: "<", C: "length" },
		{ id: 14, src: "images/fillinBlankQ/F14.jpg", dif: 12, listA: ["1", "2", "3"], listB: ["1", "2", "3"], listC: ["(i)", "{i}", "[i]"], A: "1", B: "2", C: "(i)" },
		{ id: 15, src: "images/fillinBlankQ/F15.jpg", dif: 11, listA: ["1", "2", "3"], listB: ["1", "2", "3"], listC: ["1", "2", "3"], A: "3", B: "2", C: "1" },
		{ id: 16, src: "images/fillinBlankQ/F16.jpg", dif: 10, listA: ["string", "static", "new"], listB: ["string", "static", "new"], listC: ["s1==s2", "s1.equals(s2)", "s1!=s2"], A: "new", B: "new", C: "s1.equals(s2)" },
		{ id: 17, src: "images/fillinBlankQ/F17.jpg", dif: 19, listA: ["static", "void", "class"], listB: ["!=", "==", "<="], listC: ["!=", "==", "<="], A: "static", B: "==", C: "==" },
		{ id: 18, src: "images/fillinBlankQ/F18.jpg", dif: 17, listA: ["static", "void", "class"], listB: [">=", "<=", "=="], listC: [">=", "<=", "=="], A: "static", B: "<=", C: "==" },
		{ id: 19, src: "images/fillinBlankQ/F19.jpg", dif: 14, listA: ["<=", ">=", "=="], listB: ["n + 1", "n - 1", "n * 1"], listC: ["n", "true", "result"], A: "==", B: "n - 1", C: "result" },
		{ id: 20, src: "images/fillinBlankQ/F20.jpg", dif: 15, listA: ["class", "void", "extends"], listB: ["class", "void", "extends"], listC: ["class", "void", "extends"], A: "class", B: "extends", C: "void" },
		{ id: 21, src: "images/fillinBlankQ/F21.jpg", dif: 20, listA: ["demo", "d", "add"], listB: ["a", "b", "x"], listC: ["a", "b", "y"], A: "d", B: "x", C: "y" },
		{ id: 22, src: "images/fillinBlankQ/F22.jpg", dif: 21, listA: ["extends", "void", "class"], listB: ["protected", "static", "null"], listC: ["writeln", "println", "write"], A: "class", B: "static", C: "println" },
		{ id: 23, src: "images/fillinBlankQ/F23.jpg", dif: 12, listA: ["static", "void", "class"], listB: ["static", "void", "class"], listC: ["static", "void", "class"], A: "class", B: "static", C: "static" },
		{ id: 24, src: "images/fillinBlankQ/F24.jpg", dif: 8, listA: ["<", ">", "="], listB: ["<=", ">=", "=="], listC: ["+=", "-=", "*="], A: "<", B: "<=", C: "*=" },
		{ id: 25, src: "images/fillinBlankQ/F25.jpg", dif: 5, listA: ["+", "-", "="], listB: ["+", "-", "="], listC: ["+", "-", "="], A: "+", B: "=", C: "=" },
		{ id: 26, src: "images/fillinBlankQ/F26.jpg", dif: 15, listA: ["[i]", "width", "length"], listB: ["[i]", "width", "length"], listC: ["[i]", "width", "length"], A: "length", B: "length", C: "[i]" },
		{ id: 27, src: "images/fillinBlankQ/F27.jpg", dif: 14, listA: ["x1,y1", "x2,y2", "x2,y1"], listB: ["draw", "drawableRect", "drawRect"], listC: ["y1 + y2", "y2 - y1", "y1 - y2"], A: "x2,y2", B: "drawRect", C: "y2 - y1" },
		{ id: 28, src: "images/fillinBlankQ/F28.jpg", dif: 11, listA: ["&&", "==", "%"], listB: ["&&", "==", "%"], listC: ["&&", "==", "%"], A: "%", B: "%", C: "%" },
		{ id: 29, src: "images/fillinBlankQ/F29.jpg", dif: 2, listA: ["exit;", "return;", "break;"], listB: ["exit;", "return;", "break;"], listC: ["exit;", "return;", "break;"], A: "break;", B: "break;", C: "break;" },
		{ id: 30, src: "images/fillinBlankQ/F30.jpg", dif: 8, listA: ["static", "void", "class"], listB: ["<", ">", "="], listC: ["a", "i", "0"], A: "static", B: "<", C: "i" }
    ];

    // Data for multiple choices questions
    var multiplechoice = [
        { id: 1, src: "images/MultipleChoice/M1.jpg", dif: 1, listAns: ['NullPointer', '2_CapitalizatonError', 'ZeroIndexed'], ans: 'NullPointer' }
    ];


    MistakeChasingGameClient.db = {
        findbugsdb:
            new DevExpress.data.ArrayStore({
            data: findbugs,
            key: 'id'
        }),
        fillingblankdb: new DevExpress.data.ArrayStore({
            data: fillingblank,
            key: 'id'
        }),
        multiplechoicedb: new DevExpress.data.ArrayStore({
            data: multiplechoice,
            key: 'id'
        })
    }
})();