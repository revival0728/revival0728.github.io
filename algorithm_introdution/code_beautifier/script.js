import { beautify, get_lan_data } from 'https://cdn.jsdelivr.net/gh/revival0728/code-beautifier/beautify.js'

setup();

var compile_status = true, text_change = false, last_sel_index = 0;

var input_code = "";

function setup() {
    update_sel();
    beautify(input_code, "be_code", get_lan_data()[0]);
    support_tab();
    sync_status();
    compile_status = true;
}

function update_sel() {
    var lan_data = get_lan_data();
    var opt = "";
    for(var i = 0; i < lan_data.length; ++i)
        opt += "<option>" + lan_data[i] + "</option>";
    document.getElementById("lan_sel").innerHTML = opt;
}

window.setInterval(() => {
    function change_color(c) {return `font-family: Consolas; color: ${c};`;}
    if(compile_status) return;
    compile_status = true;
    if(text_change || check_sel_change()) {
        input_code = document.getElementById("ipt").value;
        check_sel_change();
        beautify(process_code(input_code), "be_code", get_lan_data()[last_sel_index]);
    }
    document.getElementById("status").innerHTML = "Finished";
    document.getElementById("status").setAttribute("style", change_color("green"));
    text_change = false;
}, 10);

function check_sel_change() {
    var ret = last_sel_index != document.getElementById("lan_sel").selectedIndex;
    last_sel_index = document.getElementById("lan_sel").selectedIndex;
    return ret;
}

function replace(txt="", pat="", to="") {
    for(var i = 0; i < txt.length; ++i) {
        if(i+pat.length <= txt.length) {
            if(txt.substring(i, i+pat.length) == pat) {
                txt = txt.substring(0, i) + to + txt.substring(i+pat.length, txt.length);
                i += pat.length-1;
            }
        }
    }
    return txt;
}

function process_code(code) { // [", \, <, >]
    for(var i = 0; i < code.length; ++i) {
        if(code[i] == "<")
            code = replace(code, "<", "&lt");
        else if(code[i] == ">")
            code = replace(code, ">", "&gt");
    }
    return code;
}

function sync_status() {
    function change_color(c) {return `font-family: Consolas; color: ${c};`;}
    var myInput = document.getElementById("ipt");
    if(myInput.addEventListener ) {
        myInput.addEventListener('keydown', update_1, false);
    } else if(myInput.attachEvent ) {
        myInput.attachEvent('onkeydown', update_1);
    }
    var sel = document.getElementById("lan_sel");
    if(sel.addEventListener) {
        sel.addEventListener('click', update_2, false)
    } else if(sel.attachEvent) {
        sel.attachEvent('onclick', update_2);
    }
    function update() {
        document.getElementById("status").innerHTML = "Converting";
        document.getElementById("status").setAttribute("style", change_color("blue"));
        compile_status = false;
    }
    function update_1() {
        update();
        text_change = true;
    }
    function update_2() {
        update();
    }
}

function support_tab() {
    var myInput = document.getElementById("ipt");
    if(myInput.addEventListener ) {
        myInput.addEventListener('keydown', keyHandler, false);
    } else if(myInput.attachEvent ) {
        myInput.attachEvent('onkeydown', keyHandler); /* damn IE hack */
    }
    function keyHandler(e) {
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            this.value += "\t";
            if(e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }
    }
}