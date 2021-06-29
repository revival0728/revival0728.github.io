var hls_data = [
    [["~", "//", "=", "?","\"", "'", "&gt", "&lt", "{", "}", "[", "]", "(", ")", "#", ",", "!", "-", "+", "*", "/", "&", "|", ":", "%", ";", "."], ["if", "cout", "include", "cin", "vector", "else", "for", "while", "namespace", "using", "int", "oduble", "float", "long", "template", "class", "void", "bool", "return", "define", "ifdef", "ifndef", "endif", "auto", "min", "struct", "friend", "operator", "const", "priority_queue", "greater", "continue", "break", "true", "false", "ios_base", "string", "new", "delete", "typename"]],
    [["#", "'", "+", "*", "-", "=", "/", ":", "[", "]", "(", ")", "//"], ["def", "return", "if", "else", "elif", "__name__", "print", "input", "map"]],
    [["//", "\"", "'", "+", "-", "*", "/", "=", "!", "%", "&gt", "&lt", "^", ":", ",", "&", "|", ".", ";", "(", ")", "[", "]", "{", "}"], ["var", "function", "while", "for", "if", "else", "console"]],
];

var lan_data = ["C++", "Python3", "JavaScript"]

var lan_syc = [["//", "\""], ["#", "'"], ["//", "\""]]

var last_sel_index = 0;

var compile_status = true, text_change = false;

var input_code = "";

function setup() {
    compile_status = true;
}

window.setInterval(() => {
    function change_color(c) {return `font-family: Consolas; color: ${c};`;}
    if(compile_status) return;
    compile_status = true;
    if(text_change || check_sel_change()) {
        beautify();
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

function print_html() {
    colors = [
        "style=\"border-style: solid;border-width: 1px;border-radius: 7px;background-color: black;font-family: Consolas;font-size: 85%;\"",
        "style=\"background-color: black;color: rgb(125, 129, 129);font-family: Consolas;padding-left: 7px;\"",
        "style=\"background-color: black;padding-left: 50px;overflow: auto;\"",
        "style=\"color: rgb(15, 180, 230);font-family: \Consolas\;font-size: 100%;\"",
        "style=\"color: khaki;font-weight: bold;font-family: Consolas;font-size: 100%;\"",
        "style=\"color: rgb(221, 74, 74);font-weight: bold;font-family: Consolas;font-size: 100%;\"",
        "style=\"color: rgb(186, 116, 252);font-weight: bold;font-family: Consolas;font-size: 100%;\"",
        "style=\"color: limegreen;font-family: Consolas;\"",
        "style=\"color: rosybrown;font-family: Consolas;font-size: 100%;\"",
    ];
    _class = [
        "code_box",
        "code",
        "code_line",
        "highlight_none",
        "highlight_word",
        "highlight_symbol",
        "highlight_number",
        "invisible",
        "highlight_str"
    ];
    function getw(s) {return `class="${s}"`}
    code = document.getElementById("be_code").innerHTML;
    for(var i = 0; i < colors.length; ++i)
        code = replace(code, getw(_class[i]), colors[i]);
    code = `<pre ${colors[0]}>${code}</pre>`
    document.getElementById("html_paste").value = code;
}

function beautify() {
    var index = document.getElementById("lan_sel").selectedIndex;
    input_code = process_code(document.getElementById("ipt").value);
    print_code(input_code, hls_data[index], lan_syc[index][0], lan_syc[index][1], "be_code");
    print_html();
}

function update_sel() {
    opt = "";
    for(var i = 0; i < lan_data.length; ++i)
        opt += "<option>" + lan_data[i] + "</option>";
    document.getElementById("lan_sel").innerHTML = opt;
}

function highlight_word(str) {
    return "<span class=\"highlight_word\">" + str + "</span>";
}

function highlight_symbol(str) {
    return "<span class=\"highlight_symbol\">" + str + "</span>";
}

function highlight_number(str) {
    return "<span class=\"highlight_number\">" + str + "</span>";
}

function invisible(str) {
    return "<span class=\"invisible\">" + str + "</span>";
}

function highlight_str(str) {
    return "<span class=\"highlight_str\">" + str + "</span>";
}

function highlight_none(str) {
    return "<span class=\"highlight_none\">" + str + "</span>";
}

/* hls [symbol, words]
   ret [symbol, words]
*/

function split(str="", key=[""]) {
    ret = [];
    var back = 0;
    for(var i = 0; i < str.length; ++i) {
        for(var j = 0; j < key.length; ++j) {
            if(str[i] == " " || str[i] == "\n" || str[i] == "\t") {
                ret.push(str.slice(back, i));
                ret.push(str[i]);
                back = i+1;
                break;
            }
            if(i+key[j].length <= str.length) {
                if(str.substr(i, key[j].length) == key[j]) {
                    ret.push(str.slice(back, i));
                    ret.push(key[j]);
                    back = i+key[j].length;
                    break;
                }
            }
        }
    }
    ret.push(str.slice(back, str.length));
    return ret;
}

function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str) &&
         !isNaN(parseFloat(str))
}

function print_code(code="", hls=[[""], [""]], ncc="", strsc="", target="") {
    lines = split(code, ["\n"]);
    opt = "<ol class=\"code_line\">";
    var isline = true, isunv = false, count_unv = 0, isStr = false;
    for(var i = 0; i < lines.length; ++i) {
        ret = split(lines[i], hls[0]);
        for(var j = 0; j < ret.length; ++j) {
            if(isline) {
                opt += "<li class=\"code\">";
                isline = false;
                isunv = false;
                isStr = false;
                count_unv = 0;
            }
            var group = -1;
            if(ret[j] == ncc) {
                isunv = true;
                opt += invisible(ret[j]);
                ++count_unv;
                j += ncc.length;
                continue;
            }
            if(isunv) {
                if(!(ret[j] == ncc[0] && count_unv == 3)) {
                    opt += invisible(ret[j]);
                }
                if(ret[j] == "\n") {
                    opt +="</li>";
                    isline = true;
                }
                ++count_unv;
                continue;
            }
            if(ret[j] == strsc) {
                isStr = !isStr;
                opt += highlight_str(ret[j]);
                continue;
            }
            if(isStr) {
                opt += highlight_str(ret[j]);
                continue;
            }
            for(var k = 0; k < hls[0].length; ++k) {
                if(hls[0][k] == ret[j])
                    group = 1;
            }
            for(var k = 0; k < hls[1].length; ++k) {
                if(hls[1][k] == ret[j])
                    group = 2;
            }
            if(isNumeric(ret[j]))
                group = 3;

            if(group == 1) opt += highlight_symbol(ret[j]);
            else if(group == 2) opt += highlight_word(ret[j]);
            else if(group == 3) opt += highlight_number(ret[j]);
            else if(ret[j] == "\n") {
                opt += "</li>";
                isline = true;
            }
            else opt += highlight_none(ret[j]);
        }
    }
    opt += "</ol>"
    document.getElementById(target).innerHTML = opt;
}