hls_data = {
    js_hls: [["//", "\"", "'", "+", "-", "*", "/", "=", "!", "%", "&gt", "&lt", "^", ":", ",", "&", "|", ".", ";", "(", ")", "[", "]", "{", "}"], ["var", "function", "while", "for", "if", "else", "console"]],
    cpp_hls: [["//", "=", "?","\"", "'", "&gt", "&lt", "{", "}", "[", "]", "(", ")", "#", ",", "!", "-", "+", "*", "/", "&", "|", ":", "%", ";", "."], ["if", "cout", "include", "cin", "vector", "else", "for", "while", "namespace", "using", "int", "oduble", "float", "long", "template", "class", "void", "bool", "return", "define", "ifdef", "ifndef", "endif", "auto", "min", "struct", "friend", "operator", "const", "priority_queue", "greater", "continue", "break", "true", "false", "ios_base", "string"]],
    py_hls: [["#", "'", "+", "*", "-", "=", "/", ":", "[", "]", "(", ")"], ["def", "return", "if", "else", "elif", "__name__", "print", "input", "map"]],
};

code_data = {
    kmp: "struct KMP { \n	string pat; \n	vector&ltint&gt lps; \n	KMP(string _pat) : pat(_pat) { \n		int m = pat.size(), i = 1, len = 0; \n		lps.resize(m); \n		lps[0] = 0; \n		while(i &lt m) { \n			if(pat[i] == pat[len]) \n				lps[i++] = ++len; \n			else { \n				if(len != 0) \n					i = lps[len-1]; \n				else \n					lps[i++] = 0; \n			} \n		} \n	} \n	int count(string txt) { \n		int n = txt.size(), m = pat.size(), i = 0, j = 0, ans = 0; \n		while(i &lt n) { \n			if(txt[i] == pat[j]) \n				++i, ++j; \n			if(j == m) \n				j = lps[j-1], ++ans; \n			else if(i &lt n && txt[i] != pat[j]) { \n				if(j != 0) \n					j = lps[j-1]; \n				else \n					++i; \n			} \n		} \n		return ans; \n	} \n};",
}

function setup() {
    print_code(code_data.kmp, hls_data.cpp_hls, "//", "\"", "kmp");
}


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