﻿/// <reference path="../js/jquery-1.9.1.min.js" />
/// <reference path="../js/knockout-2.2.1.js" />
/// <reference path="../js/dx.all.js" />

(function () {

    // Data for find bug questions
    var questions = [
        { id: 1, src: "images/findbugQ/P1.jpg", dif: 1, type: "findbugs", description: "" },
        { id: 2, src: "images/findbugQ/P2.jpg", dif: 1, type: "findbugs", description: "" },
        { id: 3, src: "images/findbugQ/P3.jpg", dif: 1, type: "findbugs", description: "" },
        { id: 4, src: "images/findbugQ/P4.jpg", dif: 1, type: "findbugs", description: "" },
        { id: 5, src: "images/findbugQ/P5.jpg", dif: 1, type: "findbugs", description: "" },
        { id: 6, src: "images/findbugQ/P6.jpg", dif: 2, type: "findbugs", description: "" },
        { id: 7, src: "images/findbugQ/P7.jpg", dif: 2, type: "findbugs", description: "" },
        { id: 8, src: "images/findbugQ/P8.jpg", dif: 2, type: "findbugs", description: "" },
        { id: 9, src: "images/findbugQ/P9.jpg", dif: 2, type: "findbugs", description: "" },
        { id: 10, src: "images/findbugQ/P10.jpg", dif: 2, type: "findbugs", description: "" },
		{ id: 11, src: "images/findbugQ/P11.jpg", dif: 3, type: "findbugs", description: "" },
		{ id: 12, src: "images/findbugQ/P12.jpg", dif: 3, type: "findbugs", description: "" },
		{ id: 13, src: "images/findbugQ/P13.jpg", dif: 3, type: "findbugs", description: "" },
		{ id: 14, src: "images/findbugQ/P14.jpg", dif: 3, type: "findbugs", description: "" },
		{ id: 15, src: "images/findbugQ/P15.jpg", dif: 3, type: "findbugs", description: "" },
		{ id: 16, src: "images/findbugQ/P16.jpg", dif: 4, type: "findbugs", description: "" },
		{ id: 17, src: "images/findbugQ/P17.jpg", dif: 4, type: "findbugs", description: "" },
        { id: 18, src: "images/findbugQ/P18.jpg", dif: 4, type: "findbugs", description: "" },
		{ id: 19, src: "images/findbugQ/P19.jpg", dif: 4, type: "findbugs", description: "" },
		{ id: 20, src: "images/findbugQ/P20.jpg", dif: 4, type: "findbugs", description: "" },
		{ id: 21, src: "images/findbugQ/P21.jpg", dif: 5, type: "findbugs", description: "" },
		{ id: 22, src: "images/findbugQ/P22.jpg", dif: 5, type: "findbugs", description: "" },
		{ id: 23, src: "images/findbugQ/P23.jpg", dif: 5, type: "findbugs", description: "" },
		{ id: 24, src: "images/findbugQ/P24.jpg", dif: 5, type: "findbugs", description: "" },
		{ id: 25, src: "images/findbugQ/P25.jpg", dif: 6, type: "findbugs", description: "" },
		{ id: 26, src: "images/findbugQ/P26.jpg", dif: 6, type: "findbugs", description: "" },
		{ id: 27, src: "images/findbugQ/P27.jpg", dif: 6, type: "findbugs", description: "" },
		{ id: 28, src: "images/findbugQ/P28.jpg", dif: 6, type: "findbugs", description: "" },
		{ id: 29, src: "images/findbugQ/P29.jpg", dif: 7, type: "findbugs", description: "" },
		{ id: 30, src: "images/findbugQ/P30.jpg", dif: 7, type: "findbugs", description: "" },
		{ id: 31, src: "images/findbugQ/P31.jpg", dif: 7, type: "findbugs", description: "" },
        { id: 32, src: "images/findbugQ/P32.jpg", dif: 7, type: "findbugs", description: "" },
        { id: 33, src: "images/findbugQ/P33.jpg", dif: 8, type: "findbugs", description: "" },
        { id: 34, src: "images/findbugQ/P34.jpg", dif: 8, type: "findbugs", description: "" },
        { id: 35, src: "images/findbugQ/P35.jpg", dif: 8, type: "findbugs", description: "" },
        { id: 36, src: "images/findbugQ/P36.jpg", dif: 8, type: "findbugs", description: "" },
        { id: 37, src: "images/findbugQ/P37.jpg", dif: 9, type: "findbugs", description: "" },
        { id: 38, src: "images/findbugQ/P38.jpg", dif: 9, type: "findbugs", description: "" },
        { id: 39, src: "images/findbugQ/P39.jpg", dif: 9, type: "findbugs", description: "" },
        { id: 40, src: "images/findbugQ/P40.jpg", dif: 9, type: "findbugs", description: "" },
		{ id: 41, src: "images/findbugQ/P41.jpg", dif: 10, type: "findbugs", description: "" },
		{ id: 42, src: "images/findbugQ/P42.jpg", dif: 10, type: "findbugs", description: "" },
		{ id: 43, src: "images/findbugQ/P43.jpg", dif: 10, type: "findbugs", description: "" },
		{ id: 44, src: "images/findbugQ/P44.jpg", dif: 10, type: "findbugs", description: "" },
		{ id: 45, src: "images/findbugQ/P45.jpg", dif: 11, type: "findbugs", description: "" },
		{ id: 46, src: "images/findbugQ/P46.jpg", dif: 11, type: "findbugs", description: "" },
		{ id: 47, src: "images/findbugQ/P47.jpg", dif: 11, type: "findbugs", description: "" },
		{ id: 48, src: "images/findbugQ/P48.jpg", dif: 11, type: "findbugs", description: "" },
        { id: 49, src: "images/findbugQ/P49.jpg", dif: 12, type: "findbugs", description: "" },
		{ id: 50, src: "images/findbugQ/P50.jpg", dif: 12, type: "findbugs", description: "" },
		{ id: 51, src: "images/findbugQ/P51.jpg", dif: 12, type: "findbugs", description: "" },
		{ id: 52, src: "images/findbugQ/P52.jpg", dif: 12, type: "findbugs", description: "" },
		{ id: 53, src: "images/findbugQ/P53.jpg", dif: 13, type: "findbugs", description: "" },
		{ id: 54, src: "images/findbugQ/P54.jpg", dif: 13, type: "findbugs", description: "" },
		{ id: 55, src: "images/findbugQ/P55.jpg", dif: 13, type: "findbugs", description: "" },
		{ id: 56, src: "images/findbugQ/P56.jpg", dif: 13, type: "findbugs", description: "" },
		{ id: 57, src: "images/findbugQ/P57.jpg", dif: 14, type: "findbugs", description: "" },
		{ id: 58, src: "images/findbugQ/P58.jpg", dif: 14, type: "findbugs", description: "" },
		{ id: 59, src: "images/findbugQ/P59.jpg", dif: 14, type: "findbugs", description: "" },
		{ id: 60, src: "images/findbugQ/P60.jpg", dif: 14, type: "findbugs", description: "" },
		{ id: 61, src: "images/findbugQ/P61.jpg", dif: 15, type: "findbugs", description: "" },
        { id: 62, src: "images/findbugQ/P62.jpg", dif: 15, type: "findbugs", description: "" },
        { id: 63, src: "images/findbugQ/P63.jpg", dif: 15, type: "findbugs", description: "" },
        { id: 64, src: "images/findbugQ/P64.jpg", dif: 15, type: "findbugs", description: "" },
        { id: 65, src: "images/findbugQ/P65.jpg", dif: 16, type: "findbugs", description: "" },
        { id: 66, src: "images/findbugQ/P66.jpg", dif: 16, type: "findbugs", description: "" },
        { id: 67, src: "images/findbugQ/P67.jpg", dif: 16, type: "findbugs", description: "" },
        { id: 68, src: "images/findbugQ/P68.jpg", dif: 16, type: "findbugs", description: "" },
        { id: 69, src: "images/findbugQ/P69.jpg", dif: 17, type: "findbugs", description: "" },
        { id: 70, src: "images/findbugQ/P70.jpg", dif: 17, type: "findbugs", description: "" },
		{ id: 71, src: "images/findbugQ/P71.jpg", dif: 17, type: "findbugs", description: "" },
		{ id: 72, src: "images/findbugQ/P72.jpg", dif: 17, type: "findbugs", description: "" },
		{ id: 73, src: "images/findbugQ/P73.jpg", dif: 17, type: "findbugs", description: "" },
		{ id: 74, src: "images/findbugQ/P74.jpg", dif: 18, type: "findbugs", description: "" },
		{ id: 75, src: "images/findbugQ/P75.jpg", dif: 18, type: "findbugs", description: "" },
		{ id: 76, src: "images/findbugQ/P76.jpg", dif: 18, type: "findbugs", description: "" },
		{ id: 77, src: "images/findbugQ/P77.jpg", dif: 18, type: "findbugs", description: "" },
		{ id: 78, src: "images/findbugQ/P78.jpg", dif: 18, type: "findbugs", description: "" },
		{ id: 79, src: "images/findbugQ/P79.jpg", dif: 18, type: "findbugs", description: "" },
		{ id: 80, src: "images/findbugQ/P80.jpg", dif: 19, type: "findbugs", description: "" },
		{ id: 81, src: "images/findbugQ/P81.jpg", dif: 19, type: "findbugs", description: "" },
		{ id: 82, src: "images/findbugQ/P82.jpg", dif: 19, type: "findbugs", description: "" },
		{ id: 83, src: "images/findbugQ/P83.jpg", dif: 19, type: "findbugs", description: "" },
		{ id: 84, src: "images/findbugQ/P84.jpg", dif: 19, type: "findbugs", description: "" },
		{ id: 85, src: "images/findbugQ/P85.jpg", dif: 19, type: "findbugs", description: "" },
		{ id: 86, src: "images/findbugQ/P86.jpg", dif: 19, type: "findbugs", description: "" },
		{ id: 87, src: "images/findbugQ/P87.jpg", dif: 20, type: "findbugs", description: "" },
		{ id: 88, src: "images/findbugQ/P88.jpg", dif: 20, type: "findbugs", description: "" },
		{ id: 89, src: "images/findbugQ/P89.jpg", dif: 20, type: "findbugs", description: "" },
		{ id: 90, src: "images/findbugQ/P90.jpg", dif: 20, type: "findbugs", description: "" },
		{ id: 91, src: "images/findbugQ/P91.jpg", dif: 20, type: "findbugs", description: "" },
		{ id: 92, src: "images/findbugQ/P92.jpg", dif: 20, type: "findbugs", description: "" },
		{ id: 93, src: "images/findbugQ/P93.jpg", dif: 21, type: "findbugs", description: "" },
		{ id: 94, src: "images/findbugQ/P94.jpg", dif: 21, type: "findbugs", description: "" },
		{ id: 95, src: "images/findbugQ/P95.jpg", dif: 21, type: "findbugs", description: "" },
		{ id: 96, src: "images/findbugQ/P96.jpg", dif: 21, type: "findbugs", description: "" },
		{ id: 97, src: "images/findbugQ/P97.jpg", dif: 21, type: "findbugs", description: "" },
		{ id: 98, src: "images/findbugQ/P98.jpg", dif: 17, type: "findbugs", description: "" },
		{ id: 99, src: "images/findbugQ/P99.jpg", dif: 18, type: "findbugs", description: "" },
		{ id: 100, src: "images/findbugQ/P100.jpg", dif: 19, type: "findbugs", description: "" },

        { id: 2001, src: "images/MultipleChoice/001.png", dif: 1, type: "singleChoice", description: "" },
		{ id: 2002, src: "images/MultipleChoice/002.png", dif: 1, type: "singleChoice", description: "" },
		{ id: 2003, src: "images/MultipleChoice/003.png", dif: 2, type: "singleChoice", description: "" },
		{ id: 2004, src: "images/MultipleChoice/004.png", dif: 2, type: "singleChoice", description: "" },
		{ id: 2005, src: "images/MultipleChoice/005.png", dif: 3, type: "singleChoice", description: "" },
		{ id: 2006, src: "images/MultipleChoice/006.png", dif: 3, type: "singleChoice", description: "" },
		{ id: 2007, src: "images/MultipleChoice/007.png", dif: 4, type: "singleChoice", description: "" },
		{ id: 2008, src: "images/MultipleChoice/008.png", dif: 4, type: "singleChoice", description: "" },
		{ id: 2009, src: "images/MultipleChoice/009.png", dif: 4, type: "singleChoice", description: "" },
		{ id: 2010, src: "images/MultipleChoice/010.png", dif: 5, type: "singleChoice", description: "" },
        { id: 2011, src: "images/MultipleChoice/011.png", dif: 5, type: "singleChoice", description: "" },
		{ id: 2012, src: "images/MultipleChoice/012.png", dif: 6, type: "singleChoice", description: "" },
		{ id: 2013, src: "images/MultipleChoice/013.png", dif: 6, type: "singleChoice", description: "" },
		{ id: 2014, src: "images/MultipleChoice/014.png", dif: 6, type: "singleChoice", description: "" },
		{ id: 2015, src: "images/MultipleChoice/015.png", dif: 7, type: "singleChoice", description: "" },
		{ id: 2016, src: "images/MultipleChoice/016.png", dif: 7, type: "singleChoice", description: "" },
		{ id: 2017, src: "images/MultipleChoice/017.png", dif: 8, type: "singleChoice", description: "" },
		{ id: 2018, src: "images/MultipleChoice/018.png", dif: 8, type: "singleChoice", description: "" },
		{ id: 2019, src: "images/MultipleChoice/019.png", dif: 9, type: "singleChoice", description: "" },
		{ id: 2020, src: "images/MultipleChoice/020.png", dif: 9, type: "singleChoice", description: "" },
		{ id: 2021, src: "images/MultipleChoice/021.png", dif: 10, type: "singleChoice", description: "" },
		{ id: 2022, src: "images/MultipleChoice/022.png", dif: 10, type: "singleChoice", description: "" },
		{ id: 2023, src: "images/MultipleChoice/023.png", dif: 10, type: "singleChoice", description: "" },
		{ id: 2024, src: "images/MultipleChoice/024.png", dif: 11, type: "singleChoice", description: "" },
		{ id: 2025, src: "images/MultipleChoice/025.png", dif: 11, type: "singleChoice", description: "" },
        { id: 2026, src: "images/MultipleChoice/026.png", dif: 12, type: "singleChoice", description: "" },
		{ id: 2027, src: "images/MultipleChoice/027.png", dif: 12, type: "singleChoice", description: "" },
		{ id: 2028, src: "images/MultipleChoice/028.png", dif: 13, type: "singleChoice", description: "" },
		{ id: 2029, src: "images/MultipleChoice/029.png", dif: 13, type: "singleChoice", description: "" },
		{ id: 2030, src: "images/MultipleChoice/030.png", dif: 14, type: "singleChoice", description: "" },
		{ id: 2031, src: "images/MultipleChoice/031.png", dif: 14, type: "singleChoice", description: "" },
		{ id: 2032, src: "images/MultipleChoice/032.png", dif: 14, type: "singleChoice", description: "" },
		{ id: 2033, src: "images/MultipleChoice/033.png", dif: 15, type: "singleChoice", description: "" },
		{ id: 2034, src: "images/MultipleChoice/034.png", dif: 15, type: "singleChoice", description: "" },
		{ id: 2035, src: "images/MultipleChoice/035.png", dif: 15, type: "singleChoice", description: "" },
		{ id: 2036, src: "images/MultipleChoice/036.png", dif: 16, type: "singleChoice", description: "" },
		{ id: 2037, src: "images/MultipleChoice/037.png", dif: 16, type: "singleChoice", description: "" },
        { id: 2038, src: "images/MultipleChoice/038.png", dif: 16, type: "singleChoice", description: "" },
		{ id: 2039, src: "images/MultipleChoice/039.png", dif: 17, type: "singleChoice", description: "" },
		{ id: 2040, src: "images/MultipleChoice/040.png", dif: 17, type: "singleChoice", description: "" },
		{ id: 2041, src: "images/MultipleChoice/041.png", dif: 17, type: "singleChoice", description: "" },
		{ id: 2042, src: "images/MultipleChoice/042.png", dif: 18, type: "singleChoice", description: "" },
		{ id: 2043, src: "images/MultipleChoice/043.png", dif: 18, type: "singleChoice", description: "" },
		{ id: 2044, src: "images/MultipleChoice/044.png", dif: 19, type: "singleChoice", description: "" },
		{ id: 2045, src: "images/MultipleChoice/045.png", dif: 19, type: "singleChoice", description: "" },
		{ id: 2046, src: "images/MultipleChoice/046.png", dif: 20, type: "singleChoice", description: "" },
		{ id: 2047, src: "images/MultipleChoice/047.png", dif: 20, type: "singleChoice", description: "" },
		{ id: 2048, src: "images/MultipleChoice/048.png", dif: 20, type: "singleChoice", description: "" },
		{ id: 2049, src: "images/MultipleChoice/049.png", dif: 21, type: "singleChoice", description: "" },
		{ id: 2050, src: "images/MultipleChoice/050.png", dif: 21, type: "singleChoice", description: "" },

        { id: 1001, src: "images/fillinBlankQ/001.png", dif: 1, type: "fillingBlanks", description: "" },
        { id: 1002, src: "images/fillinBlankQ/002.png", dif: 1, type: "fillingBlanks", description: "" },
        { id: 1003, src: "images/fillinBlankQ/003.png", dif: 1, type: "fillingBlanks", description: "" },
        { id: 1004, src: "images/fillinBlankQ/004.png", dif: 1, type: "fillingBlanks", description: "" },
        { id: 1005, src: "images/fillinBlankQ/005.png", dif: 2, type: "fillingBlanks", description: "" },
        { id: 1006, src: "images/fillinBlankQ/006.png", dif: 2, type: "fillingBlanks", description: "" },
        { id: 1007, src: "images/fillinBlankQ/007.png", dif: 2, type: "fillingBlanks", description: "" },
        { id: 1008, src: "images/fillinBlankQ/008.png", dif: 2, type: "fillingBlanks", description: "" },
        { id: 1009, src: "images/fillinBlankQ/009.png", dif: 3, type: "fillingBlanks", description: "" },
        { id: 1010, src: "images/fillinBlankQ/010.png", dif: 3, type: "fillingBlanks", description: "" },
		{ id: 1011, src: "images/fillinBlankQ/011.png", dif: 3, type: "fillingBlanks", description: "" },
		{ id: 1012, src: "images/fillinBlankQ/012.png", dif: 3, type: "fillingBlanks", description: "" },
		{ id: 1013, src: "images/fillinBlankQ/013.png", dif: 4, type: "fillingBlanks", description: "" },
		{ id: 1014, src: "images/fillinBlankQ/014.png", dif: 4, type: "fillingBlanks", description: "" },
		{ id: 1015, src: "images/fillinBlankQ/015.png", dif: 4, type: "fillingBlanks", description: "" },
		{ id: 1016, src: "images/fillinBlankQ/016.png", dif: 4, type: "fillingBlanks", description: "" },
		{ id: 1017, src: "images/fillinBlankQ/017.png", dif: 5, type: "fillingBlanks", description: "" },
		{ id: 1018, src: "images/fillinBlankQ/018.png", dif: 5, type: "fillingBlanks", description: "" },
		{ id: 1019, src: "images/fillinBlankQ/019.png", dif: 5, type: "fillingBlanks", description: "" },
		{ id: 1020, src: "images/fillinBlankQ/020.png", dif: 5, type: "fillingBlanks", description: "" },
		{ id: 1021, src: "images/fillinBlankQ/021.png", dif: 6, type: "fillingBlanks", description: "" },
		{ id: 1022, src: "images/fillinBlankQ/022.png", dif: 6, type: "fillingBlanks", description: "" },
        { id: 1023, src: "images/fillinBlankQ/023.png", dif: 6, type: "fillingBlanks", description: "" },
		{ id: 1024, src: "images/fillinBlankQ/024.png", dif: 6, type: "fillingBlanks", description: "" },
		{ id: 1025, src: "images/fillinBlankQ/025.png", dif: 7, type: "fillingBlanks", description: "" },
		{ id: 1026, src: "images/fillinBlankQ/026.png", dif: 7, type: "fillingBlanks", description: "" },
		{ id: 1027, src: "images/fillinBlankQ/027.png", dif: 7, type: "fillingBlanks", description: "" },
		{ id: 1028, src: "images/fillinBlankQ/028.png", dif: 7, type: "fillingBlanks", description: "" },
		{ id: 1029, src: "images/fillinBlankQ/029.png", dif: 8, type: "fillingBlanks", description: "" },
		{ id: 1030, src: "images/fillinBlankQ/030.png", dif: 8, type: "fillingBlanks", description: "" },
		{ id: 1031, src: "images/fillinBlankQ/031.png", dif: 8, type: "fillingBlanks", description: "" },
        { id: 1032, src: "images/fillinBlankQ/032.png", dif: 8, type: "fillingBlanks", description: "" },
        { id: 1033, src: "images/fillinBlankQ/033.png", dif: 9, type: "fillingBlanks", description: "" },
        { id: 1034, src: "images/fillinBlankQ/034.png", dif: 9, type: "fillingBlanks", description: "" },
        { id: 1035, src: "images/fillinBlankQ/035.png", dif: 9, type: "fillingBlanks", description: "" },
        { id: 1036, src: "images/fillinBlankQ/036.png", dif: 9, type: "fillingBlanks", description: "" },
        { id: 1037, src: "images/fillinBlankQ/037.png", dif: 10, type: "fillingBlanks", description: "" },
        { id: 1038, src: "images/fillinBlankQ/038.png", dif: 10, type: "fillingBlanks", description: "" },
        { id: 1039, src: "images/fillinBlankQ/039.png", dif: 10, type: "fillingBlanks", description: "" },
		{ id: 1040, src: "images/fillinBlankQ/040.png", dif: 10, type: "fillingBlanks", description: "" },
        { id: 1041, src: "images/fillinBlankQ/041.png", dif: 11, type: "fillingBlanks", description: "" },
        { id: 1042, src: "images/fillinBlankQ/042.png", dif: 11, type: "fillingBlanks", description: "" },
        { id: 1043, src: "images/fillinBlankQ/043.png", dif: 11, type: "fillingBlanks", description: "" },
        { id: 1044, src: "images/fillinBlankQ/044.png", dif: 11, type: "fillingBlanks", description: "" },
        { id: 1045, src: "images/fillinBlankQ/045.png", dif: 12, type: "fillingBlanks", description: "" },
        { id: 1046, src: "images/fillinBlankQ/046.png", dif: 12, type: "fillingBlanks", description: "" },
        { id: 1047, src: "images/fillinBlankQ/047.png", dif: 12, type: "fillingBlanks", description: "" },
        { id: 1048, src: "images/fillinBlankQ/048.png", dif: 12, type: "fillingBlanks", description: "" },
        { id: 1049, src: "images/fillinBlankQ/049.png", dif: 13, type: "fillingBlanks", description: "" },
		{ id: 1050, src: "images/fillinBlankQ/050.png", dif: 13, type: "fillingBlanks", description: "" },
		{ id: 1051, src: "images/fillinBlankQ/051.png", dif: 13, type: "fillingBlanks", description: "" },
        { id: 1052, src: "images/fillinBlankQ/052.png", dif: 13, type: "fillingBlanks", description: "" },
        { id: 1053, src: "images/fillinBlankQ/053.png", dif: 14, type: "fillingBlanks", description: "" },
        { id: 1054, src: "images/fillinBlankQ/054.png", dif: 14, type: "fillingBlanks", description: "" },
        { id: 1055, src: "images/fillinBlankQ/055.png", dif: 14, type: "fillingBlanks", description: "" },
        { id: 1056, src: "images/fillinBlankQ/056.png", dif: 14, type: "fillingBlanks", description: "" },
        { id: 1057, src: "images/fillinBlankQ/057.png", dif: 15, type: "fillingBlanks", description: "" },
        { id: 1058, src: "images/fillinBlankQ/058.png", dif: 15, type: "fillingBlanks", description: "" },
        { id: 1059, src: "images/fillinBlankQ/059.png", dif: 15, type: "fillingBlanks", description: "" },
		{ id: 1060, src: "images/fillinBlankQ/060.png", dif: 15, type: "fillingBlanks", description: "" },
		{ id: 1061, src: "images/fillinBlankQ/061.png", dif: 16, type: "fillingBlanks", description: "" },
        { id: 1062, src: "images/fillinBlankQ/062.png", dif: 16, type: "fillingBlanks", description: "" },
        { id: 1063, src: "images/fillinBlankQ/063.png", dif: 16, type: "fillingBlanks", description: "" },
        { id: 1064, src: "images/fillinBlankQ/064.png", dif: 16, type: "fillingBlanks", description: "" },
        { id: 1065, src: "images/fillinBlankQ/065.png", dif: 17, type: "fillingBlanks", description: "" },
        { id: 1066, src: "images/fillinBlankQ/066.png", dif: 17, type: "fillingBlanks", description: "" },
        { id: 1067, src: "images/fillinBlankQ/067.png", dif: 17, type: "fillingBlanks", description: "" },
        { id: 1068, src: "images/fillinBlankQ/068.png", dif: 18, type: "fillingBlanks", description: "" },
        { id: 1069, src: "images/fillinBlankQ/069.png", dif: 18, type: "fillingBlanks", description: "" },
		{ id: 1070, src: "images/fillinBlankQ/070.png", dif: 18, type: "fillingBlanks", description: "" },
		{ id: 1071, src: "images/fillinBlankQ/071.png", dif: 19, type: "fillingBlanks", description: "" },
        { id: 1072, src: "images/fillinBlankQ/072.png", dif: 19, type: "fillingBlanks", description: "" },
        { id: 1073, src: "images/fillinBlankQ/073.png", dif: 19, type: "fillingBlanks", description: "" },
        { id: 1074, src: "images/fillinBlankQ/074.png", dif: 20, type: "fillingBlanks", description: "" },
        { id: 1075, src: "images/fillinBlankQ/075.png", dif: 20, type: "fillingBlanks", description: "" },
        { id: 1076, src: "images/fillinBlankQ/076.png", dif: 20, type: "fillingBlanks", description: "" },
        { id: 1077, src: "images/fillinBlankQ/077.png", dif: 20, type: "fillingBlanks", description: "" },
        { id: 1078, src: "images/fillinBlankQ/078.png", dif: 21, type: "fillingBlanks", description: "" },
        { id: 1079, src: "images/fillinBlankQ/079.png", dif: 21, type: "fillingBlanks", description: "" },
		{ id: 1080, src: "images/fillinBlankQ/080.png", dif: 21, type: "fillingBlanks", description: "" }
    ];


    var findBugs = [
        { id: 1, questionId: 1, width: "12%", height: "6%", top: "7%", left: "65%" },
        { id: 2, questionId: 2, width: "7%", height: "6%", top: "8%", left: "11%" },
        { id: 3, questionId: 3, width: "5%", height: "6%", top: "6%", left: "50%" },
        { id: 4, questionId: 4, width: "5%", height: "6%", top: "0%", left: "28%" },
        { id: 5, questionId: 5, width: "7%", height: "6%", top: "8%", left: "16%" },
        { id: 6, questionId: 6, width: "12%", height: "5%", top: "4%", left: "29%" },
        { id: 7, questionId: 7, width: "13%", height: "6%", top: "7%", left: "80%" },
        { id: 8, questionId: 8, width: "5%", height: "6%", top: "14%", left: "75%" },
        { id: 9, questionId: 9, width: "17%", height: "6%", top: "19%", left: "18%" },
        { id: 10, questionId: 10, width: "16%", height: "6%", top: "8%", left: "29%" },
        { id: 11, questionId: 11, width: "16%", height: "6%", top: "26%", left: "25%" },
        { id: 12, questionId: 12, width: "5%", height: "6%", top: "21%", left: "18%" },
        { id: 13, questionId: 13, width: "8%", height: "6%", top: "7%", left: "26%" },
        { id: 14, questionId: 14, width: "13%", height: "6%", top: "15%", left: "34%" },
        { id: 15, questionId: 15, width: "11%", height: "6%", top: "25%", left: "64%" },
        { id: 16, questionId: 16, width: "7%", height: "6%", top: "8%", left: "12%" },
        { id: 17, questionId: 17, width: "5%", height: "6%", top: "3%", left: "25%" },
        { id: 18, questionId: 18, width: "7%", height: "5%", top: "7%", left: "19%" },
        { id: 19, questionId: 19, width: "5%", height: "6%", top: "22%", left: "46%" },
        { id: 20, questionId: 20, width: "23%", height: "6%", top: "14%", left: "16%" },
        { id: 21, questionId: 21, width: "21%", height: "5%", top: "0%", left: "78%" },
        { id: 22, questionId: 22, width: "14%", height: "6%", top: "13%", left: "32%" },
        { id: 23, questionId: 23, width: "13%", height: "4%", top: "8%", left: "24%" },
        { id: 24, questionId: 24, width: "36%", height: "5%", top: "11%", left: "9%" },
        { id: 25, questionId: 25, width: "11%", height: "6%", top: "11%", left: "26%" },
        { id: 26, questionId: 26, width: "11%", height: "5%", top: "13%", left: "7%" },
        { id: 27, questionId: 27, width: "19%", height: "5%", top: "0%", left: "55%" },
        { id: 28, questionId: 28, width: "16%", height: "6%", top: "22%", left: "16%" },
        { id: 29, questionId: 29, width: "14%", height: "6%", top: "11%", left: "9%" },
        { id: 30, questionId: 30, width: "13%", height: "5%", top: "22%", left: "14%" },
        { id: 31, questionId: 31, width: "12%", height: "5%", top: "31%", left: "21%" },
        { id: 32, questionId: 32, width: "15%", height: "5%", top: "14%", left: "24%" },
        { id: 33, questionId: 33, width: "29%", height: "5%", top: "0%", left: "33%" },
        { id: 34, questionId: 34, width: "25%", height: "8%", top: "55%", left: "35%" },
        { id: 35, questionId: 35, width: "13%", height: "4%", top: "21%", left: "13%" },
        { id: 36, questionId: 36, width: "6%", height: "5%", top: "28%", left: "24%" },
        { id: 37, questionId: 37, width: "5%", height: "6%", top: "11%", left: "24%" },
        { id: 38, questionId: 38, width: "6%", height: "6%", top: "51%", left: "59%" },
        { id: 39, questionId: 39, width: "5%", height: "5%", top: "33%", left: "35%" },
        { id: 40, questionId: 40, width: "7%", height: "6%", top: "30%", left: "40%" },
        { id: 41, questionId: 41, width: "14%", height: "5%", top: "10%", left: "17%" },
        { id: 42, questionId: 42, width: "13%", height: "5%", top: "7%", left: "23%" },
        { id: 43, questionId: 43, width: "10%", height: "5%", top: "18%", left: "34%" },
        { id: 44, questionId: 44, width: "11%", height: "5%", top: "18%", left: "34%" },
        { id: 45, questionId: 45, width: "19%", height: "5%", top: "21%", left: "35%" },
        { id: 46, questionId: 46, width: "11%", height: "6%", top: "6%", left: "7%" },
        { id: 47, questionId: 47, width: "5%", height: "5%", top: "4%", left: "26%" },
        { id: 48, questionId: 48, width: "6%", height: "5%", top: "21%", left: "32%" },
        { id: 49, questionId: 49, width: "15%", height: "5%", top: "19%", left: "13%" },
        { id: 50, questionId: 50, width: "7%", height: "5%", top: "9%", left: "19%" },
        { id: 51, questionId: 51, width: "19%", height: "4%", top: "0%", left: "53%" },
        { id: 52, questionId: 52, width: "10%", height: "6%", top: "10%", left: "18%" },
        { id: 53, questionId: 53, width: "13%", height: "5%", top: "3%", left: "9%" },
        { id: 54, questionId: 54, width: "10%", height: "6%", top: "32%", left: "27%" },
        { id: 55, questionId: 55, width: "9%", height: "5%", top: "29%", left: "26%" },
        { id: 56, questionId: 56, width: "6%", height: "5%", top: "14%", left: "56%" },
        { id: 57, questionId: 57, width: "11%", height: "5%", top: "30%", left: "70%" },
        { id: 58, questionId: 58, width: "8%", height: "5%", top: "16%", left: "27%" },
        { id: 59, questionId: 59, width: "10%", height: "4%", top: "43%", left: "38%" },
        { id: 60, questionId: 60, width: "23%", height: "5%", top: "41%", left: "17%" },
        { id: 61, questionId: 61, width: "7%", height: "5%", top: "17%", left: "49%" },
        { id: 62, questionId: 62, width: "6%", height: "6%", top: "33%", left: "81%" },
        { id: 63, questionId: 63, width: "5%", height: "5%", top: "30%", left: "40%" },
        { id: 64, questionId: 64, width: "7%", height: "5%", top: "8%", left: "69%" },
        { id: 65, questionId: 65, width: "12%", height: "5%", top: "32%", left: "14%" },
        { id: 66, questionId: 66, width: "6%", height: "5%", top: "56%", left: "38%" },
        { id: 67, questionId: 67, width: "8%", height: "6%", top: "22%", left: "32%" },
        { id: 68, questionId: 68, width: "5%", height: "5%", top: "43%", left: "47%" },
        { id: 69, questionId: 69, width: "10%", height: "6%", top: "44%", left: "40%" },
        { id: 70, questionId: 70, width: "5%", height: "6%", top: "30%", left: "36%" },
        { id: 71, questionId: 71, width: "7%", height: "5%", top: "38%", left: "37%" },
        { id: 72, questionId: 72, width: "10%", height: "5%", top: "21%", left: "38%" },
        { id: 73, questionId: 73, width: "27%", height: "5%", top: "26%", left: "15%" },
        { id: 74, questionId: 74, width: "5%", height: "5%", top: "22%", left: "26%" },
        { id: 75, questionId: 75, width: "6%", height: "5%", top: "32%", left: "52%" },
        { id: 76, questionId: 76, width: "6%", height: "5%", top: "27%", left: "48%" },
        { id: 77, questionId: 77, width: "13%", height: "6%", top: "51%", left: "36%" },
        { id: 78, questionId: 78, width: "8%", height: "5%", top: "30%", left: "66%" },
        { id: 79, questionId: 79, width: "5%", height: "5%", top: "59%", left: "40%" },
        { id: 80, questionId: 80, width: "5%", height: "5%", top: "28%", left: "35%" },
        { id: 81, questionId: 81, width: "5%", height: "5%", top: "36%", left: "47%" },
        { id: 82, questionId: 82, width: "11%", height: "5%", top: "51%", left: "65%" },
        { id: 83, questionId: 83, width: "6%", height: "5%", top: "39%", left: "50%" },
        { id: 84, questionId: 84, width: "5%", height: "4%", top: "41%", left: "39%" },
        { id: 85, questionId: 85, width: "24%", height: "5%", top: "24%", left: "30%" },
        { id: 86, questionId: 86, width: "15%", height: "5%", top: "10%", left: "59%" },
        { id: 87, questionId: 87, width: "7%", height: "5%", top: "22%", left: "79%" },
        { id: 88, questionId: 88, width: "6%", height: "5%", top: "67%", left: "24%" },
        { id: 89, questionId: 89, width: "5%", height: "5%", top: "6%", left: "37%" },
        { id: 90, questionId: 90, width: "5%", height: "5%", top: "29%", left: "33%" },
        { id: 91, questionId: 91, width: "6%", height: "5%", top: "43%", left: "24%" },
        { id: 92, questionId: 92, width: "22%", height: "5%", top: "15%", left: "43%" },
        { id: 93, questionId: 93, width: "23%", height: "5%", top: "38%", left: "35%" },
        { id: 94, questionId: 94, width: "6%", height: "5%", top: "27%", left: "40%" },
        { id: 95, questionId: 95, width: "14%", height: "5%", top: "29%", left: "28%" },
        { id: 96, questionId: 96, width: "15%", height: "5%", top: "22%", left: "55%" },
        { id: 97, questionId: 97, width: "6%", height: "5%", top: "31%", left: "40%" },
        { id: 98, questionId: 98, width: "15%", height: "5%", top: "61%", left: "54%" },
        { id: 99, questionId: 99, width: "6%", height: "6%", top: "33%", left: "59%" },
        { id: 100, questionId: 100, width: "5%", height: "5%", top: "31%", left: "47%" },
    ];

    // Data for filling blank questions
    var fillingBlanks = [
        { id: 1, questionId: 1001, answerIndex: 1, list: ["mark >= 49", "mark <= 49", "mark >= 50"], ans: "mark >= 50" },
        { id: 2, questionId: 1001, answerIndex: 2, list: ["pass", "fail", "A&B are true"], ans: "pass" },
        { id: 3, questionId: 1001, answerIndex: 3, list: ["pass", "fail", "A&B are true"], ans: "fail" },
        { id: 4, questionId: 1002, answerIndex: 1, list: ["number/2 != 0", "number/2 == 0", "number/3 == 0"], ans: "number/2 == 0" },
        { id: 5, questionId: 1002, answerIndex: 2, list: ["Odd", "Even", "A&B are true"], ans: "Even" },
        { id: 6, questionId: 1002, answerIndex: 3, list: ["Odd", "Even", "A&B are true"], ans: "Odd" },
        { id: 7, questionId: 1003, answerIndex: 1, list: ["void", "class", "static"], ans: "class" },
        { id: 8, questionId: 1003, answerIndex: 2, list: ["void", "class", "abstract"], ans: "void" },
        { id: 9, questionId: 1003, answerIndex: 3, list: ["writeln", "println", "write"], ans: "println" },
        { id: 10, questionId: 1004, answerIndex: 1, list: ["i = 4", "i = 5", "i = j"], ans: "i = 5" },
        { id: 11, questionId: 1004, answerIndex: 2, list: ["j = 4", "j = 0", "j = i"], ans: "j = i" },
        { id: 12, questionId: 1004, answerIndex: 3, list: ["\"*\"", "\"**\"", "\"***\""], ans: "\"*\"" },
        { id: 13, questionId: 1005, answerIndex: 1, list: ["!", "null", "A&B are false"], ans: "!" },
        { id: 14, questionId: 1005, answerIndex: 2, list: ["||", "@@", "<="], ans: "||" },
        { id: 15, questionId: 1005, answerIndex: 3, list: ["true", "false", "vacation"], ans: "false" },
        { id: 16, questionId: 1006, answerIndex: 1, list: ["||", "&&", "<="], ans: "&&" },
        { id: 17, questionId: 1006, answerIndex: 2, list: ["||", "<=", "&&"], ans: "&&" },
        { id: 18, questionId: 1006, answerIndex: 3, list: ["true", "false", "bSmile"], ans: "false" },
        { id: 19, questionId: 1007, answerIndex: 1, list: ["*", "+", "-"], ans: "+" },
        { id: 20, questionId: 1007, answerIndex: 2, list: [">", "<=", "=="], ans: "==" },
        { id: 21, questionId: 1007, answerIndex: 3, list: ["+", "-", "*"], ans: "*" },
        { id: 22, questionId: 1008, answerIndex: 1, list: [">=", "==", "<="], ans: "<=" },
        { id: 23, questionId: 1008, answerIndex: 2, list: ["21 + n", "21 - n", "21 * n"], ans: "21 - n" },
        { id: 24, questionId: 1008, answerIndex: 3, list: ["+", "-", "*"], ans: "*" },
        { id: 25, questionId: 1009, answerIndex: 1, list: ["||", "==", "&&"], ans: "&&" },
        { id: 26, questionId: 1009, answerIndex: 2, list: ["<", ">", "="], ans: "<" },
        { id: 27, questionId: 1009, answerIndex: 3, list: ["<", ">", "="], ans: ">" },
        { id: 28, questionId: 1010, answerIndex: 1, list: ["&&", "||", "=="], ans: "||" },
        { id: 29, questionId: 1010, answerIndex: 2, list: ["&&", "||", "=="], ans: "||" },
        { id: 30, questionId: 1010, answerIndex: 3, list: ["&&", "||", "=="], ans: "&&" },
        { id: 31, questionId: 1011, answerIndex: 1, list: ["class", "void", "synchronized"], ans: "synchronized" },
        { id: 32, questionId: 1011, answerIndex: 2, list: ["start()", "stop()", "run()"], ans: "start()" },
        { id: 33, questionId: 1011, answerIndex: 3, list: ["start()", "stop()", "run()"], ans: "start()" },
        { id: 34, questionId: 1012, answerIndex: 1, list: ["void", "class", "synchronized"], ans: "synchronized" },
        { id: 35, questionId: 1012, answerIndex: 2, list: ["inherits", "extends", "protected"], ans: "extends" },
        { id: 36, questionId: 1012, answerIndex: 3, list: ["void", "null", "0"], ans: "null" },
        { id: 37, questionId: 1013, answerIndex: 1, list: ["1", "2", "3"], ans: "1" },
        { id: 38, questionId: 1013, answerIndex: 2, list: ["<", ">", "="], ans: "<" },
        { id: 39, questionId: 1013, answerIndex: 3, list: ["long", "width", "length"], ans: "length" },
        { id: 40, questionId: 1014, answerIndex: 1, list: ["1", "2", "3"], ans: "1" },
        { id: 41, questionId: 1014, answerIndex: 2, list: ["1", "2", "3"], ans: "2" },
        { id: 42, questionId: 1014, answerIndex: 3, list: ["(i)", "{i}", "[i]"], ans: "(i)" },
        { id: 43, questionId: 1015, answerIndex: 1, list: ["1", "2", "3"], ans: "3" },
        { id: 44, questionId: 1015, answerIndex: 2, list: ["1", "2", "3"], ans: "2" },
        { id: 45, questionId: 1015, answerIndex: 3, list: ["1", "2", "3"], ans: "1" },
        { id: 46, questionId: 1016, answerIndex: 1, list: ["string", "static", "new"], ans: "new" },
        { id: 47, questionId: 1016, answerIndex: 2, list: ["string", "static", "new"], ans: "new" },
        { id: 48, questionId: 1016, answerIndex: 3, list: ["s1==s2", "s1.equals(s2)", "s1!=s2"], ans: "s1.equals(s2)" },
        { id: 49, questionId: 1017, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 50, questionId: 1017, answerIndex: 2, list: ["!=", "==", "<="], ans: "==" },
        { id: 51, questionId: 1017, answerIndex: 3, list: ["!=", "==", "<="], ans: "==" },
        { id: 52, questionId: 1018, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 53, questionId: 1018, answerIndex: 2, list: [">=", "<=", "=="], ans: "<=" },
        { id: 54, questionId: 1018, answerIndex: 3, list: [">=", "<=", "=="], ans: "==" },
        { id: 55, questionId: 1019, answerIndex: 1, list: ["<=", ">=", "=="], ans: "==" },
        { id: 56, questionId: 1019, answerIndex: 2, list: ["n + 1", "n - 1", "n * 1"], ans: "n - 1" },
        { id: 57, questionId: 1019, answerIndex: 3, list: ["n", "true", "result"], ans: "result" },
        { id: 58, questionId: 1020, answerIndex: 1, list: ["class", "void", "extends"], ans: "class" },
        { id: 59, questionId: 1020, answerIndex: 2, list: ["class", "void", "extends"], ans: "extends" },
        { id: 60, questionId: 1020, answerIndex: 3, list: ["class", "void", "extends"], ans: "void" },
        { id: 61, questionId: 1021, answerIndex: 1, list: ["demo", "d", "add"], ans: "d" },
        { id: 62, questionId: 1021, answerIndex: 2, list: ["a", "b", "x"], ans: "x" },
        { id: 63, questionId: 1021, answerIndex: 3, list: ["a", "b", "y"], ans: "y" },
        { id: 64, questionId: 1022, answerIndex: 1, list: ["extends", "void", "class"], ans: "class" },
        { id: 65, questionId: 1022, answerIndex: 2, list: ["protected", "static", "null"], ans: "static" },
        { id: 66, questionId: 1022, answerIndex: 3, list: ["writeln", "println", "write"], ans: "println" },
        { id: 67, questionId: 1023, answerIndex: 1, list: ["static", "void", "class"], ans: "class" },
        { id: 68, questionId: 1023, answerIndex: 2, list: ["static", "void", "class"], ans: "static" },
        { id: 69, questionId: 1023, answerIndex: 3, list: ["static", "void", "class"], ans: "static" },
        { id: 70, questionId: 1024, answerIndex: 1, list: ["<", ">", "="], ans: "<" },
        { id: 71, questionId: 1024, answerIndex: 2, list: ["<=", ">=", "=="], ans: "<=" },
        { id: 72, questionId: 1024, answerIndex: 3, list: ["+=", "-=", "*="], ans: "*=" },
        { id: 73, questionId: 1025, answerIndex: 1, list: ["+", "-", "="], ans: "+" },
        { id: 74, questionId: 1025, answerIndex: 2, list: ["+", "-", "="], ans: "=" },
        { id: 75, questionId: 1025, answerIndex: 3, list: ["+", "-", "="], ans: "=" },
        { id: 76, questionId: 1026, answerIndex: 1, list: ["[i]", "width", "length"], ans: "length" },
        { id: 77, questionId: 1026, answerIndex: 2, list: ["[i]", "width", "length"], ans: "length" },
        { id: 78, questionId: 1026, answerIndex: 3, list: ["[i]", "width", "length"], ans: "[i]" },
        { id: 79, questionId: 1027, answerIndex: 1, list: ["x1,y1", "x2,y2", "x2,y1"], ans: "x2,y2" },
        { id: 80, questionId: 1027, answerIndex: 2, list: ["draw", "drawableRect", "drawRect"], ans: "drawRect" },
        { id: 81, questionId: 1027, answerIndex: 3, list: ["y1 + y2", "y2 - y1", "y1 - y2"], ans: "y2 - y1" },
        { id: 82, questionId: 1028, answerIndex: 1, list: ["&&", "==", "%"], ans: "%" },
        { id: 83, questionId: 1028, answerIndex: 2, list: ["&&", "==", "%"], ans: "%" },
        { id: 84, questionId: 1028, answerIndex: 3, list: ["&&", "==", "%"], ans: "%" },
        { id: 85, questionId: 1029, answerIndex: 1, list: ["==", "%", "/"], ans: "==" },
        { id: 86, questionId: 1029, answerIndex: 2, list: ["==", "%", "/"], ans: "/" },
        { id: 87, questionId: 1029, answerIndex: 3, list: ["==", "%", "/"], ans: "%" },
        { id: 88, questionId: 1030, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 89, questionId: 1030, answerIndex: 2, list: ["<", ">", "="], ans: "<" },
        { id: 90, questionId: 1030, answerIndex: 3, list: ["a", "i", "0"], ans: "i" },
        { id: 91, questionId: 1031, answerIndex: 1, list: ["0", "1", "2"], ans: "0" },
        { id: 92, questionId: 1031, answerIndex: 2, list: ["<", ">", "="], ans: "<" },
        { id: 93, questionId: 1031, answerIndex: 3, list: ["+", "-", "*"], ans: "*" },
        { id: 94, questionId: 1032, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 95, questionId: 1032, answerIndex: 2, list: ["int", "new", "public"], ans: "new" },
        { id: 96, questionId: 1032, answerIndex: 3, list: ["a", "b", "p"], ans: "p" },
        { id: 97, questionId: 1033, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 98, questionId: 1033, answerIndex: 2, list: ["4", "5", "6"], ans: "5" },
        { id: 99, questionId: 1033, answerIndex: 3, list: ["int", "count - 1", "count"], ans: "count" },
        { id: 100, questionId: 1034, answerIndex: 1, list: ["date", "int", "double"], ans: "int" },
        { id: 101, questionId: 1034, answerIndex: 2, list: ["gets", "implements", "throws"], ans: "throws" },
        { id: 102, questionId: 1034, answerIndex: 3, list: ["Thread", "waitFor", "Exception"], ans: "Thread" },
        { id: 103, questionId: 1035, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 104, questionId: 1035, answerIndex: 2, list: ["int", "Threading", "new"], ans: "new" },
        { id: 105, questionId: 1035, answerIndex: 3, list: ["Thread", "run", "LIMIT"], ans: "Thread" },
        { id: 106, questionId: 1036, answerIndex: 1, list: ["true", "false", "null"], ans: "false" },
        { id: 107, questionId: 1036, answerIndex: 2, list: ["true", "false", "null"], ans: "false" },
        { id: 108, questionId: 1036, answerIndex: 3, list: ["true", "false", "null"], ans: "true" },
        { id: 109, questionId: 1037, answerIndex: 1, list: ["long", "length", "row"], ans: "length" },
        { id: 110, questionId: 1037, answerIndex: 2, list: ["4", "5", "6"], ans: "5" },
        { id: 111, questionId: 1037, answerIndex: 3, list: ["i", "myArray[5]", "myArray[i]"], ans: "myArray[i]" },
        { id: 112, questionId: 1038, answerIndex: 1, list: ["ne", "ie", "ioe"], ans: "ne" },
        { id: 113, questionId: 1038, answerIndex: 2, list: ["ne", "ie", "ioe"], ans: "ioe" },
        { id: 114, questionId: 1038, answerIndex: 3, list: ["Math", "Mathematics", "Random"], ans: "Math" },
        { id: 115, questionId: 1039, answerIndex: 1, list: ["static", "void", "class"], ans: "class" },
        { id: 116, questionId: 1039, answerIndex: 2, list: ["static", "void", "class"], ans: "static" },
        { id: 117, questionId: 1039, answerIndex: 3, list: ["writeln", "println", "write"], ans: "println" },
        { id: 118, questionId: 1040, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 119, questionId: 1040, answerIndex: 2, list: ["99", "100", "101"], ans: "101" },
        { id: 120, questionId: 1040, answerIndex: 3, list: ["<=", ">=", "=="], ans: "<=" },
        { id: 121, questionId: 1041, answerIndex: 1, list: ["static", "void", "class"], ans: "class" },
        { id: 122, questionId: 1041, answerIndex: 2, list: ["15", "17", "19"], ans: "17" },
        { id: 123, questionId: 1041, answerIndex: 3, list: ["writeln", "println", "write"], ans: "println" },
        { id: 124, questionId: 1042, answerIndex: 1, list: ["private", "void", "new"], ans: "new" },
        { id: 125, questionId: 1042, answerIndex: 2, list: ["nextLine()", "next()", "nextRow()"], ans: "nextLine()" },
        { id: 126, questionId: 1042, answerIndex: 3, list: ["writeln", "println", "write"], ans: "println" },
        { id: 127, questionId: 1043, answerIndex: 1, list: ["i", "width", "length"], ans: "length" },
        { id: 128, questionId: 1043, answerIndex: 2, list: ["0", "1", "2"], ans: "0" },
        { id: 129, questionId: 1043, answerIndex: 3, list: ["i", "width", "length"], ans: "length" },
        { id: 130, questionId: 1044, answerIndex: 1, list: ["i", "width", "length"], ans: "length" },
        { id: 131, questionId: 1044, answerIndex: 2, list: ["row", "col", "length"], ans: "row" },
        { id: 132, questionId: 1044, answerIndex: 3, list: ["ROWS", "COLUMNS", "LENGTH"], ans: "COLUMNS" },
        { id: 133, questionId: 1045, answerIndex: 1, list: ["i + 1", "i - 1", "i * 1"], ans: "i - 1" },
        { id: 134, questionId: 1045, answerIndex: 2, list: ["||", "&&", "=="], ans: "&&" },
        { id: 135, questionId: 1045, answerIndex: 3, list: [">", "<", "="], ans: ">" },
        { id: 136, questionId: 1046, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 137, questionId: 1046, answerIndex: 2, list: ["[i]", "width", "length"], ans: "length" },
        { id: 138, questionId: 1046, answerIndex: 3, list: ["a", "i", "list"], ans: "i" },
        { id: 139, questionId: 1047, answerIndex: 1, list: ["||", "&&", "=="], ans: "&&" },
        { id: 140, questionId: 1047, answerIndex: 2, list: ["char", "charAt", "charIn"], ans: "charAt" },
        { id: 141, questionId: 1047, answerIndex: 3, list: ["0", "1", "2"], ans: "0" },
        { id: 142, questionId: 1048, answerIndex: 1, list: ["sqrt", "srt", "abs"], ans: "abs" },
        { id: 143, questionId: 1048, answerIndex: 2, list: ["0", "1", "2"], ans: "2" },
        { id: 144, questionId: 1048, answerIndex: 3, list: ["0", "1", "2"], ans: "0" },
        { id: 145, questionId: 1049, answerIndex: 1, list: ["<", ">", "="], ans: "<" },
        { id: 146, questionId: 1049, answerIndex: 2, list: ["i", "list", "indexOfMin"], ans: "i" },
        { id: 147, questionId: 1049, answerIndex: 3, list: ["i", "list", "indexOfMin"], ans: "indexOfMin" },
        { id: 148, questionId: 1050, answerIndex: 1, list: ["list", "i", "newSize"], ans: "newSize" },
        { id: 149, questionId: 1050, answerIndex: 2, list: ["max", "min", "equals"], ans: "min" },
        { id: 150, questionId: 1050, answerIndex: 3, list: ["list", "i", "newSize"], ans: "i" },
        { id: 151, questionId: 1051, answerIndex: 1, list: ["Print", "Println", "PrintStream"], ans: "PrintStream" },
        { id: 152, questionId: 1051, answerIndex: 2, list: ["Ran", "Rand", "Random"], ans: "Random" },
        { id: 153, questionId: 1051, answerIndex: 3, list: ["next", "nextInt", "nextDouble"], ans: "nextInt" },
        { id: 154, questionId: 1052, answerIndex: 1, list: ["==", "!=", "&&"], ans: "!=" },
        { id: 155, questionId: 1052, answerIndex: 2, list: ["i", "null", "list"], ans: "list" },
        { id: 156, questionId: 1052, answerIndex: 3, list: ["x", "null", "total"], ans: "total" },
        { id: 157, questionId: 1053, answerIndex: 1, list: ["i", "iSize", "iSize - 1"], ans: "iSize - 1" },
        { id: 158, questionId: 1053, answerIndex: 2, list: ["i", "iSize", "iSize - 1"], ans: "i" },
        { id: 159, questionId: 1053, answerIndex: 3, list: ["i", "iSize", "iSize - 1"], ans: "iSize - 1" },
        { id: 160, questionId: 1054, answerIndex: 1, list: ["<=", "==", ">="], ans: "<=" },
        { id: 161, questionId: 1054, answerIndex: 2, list: ["i", "iSize", "i - 1"], ans: "i" },
        { id: 162, questionId: 1054, answerIndex: 3, list: ["i", "iSize", "i - 1"], ans: "i - 1" },
        { id: 163, questionId: 1055, answerIndex: 1, list: ["i - 1", "i", "i + 1"], ans: "i" },
        { id: 164, questionId: 1055, answerIndex: 2, list: ["i - 1", "i", "i + 1"], ans: "i + 1" },
        { id: 165, questionId: 1055, answerIndex: 3, list: ["iSize = 0", "iSize++", "iSize--"], ans: "iSize--" },
        { id: 166, questionId: 1056, answerIndex: 1, list: ["i", "initialCap", "int initialCap"], ans: "initialCap" },
        { id: 167, questionId: 1056, answerIndex: 2, list: ["&&", "||", "=="], ans: "&&" },
        { id: 168, questionId: 1056, answerIndex: 3, list: ["value--", "pos++", "pos--"], ans: "pos++" },
        { id: 169, questionId: 1057, answerIndex: 1, list: ["pos", "i - 1", "i"], ans: "i" },
        { id: 170, questionId: 1057, answerIndex: 2, list: ["pos", "i - 1", "i"], ans: "i - 1" },
        { id: 171, questionId: 1057, answerIndex: 3, list: ["pos", "i - 1", "i"], ans: "pos" },
        { id: 172, questionId: 1058, answerIndex: 1, list: ["stopTime + startTime", "stopTime - startTime", "stopTime * startTime"], ans: "stopTime - startTime" },
        { id: 173, questionId: 1058, answerIndex: 2, list: ["time()", "stop()", "start()"], ans: "time()" },
        { id: 174, questionId: 1058, answerIndex: 3, list: ["stopTime + startTime", "stopTime - startTime", "stopTime * startTime"], ans: "stopTime - startTime" },
        { id: 175, questionId: 1059, answerIndex: 1, list: ["==", "!=", "<="], ans: "!=" },
        { id: 176, questionId: 1059, answerIndex: 2, list: ["i + 1", "i++", "i--"], ans: "i++" },
        { id: 177, questionId: 1059, answerIndex: 3, list: ["i", "data", "good"], ans: "good" },
        { id: 178, questionId: 1060, answerIndex: 1, list: ["col", "row", "square"], ans: "row" },
        { id: 179, questionId: 1060, answerIndex: 2, list: ["row", "numRows", "null"], ans: "numRows" },
        { id: 180, questionId: 1060, answerIndex: 3, list: ["row", "square", "numRows"], ans: "square" },
        { id: 181, questionId: 1061, answerIndex: 1, list: ["||", "&&", "=="], ans: "&&" },
        { id: 182, questionId: 1061, answerIndex: 2, list: ["||", "&&", "=="], ans: "&&" },
        { id: 183, questionId: 1061, answerIndex: 3, list: ["col", "row", "0"], ans: "row" },
        { id: 184, questionId: 1062, answerIndex: 1, list: ["list", "found", "index"], ans: "index" },
        { id: 185, questionId: 1062, answerIndex: 2, list: ["==", ">=", "<="], ans: "==" },
        { id: 186, questionId: 1062, answerIndex: 3, list: ["list", "found", "index"], ans: "found" },
        { id: 187, questionId: 1063, answerIndex: 1, list: ["sc", "f", "0"], ans: "f" },
        { id: 188, questionId: 1063, answerIndex: 2, list: ["next()", "nextword()", "hasNext()"], ans: "next()" },
        { id: 189, questionId: 1063, answerIndex: 3, list: ["sc", "f", "word"], ans: "word" },
        { id: 190, questionId: 1064, answerIndex: 1, list: ["JFile", "Chooser", "JFileChooser"], ans: "JFileChooser" },
        { id: 191, questionId: 1064, answerIndex: 2, list: ["showDialog", "OpenDialog", "showOpenDialog"], ans: "showOpenDialog" },
        { id: 192, questionId: 1064, answerIndex: 3, list: ["SelectedFile", "getSelectedFile", "getFile"], ans: "getSelectedFile" },
        { id: 193, questionId: 1065, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 194, questionId: 1065, answerIndex: 2, list: ["writeln", "println", "write"], ans: "println" },
        { id: 195, questionId: 1065, answerIndex: 3, list: ["writeln", "println", "write"], ans: "println" },
        { id: 196, questionId: 1066, answerIndex: 1, list: ["4", "100", "400"], ans: "4" },
        { id: 197, questionId: 1066, answerIndex: 2, list: ["4", "100", "400"], ans: "100" },
        { id: 198, questionId: 1066, answerIndex: 3, list: ["4", "100", "400"], ans: "400" },
        { id: 199, questionId: 1067, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 200, questionId: 1067, answerIndex: 2, list: ["3", "4", "5"], ans: "4" },
        { id: 201, questionId: 1067, answerIndex: 3, list: ["1", "Hello", "i"], ans: "i" },
        { id: 202, questionId: 1068, answerIndex: 1, list: ["2", "6", "12"], ans: "6" },
        { id: 203, questionId: 1068, answerIndex: 2, list: ["a + b", "a - b", " a * b"], ans: "a + b" },
        { id: 204, questionId: 1068, answerIndex: 3, list: ["a", "b", "sum"], ans: "sum" },
        { id: 205, questionId: 1069, answerIndex: 1, list: ["next()", "nextInt()", "nextDouble()"], ans: "nextInt()" },
        { id: 206, questionId: 1069, answerIndex: 2, list: ["<", ">", "="], ans: ">" },
        { id: 207, questionId: 1069, answerIndex: 3, list: ["/", "%", "*"], ans: "%" },
        { id: 208, questionId: 1070, answerIndex: 1, list: ["next()", "nextInt()", "nextDouble()"], ans: "nextInt()" },
        { id: 209, questionId: 1070, answerIndex: 2, list: ["i", "powerOfTwo", "N"], ans: "powerOfTwo" },
        { id: 210, questionId: 1070, answerIndex: 3, list: ["i", "powerOfTwo", "N"], ans: "i" },
        { id: 211, questionId: 1071, answerIndex: 1, list: ["next()", "nextInt()", "nextDouble()"], ans: "nextDouble()" },
        { id: 212, questionId: 1071, answerIndex: 2, list: ["1e-15", "1e-16", "1e-17"], ans: "1e-15" },
        { id: 213, questionId: 1071, answerIndex: 3, list: ["c", "t", "epsilon"], ans: "t" },
        { id: 214, questionId: 1072, answerIndex: 1, list: ["protected", "void", "new"], ans: "new" },
        { id: 215, questionId: 1072, answerIndex: 2, list: ["max", "min", "abs"], ans: "min" },
        { id: 216, questionId: 1072, answerIndex: 3, list: ["max", "min", "abs"], ans: "max" },
        { id: 217, questionId: 1073, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 218, questionId: 1073, answerIndex: 2, list: ["<=", ">=", "="], ans: "<=" },
        { id: 219, questionId: 1073, answerIndex: 3, list: ["1", "4", "10"], ans: "4" },
        { id: 220, questionId: 1074, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 221, questionId: 1074, answerIndex: 2, list: ["protected", "void", "new"], ans: "new" },
        { id: 222, questionId: 1074, answerIndex: 3, list: ["next()", "nextInt()", "nextDouble()"], ans: "nextInt()" },
        { id: 223, questionId: 1075, answerIndex: 1, list: ["int", "int[]", "double[]"], ans: "int[]" },
        { id: 224, questionId: 1075, answerIndex: 2, list: ["protected", "void", "new"], ans: "new" },
        { id: 225, questionId: 1075, answerIndex: 3, list: ["row", "width", "length"], ans: "length" },
        { id: 226, questionId: 1076, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 227, questionId: 1076, answerIndex: 2, list: ["prev + current", "prev + prevprev", "current + prevprev"], ans: "prev + prevprev" },
        { id: 228, questionId: 1076, answerIndex: 3, list: ["current = prev", "prevprev = prev", "prevprev = current"], ans: "prevprev = prev" },
        { id: 229, questionId: 1077, answerIndex: 1, list: ["1", "2", "3"], ans: "2" },
        { id: 230, questionId: 1077, answerIndex: 2, list: ["1024", "2048", "4096"], ans: "2048" },
        { id: 231, questionId: 1077, answerIndex: 3, list: ["abs", "sum", "log"], ans: "log" },
        { id: 232, questionId: 1078, answerIndex: 1, list: ["next()", "nextInt()", "nextDouble()"], ans: "nextInt()" },
        { id: 233, questionId: 1078, answerIndex: 2, list: ["==", "!=", "<="], ans: "!=" },
        { id: 234, questionId: 1078, answerIndex: 3, list: ["10 * N", "10 + N", "10 * M"], ans: "10 * M" },
        { id: 235, questionId: 1079, answerIndex: 1, list: ["next()", "nextInt()", "nextDouble()"], ans: "nextInt()" },
        { id: 236, questionId: 1079, answerIndex: 2, list: ["==", "!=", "<="], ans: "!=" },
        { id: 237, questionId: 1079, answerIndex: 3, list: ["s + N", "N - digit", "s + digit"], ans: "s + digit" },
        { id: 238, questionId: 1080, answerIndex: 1, list: ["static", "void", "class"], ans: "static" },
        { id: 239, questionId: 1080, answerIndex: 2, list: ["1", "10", "100"], ans: "10" },
        { id: 240, questionId: 1080, answerIndex: 3, list: ["+", "*", "/"], ans: "*" }
    ];

    var mistakeTypes = [
        { id: 1, content: 'Null pointer' },
        { id: 2, content: 'Capitalization error' },
        { id: 3, content: 'Concurrent access to share variables' },
        { id: 4, content: 'Zero indexed' },
        { id: 5, content: 'Blank exception handler' },
        { id: 6, content: 'Confusion of passing value and reference' },
        { id: 7, content: 'Wrong at comparing two objects' },
        { id: 8, content: 'Wrong comparison assignment' },
        { id: 9, content: 'Mistyping overriding method mame' },
        { id: 10, content: 'Accessing non-static variable' }
    ];

    // Data for multiple choices questions
    var singleChoice = [
        { id: 1, questionId: 2001, mistakeId: 1 },
        { id: 2, questionId: 2002, mistakeId: 1 },
        { id: 3, questionId: 2003, mistakeId: 1 },
        { id: 4, questionId: 2004, mistakeId: 10 },
        { id: 5, questionId: 2005, mistakeId: 10 },
        { id: 6, questionId: 2006, mistakeId: 10 },
        { id: 7, questionId: 2007, mistakeId: 2 },
        { id: 8, questionId: 2008, mistakeId: 2 },
        { id: 9, questionId: 2009, mistakeId: 2 },
        { id: 10, questionId: 2010, mistakeId: 3 },
        { id: 11, questionId: 2011, mistakeId: 3 },
        { id: 12, questionId: 2012, mistakeId: 4 },
        { id: 13, questionId: 2013, mistakeId: 4 },
        { id: 14, questionId: 2014, mistakeId: 4 },
        { id: 15, questionId: 2015, mistakeId: 4 },
        { id: 16, questionId: 2016, mistakeId: 5 },
        { id: 17, questionId: 2017, mistakeId: 5 },
        { id: 18, questionId: 2018, mistakeId: 5 },
        { id: 19, questionId: 2019, mistakeId: 5 },
        { id: 20, questionId: 2020, mistakeId: 6 },
        { id: 21, questionId: 2021, mistakeId: 6 },
        { id: 22, questionId: 2022, mistakeId: 6 },
        { id: 23, questionId: 2023, mistakeId: 7 },
        { id: 24, questionId: 2024, mistakeId: 7 },
        { id: 25, questionId: 2025, mistakeId: 7 },
        { id: 26, questionId: 2026, mistakeId: 7 },
        { id: 27, questionId: 2027, mistakeId: 8 },
        { id: 28, questionId: 2028, mistakeId: 8 },
        { id: 29, questionId: 2029, mistakeId: 8 },
        { id: 30, questionId: 2030, mistakeId: 8 },
        { id: 31, questionId: 2031, mistakeId: 9 },
        { id: 32, questionId: 2032, mistakeId: 4 },
        { id: 33, questionId: 2033, mistakeId: 3 },
        { id: 34, questionId: 2034, mistakeId: 1 },
        { id: 35, questionId: 2035, mistakeId: 1 },
        { id: 36, questionId: 2036, mistakeId: 1 },
        { id: 37, questionId: 2037, mistakeId: 5 },
        { id: 38, questionId: 2038, mistakeId: 10 },
        { id: 39, questionId: 2039, mistakeId: 10 },
        { id: 40, questionId: 2040, mistakeId: 10 },
        { id: 41, questionId: 2041, mistakeId: 2 },
        { id: 42, questionId: 2042, mistakeId: 2 },
        { id: 43, questionId: 2043, mistakeId: 2 },
        { id: 44, questionId: 2044, mistakeId: 3 },
        { id: 45, questionId: 2045, mistakeId: 3 },
        { id: 46, questionId: 2046, mistakeId: 4 },
        { id: 47, questionId: 2047, mistakeId: 4 },
        { id: 48, questionId: 2048, mistakeId: 4 },
        { id: 49, questionId: 2049, mistakeId: 9 },
        { id: 50, questionId: 2050, mistakeId: 4 }
    ];

    var keyWords = [
        { id: 1, name: "abstract", src: "images/Dictionary/KeyWord/001.png" },
        { id: 2, name: "assert", src: "images/Dictionary/KeyWord/002.png" },
        { id: 3, name: "boolean", src: "images/Dictionary/KeyWord/003.png" },
        { id: 4, name: "break", src: "images/Dictionary/KeyWord/004.png" },
        { id: 5, name: "byte", src: "images/Dictionary/KeyWord/005.png" },
        { id: 6, name: "case", src: "images/Dictionary/KeyWord/006.png" },
        { id: 7, name: "catch", src: "images/Dictionary/KeyWord/007.png" },
        { id: 8, name: "char", src: "images/Dictionary/KeyWord/008.png" },
        { id: 9, name: "class", src: "images/Dictionary/KeyWord/009.png" },
        { id: 10, name: "const", src: "images/Dictionary/KeyWord/010.png" },
        { id: 11, name: "continue", src: "images/Dictionary/KeyWord/011.png" },
        { id: 12, name: "default", src: "images/Dictionary/KeyWord/012.png" },
        { id: 13, name: "do", src: "images/Dictionary/KeyWord/013.png" },
        { id: 14, name: "double", src: "images/Dictionary/KeyWord/014.png" },
        { id: 15, name: "else", src: "images/Dictionary/KeyWord/015.png" },
        { id: 16, name: "enum", src: "images/Dictionary/KeyWord/016.png" },
        { id: 17, name: "extends", src: "images/Dictionary/KeyWord/017.png" },
        { id: 18, name: "final", src: "images/Dictionary/KeyWord/018.png" },
        { id: 19, name: "finally", src: "images/Dictionary/KeyWord/019.png" },
        { id: 20, name: "float", src: "images/Dictionary/KeyWord/020.png" },
        { id: 21, name: "for", src: "images/Dictionary/KeyWord/021.png" },
        { id: 22, name: "goto", src: "images/Dictionary/KeyWord/022.png" },
        { id: 23, name: "if", src: "images/Dictionary/KeyWord/023.png" },
        { id: 24, name: "implements", src: "images/Dictionary/KeyWord/024.png" },
        { id: 25, name: "import", src: "images/Dictionary/KeyWord/025.png" },
        { id: 26, name: "instanceof", src: "images/Dictionary/KeyWord/026.png" },
        { id: 27, name: "int", src: "images/Dictionary/KeyWord/027.png" },
        { id: 28, name: "interface", src: "images/Dictionary/KeyWord/028.png" },
        { id: 29, name: "long", src: "images/Dictionary/KeyWord/029.png" },
        { id: 30, name: "native", src: "images/Dictionary/KeyWord/030.png" },
        { id: 31, name: "new", src: "images/Dictionary/KeyWord/031.png" },
        { id: 32, name: "package", src: "images/Dictionary/KeyWord/032.png" },
        { id: 33, name: "private", src: "images/Dictionary/KeyWord/033.png" },
        { id: 34, name: "protected", src: "images/Dictionary/KeyWord/034.png" },
        { id: 35, name: "public", src: "images/Dictionary/KeyWord/035.png" },
        { id: 36, name: "return", src: "images/Dictionary/KeyWord/036.png" },
        { id: 37, name: "short", src: "images/Dictionary/KeyWord/037.png" },
        { id: 38, name: "static", src: "images/Dictionary/KeyWord/038.png" },
        { id: 39, name: "strictfp", src: "images/Dictionary/KeyWord/039.png" },
        { id: 40, name: "super", src: "images/Dictionary/KeyWord/040.png" },
        { id: 41, name: "switch", src: "images/Dictionary/KeyWord/041.png" },
        { id: 42, name: "synchronized", src: "images/Dictionary/KeyWord/042.png" },
        { id: 43, name: "this", src: "images/Dictionary/KeyWord/043.png" },
        { id: 44, name: "throw", src: "images/Dictionary/KeyWord/044.png" },
        { id: 45, name: "throws", src: "images/Dictionary/KeyWord/045.png" },
        { id: 46, name: "transient", src: "images/Dictionary/KeyWord/046.png" },
        { id: 47, name: "try", src: "images/Dictionary/KeyWord/047.png" },
        { id: 48, name: "void", src: "images/Dictionary/KeyWord/048.png" },
        { id: 49, name: "volatile", src: "images/Dictionary/KeyWord/049.png" },
        { id: 50, name: "while", src: "images/Dictionary/KeyWord/050.png" },
        { id: 51, name: "false", src: "images/Dictionary/KeyWord/051.png" },
        { id: 52, name: "null", src: "images/Dictionary/KeyWord/051.png" },
        { id: 53, name: "true", src: "images/Dictionary/KeyWord/053.png" }
    ];

    var bugsType = [
        { id: 1, name: "Null pointer", src: "images/Dictionary/BugType/001.png" },
        { id: 2, name: "Capitalization error", src: "images/Dictionary/BugType/002.png" },
	    { id: 3, name: "Concurrent access to share variables", src: "images/Dictionary/BugType/003.png" },
	    { id: 4, name: "Zero indexed", src: "images/Dictionary/BugType/004.png" },
	    { id: 5, name: "Blank exception handler", src: "images/Dictionary/BugType/005.png" },
	    { id: 6, name: "Confusion of passing value and reference", src: "images/Dictionary/BugType/006.png" },
	    { id: 7, name: "Wrong at comparing two objects", src: "images/Dictionary/BugType/007.png" },
	    { id: 8, name: "Wrong comparison assignment", src: "images/Dictionary/BugType/008.png" },
	    { id: 9, name: "Mistyping overriding method mame", src: "images/Dictionary/BugType/009.png" },
	    { id: 10, name: "Accessing non-static variable", src: "images/Dictionary/BugType/010.png" }
    ];

    function getQuestionID(id) {
        findBugs.bykey
    }

    MistakeChasingGameClient.LocalDB = {


        historyDb: new DevExpress.data.LocalStore({
            name: "historyData",
            key: 'id'
        }),


        findBugsDb: new DevExpress.data.ArrayStore({
            data: findBugs,
            key: 'id'
        }),
        fillingBlanksDb: new DevExpress.data.ArrayStore({
            data: fillingBlanks,
            key: 'id'
        }),
        singleChoiceDb: new DevExpress.data.ArrayStore({
            data: singleChoice,
            key: 'id'
        }),
        questionDb: new DevExpress.data.ArrayStore({
            data: questions,
            key: 'id'
        }),
        mistakeTypesDb: new DevExpress.data.ArrayStore({
            data: mistakeTypes,
            key: 'id'
        }),
        keyWordsdb: new DevExpress.data.DataSource({
            store: keyWords,
            sort: 'id'
        }),
        bugsTypedb: new DevExpress.data.DataSource({
            store: bugsType,
            sort: 'id'
        }),
        /////////////////////////////////////////get data
        insertHistory: function (opponentName, result, score) {
            var currentIndex;

            MistakeChasingGameClient.LocalDB.historyDb.createQuery()
                .max("index")
                .done(function (result) {
                    if (result == null) currentIndex = 0;
                    else currentIndex = result;
                });
            if (currentIndex > 9) {
                MistakeChasingGameClient.LocalDB.historyDb.remove(currentIndex % 10 + 1);
            }

            //alert("if");
            MistakeChasingGameClient.LocalDB.historyDb.insert({
                'index': currentIndex + 1,
                'id': currentIndex % 10 + 1,
                'oppName': opponentName,
                'result': result,
                'date': (new Date()).toString().split(' ').splice(1, 3).join(' ').toString(),
                'score': score
            });
        },

        getQuestion: function (questionId) {
            var question;
            MistakeChasingGameClient.LocalDB.questionDb.byKey(questionId).done(function (dataItem) {
                //alert(dataItem.id + " random Id getQuestion");
                question = dataItem;
                //randomQuestion = dataItem;
            });
            return question;
        },
        randomFindBugs: function () {
            //alert(localStorage.currentlevel);
            var filteredQuestion = MistakeChasingGameClient.LocalDB.questionDb.createQuery().filter([["dif", "=", Number(localStorage.currentlevel)],
                                        "and", ["type", "=", "findbugs"]]).sortBy("id").toArray();
            var question = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
            //alert(question);
            return question;
            //this.getFindBugsAns();
        },
        getFindBugsAns: function (questionId) {
            var ans = MistakeChasingGameClient.LocalDB.findBugsDb.createQuery().filter(["questionId", "=", questionId]).toArray()[0];
            return ans;
        },

        randomFillingBlanks: function () {
            var filteredQuestion = MistakeChasingGameClient.LocalDB.questionDb.createQuery().filter([["dif", "=", Number(localStorage.currentlevel)],
                                        "and", ["type", "=", "fillingBlanks"]]).sortBy("id").toArray();
            var question = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
            return question;
            //this.getFillingBlanksAns();
        },
        getFillingBlanksAns: function (questionId) {
            var ans = MistakeChasingGameClient.LocalDB.fillingBlanksDb.createQuery().filter(["questionId", "=", questionId]).sortBy("answerIndex").toArray();
            return ans;
        },

        randomSingleChoice: function () {
            var filteredQuestion = MistakeChasingGameClient.LocalDB.questionDb.createQuery().filter([["dif", "=", Number(localStorage.currentlevel)],
                                        "and", ["type", "=", "singleChoice"]]).sortBy("id").toArray();
            var question = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
            return question;
            //this.getSingleChoiceAns();
        },
        getSingleChoiceAns: function (questionId) {
            var answer = {
                listAns: "",
                ans: ""
            };
            //alert(randomQuestion.id + "random Id getSingleChoiceAns");
            var correctAns = MistakeChasingGameClient.LocalDB.singleChoiceDb.createQuery().filter(["questionId", "=", questionId]).select("mistakeId").toArray()[0].mistakeId;
            //alert(correctAns + "correctAns getSingleChoiceAns");
            var randomAns1, randomAns2;
            var isRepeat = true;
            while (isRepeat) {
                randomAns1 = Math.floor(Math.random() * 10) + 1;
                if (randomAns1 != correctAns) {
                    while (isRepeat) {
                        randomAns2 = Math.floor(Math.random() * 10) + 1;
                        if (randomAns2 != randomAns1 && randomAns2 != correctAns) {
                            isRepeat = false;
                            var listAns = MistakeChasingGameClient.LocalDB.mistakeTypesDb.createQuery().filter([["id", "=", randomAns1],
                                                        "or", ["id", "=", randomAns2], "or", ["id", "=", correctAns]]).sortBy("id").select("content").toArray();
                            //alert(listAns.length + "length list");
                            answer.listAns = [listAns[0].content, listAns[1].content, listAns[2].content];
                            answer.ans = MistakeChasingGameClient.LocalDB.mistakeTypesDb.createQuery().filter(["id", "=", correctAns]).select("content").toArray()[0].content;
                            return answer;
                        };
                    };
                };
            };
        }
    }
})();
//        /////////////////////////////////////////get data
//        this.getQuestion = function (questionId) {
//            MistakeChasingGameClient.db.questionDb.byKey(questionId).done(function (dataItem) {
//                randomQuestion = dataItem;
//                //alert(randomQuestion.id + " random Id getQuestion");
//            });
//        };
//        this.randomFindBugs = function () {
//            var filteredQuestion = MistakeChasingGameClient.db.questionDb.createQuery().filter([["dif", "=", Number(localStorage.currentlevel)],
//                                        "and", ["type", "=", "findbugs"]]).sortBy("id").toArray();
//            randomQuestion = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
//            this.getFindBugsAns();
//        };
//        this.getFindBugsAns = function () {
//            randomAns = MistakeChasingGameClient.db.findBugsDb.createQuery().filter(["questionId", "=", randomQuestion.id]).toArray()[0];
//        };

//        this.randomFillingBlanks = function () {
//            var filteredQuestion = MistakeChasingGameClient.db.questionDb.createQuery().filter([["dif", "=", Number(localStorage.currentlevel)],
//                                        "and", ["type", "=", "fillingBlanks"]]).sortBy("id").toArray();
//            randomQuestion = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
//            this.getFillingBlanksAns();
//        };
//        this.getFillingBlanksAns = function () {
//            randomAns = MistakeChasingGameClient.db.fillingBlanksDb.createQuery().filter(["questionId", "=", randomQuestion.id]).sortBy("answerIndex").toArray();
//        };

//        this.randomSingleChoice = function () {
//            var filteredQuestion = MistakeChasingGameClient.db.questionDb.createQuery().filter([["dif", "=", Number(localStorage.currentlevel)],
//                                        "and", ["type", "=", "singleChoice"]]).sortBy("id").toArray();
//            randomQuestion = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
//            this.getSingleChoiceAns();
//        };
//        this.getSingleChoiceAns = function () {
//            //alert(randomQuestion.id + "random Id getSingleChoiceAns");
//            var correctAns = MistakeChasingGameClient.db.singleChoiceDb.createQuery().filter(["questionId", "=", randomQuestion.id]).select("mistakeId").toArray()[0].mistakeId;
//            //alert(correctAns + "correctAns getSingleChoiceAns");
//            var randomAns1, randomAns2;
//            var isRepeat = true;
//            while (isRepeat) {
//                randomAns1 = Math.floor(Math.random() * 10) + 1;
//                if (randomAns1 != correctAns) {
//                    while (isRepeat) {
//                        randomAns2 = Math.floor(Math.random() * 10) + 1;
//                        if (randomAns2 != randomAns1 && randomAns2 != correctAns) {
//                            isRepeat = false;
//                            var listAns = MistakeChasingGameClient.db.mistakeTypesDb.createQuery().filter([["id", "=", randomAns1],
//                                                        "or", ["id", "=", randomAns2], "or", ["id", "=", correctAns]]).sortBy("id").select("content").toArray();
//                            //alert(listAns.length + "length list");
//                            randomAns.listAns = [listAns[0].content, listAns[1].content, listAns[2].content];
//                            randomAns.ans = MistakeChasingGameClient.db.mistakeTypesDb.createQuery().filter(["id", "=", correctAns]).select("content").toArray()[0].content;
//                        };
//                    };
//                };
//            };
//        };