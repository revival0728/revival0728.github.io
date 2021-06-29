hls_data = {
    js_hls: [["//", "\"", "'", "+", "-", "*", "/", "=", "!", "%", "&gt", "&lt", "^", ":", ",", "&", "|", ".", ";", "(", ")", "[", "]", "{", "}"], ["var", "function", "while", "for", "if", "else", "console"]],
    cpp_hls: [["//", "=", "?","\"", "'", "&gt", "&lt", "{", "}", "[", "]", "(", ")", "#", ",", "!", "-", "+", "*", "/", "&", "|", ":", "%", ";", "."], ["if", "cout", "include", "cin", "vector", "else", "for", "while", "namespace", "using", "int", "oduble", "float", "long", "template", "class", "void", "bool", "return", "define", "ifdef", "ifndef", "endif", "auto", "min", "struct", "friend", "operator", "const", "priority_queue", "greater", "continue", "break", "true", "false", "ios_base"]],
    py_hls: [["#", "'", "+", "*", "-", "=", "/", ":", "[", "]", "(", ")"], ["def", "return", "if", "else", "elif", "__name__", "print", "input", "map"]],
};

code_data = {
    ts: "int ternary_search(int l, int r, int key, vector&ltint&gt& arr) { \n	int midl, midr; \n	while(l &lt= r) { \n		midl = l+(r-l)/3, midr = r-(r-l)/3; \n		if(arr[midl] == key) \n			return midl; \n		if(arr[midr] == key) \n			return midr; \n		if(arr[midl] &gt key) \n			r = midl-1; \n		else if(arr[midr] &lt key) \n			l = midr+1; \n		else \n			l = midl+1, r = midr-1; \n	} \n	return -1; \n} ",
}

function setup() {
    print_code(code_data.ts, hls_data.cpp_hls, "//", "\"", "ts");
}


function hightlight_word(str) {
    return "<span class=\"highlight_word\">" + str + "</span>";
}

function hightlight_symbol(str) {
    return "<span class=\"highlight_symbol\">" + str + "</span>";
}

function hightlight_number(str) {
    return "<span class=\"highlight_number\">" + str + "</span>";
}

function invisible(str) {
    return "<span class=\"invisible\">" + str + "</span>";
}

function hightlight_str(str) {
    return "<span class=\"highlight_str\">" + str + "</span>";
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
            if(ret[j] == strsc) {
                isStr = !isStr;
                opt += hightlight_str(ret[j]);
                continue;
            }
            if(ret[j] == ncc) {
                isunv = true;
                ++count_unv;
            }
            if(isStr) {
                opt += hightlight_str(ret[j]);
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
                opt += "</li>";
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