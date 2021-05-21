var select_num = 6;
id_table = ["sas", "dp", "gd", "gh", "tr", "ps"]
id_isop = []

sel_data = [ // [Name, Url]
    [["Merge Sort", "./merge_sort/"]], // sas
    [["nothing yet", ""]], // dp
    [["nothing yet", ""]], // gd
    [["nothing yet", ""]], // gh
    [["nothing yet", ""]], // tr
    [["nothing yet", ""]], // ps
]

code_data = {
    cpp_hello_world: "#include &ltiostream&gt \nusing namespace std; \n  \nint main() {\n    cout &lt&lt \"hello, algorithm!\" &lt&lt '\\n'; \n}",
    js_hello_world: "function main() { \n    console.log(\"Hello, algorithm!\"); \n    document.getElementById(\"Output\").innerHTML = \"hello, algorithm!\"; \n}",
    py_hello_world: "def main(): \n    print('hello, algorithm!') \n  \nif __name__ == '__main__': \n    main()",
};

hls_data = {
    js_hls: [["//", "\"", "'", "+", "-", "*", "/", "=", "!", "%", "&gt", "&lt", "^", ":", ",", "&", "|", ".", ";", "(", ")", "[", "]", "{", "}"], ["var", "function", "while", "for", "if", "else", "console"]],
    cpp_hls: [["//", "\"", "'", "&gt", "&lt", "{", "}", "[", "]", "(", ")", "#", ",", "!", "-", "+", "*", "/", "&", "|", ":", "%", ";"], ["if", "cout", "include", "cin", "vector", "else", "for", "while", "namespace", "using", "int", "oduble", "float", "long", "template", "class", "void", "bool", "return", "define", "ifdef", "ifndef", "endif", "auto"]],
    py_hls: [["#", "'", "+", "*", "-", "=", "/", ":", "[", "]", "(", ")"], ["def", "return", "if", "else", "elif", "__name__", "print", "input", "map"]],
};

function reset() {
    for(var i = 0; i < select_num; ++i)
        id_isop.push(false);
}

function setup() {
    reset();
    print_code(code_data.cpp_hello_world, hls_data.cpp_hls, "//", "\"", "cpp_cfhw");
    print_code(code_data.js_hello_world, hls_data.js_hls, "//", "\"", "js_cfhw");
    print_code(code_data.py_hello_world, hls_data.py_hls, "#", "'", "py_cfhw");
}

function open_select(id) {
    opt = "";
    for(var i = 0; i < select_num; ++i) {
        if(id == i) continue;
        if(id_isop[i]) open_select(i);
    }
    if(!id_isop[id]) {
        for(var i = 0; i < sel_data[id].length; ++i)
            opt += "<ul class=\"select_list\"><a href=\"" + sel_data[id][i][1] + "\">" + sel_data[id][i][0] + "</a></ul>";
    }
    id_isop[id] = !id_isop[id];
    document.getElementById(id_table[id]).innerHTML = opt;
}

function reader() {
    ipt = document.getElementById("input").value;
    recorder = [-1]
    ret = []
    for(var i = 0; i < ipt.length; ++i) {
        if(ipt.substr(i, 1) == " " || ipt.substr(i, 1) == "\n")
            recorder.push(i);
    }
    recorder.push(ipt.length);
    for(var i = 1; i < recorder.length; ++i) {
        ret.push(ipt.slice(recorder[i-1]+1, recorder[i]));
    }
    return ret;
}


/*function printer() {
    ;
}*/

function hightlight_word(str) {
    return "<a class=\"highlight_word\">" + str + "</a>";
}

function hightlight_symbol(str) {
    return "<a class=\"highlight_symbol\">" + str + "</a>";
}

function hightlight_number(str) {
    return "<a class=\"highlight_number\">" + str + "</a>";
}

function invisible(str) {
    return "<a class=\"invisible\">" + str + "</a>";
}

function hightlight_str(str) {
    return "<a class=\"highlight_str\">" + str + "</a>";
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
                count_unv = 0;
            }
            var group = -1;
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
                opt += hightlight_str(ret[j]);
                continue;
            }
            if(isStr) {
                opt += hightlight_str(ret[j]);
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

            if(group == 1) opt += hightlight_symbol(ret[j]);
            else if(group == 2) opt += hightlight_word(ret[j]);
            else if(group == 3) opt += hightlight_number(ret[j]);
            else if(ret[j] == "\n") {
                opt += ret[j] + "</li>";
                isline = true;
            }
            else opt += ret[j];
        }
    }
    opt += "</ol>"
    document.getElementById(target).innerHTML = opt;
}

/*function reader() {
    ipt = document.getElementById("input").value;
    recorder = [-1]
    ret = []
    for(var i = 0; i < ipt.length; ++i) {
        if(ipt.substr(i, 1) == " " || ipt.substr(i, 1) == "\n")
            recorder.push(i);
    }
    recorder.push(ipt.length);
    for(var i = 1; i < recorder.length; ++i) {
        ret.push(ipt.slice(recorder[i-1]+1, recorder[i]));
    }
    return ret;
}*/