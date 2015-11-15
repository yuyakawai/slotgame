// slotgame.js
//
// 競技プログラミング
//
// * @category   game
// * @author     Yuya Kawai
// * @copyright  copyright © 2015 Yuya Kawai. All Rights Reserved.
// * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
// * @version    1.0
//

// IE10まではconstが非対応のためあえて使わない
//const var REEL_NUM = 3;
//const var IMAGE_NUM = 5;
var REEL_NUM = 3;
var IMAGE_NUM = 5;

var elements = [];
var board = [];
var count = [];

onload = function() {
    elements = [document.getElementById("slot_1"), document.getElementById("slot_2"),
                document.getElementById("slot_3"), document.getElementById("slot_4"),
                document.getElementById("slot_5")];

    InitGame();
    message.innerHTML="スタートを押してね";
    ShowSlot();
}

var InitGame = function() {
    for (var i = 0; i < REEL_NUM; i++) {
        board[i] = Math.floor(Math.random() * IMAGE_NUM);
    }
}

var StopSlot = function(stopLocation) {
    count[stopLocation] = 1;
}

var RotationSlot = function() {
    for (var i = 0; i < REEL_NUM; i++) {
        if (count[i] == 0) {
            board[i]++;
        }

        board[i] %= IMAGE_NUM;
    }
    if (count[0] == 1 && count[1] == 1 && count[2] == 1) {
        CheakSlot();
        return;
    }
    ShowSlot();
    setTimeout("RotationSlot()", 100);
} 

var StartSlot = function() {
    message.innerHTML = "ストップを押して止めてね";
    for (i = 0; i < REEL_NUM; i++) {
        count[i] = 0;
    }
    RotationSlot();
}

var ShowSlot = function() {
    var showslotElement = document.getElementById("showslot");
    while (showslotElement.firstChild) {
        showslotElement.removeChild(showslotElement.firstChild);
    }
    for (var i = 0; i < REEL_NUM; i++) {
            var c = elements[board[i]].cloneNode(true); // elementsの中にテンプレートのDOMが入っているのでそれをclone
            c.style.left = (i * 100) + "px";
            showslotElement.appendChild(c);
    }
}

var CheakSlot = function(){
    if ((board[0] == board[1]) && (board[1] == board[2])) {
        message.innerHTML = "当たりました。やったね！！";
        InitGame();
    } else {
        message.innerHTML = "残念はずれ";
    }
}


