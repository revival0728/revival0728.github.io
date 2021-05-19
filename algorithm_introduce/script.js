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

hls_data = {
    js_hls: ["while", "var", "function", "if", "else", "for", "return", "+", "-", "*", "/", "=", "!", "%", "&gt", "&lt", "^", ":", ",", "&", "|", ".", ";", "\""],
    cpp_hls: ["#", "include", "define", "using", "namespace", ";", "int", "float", "double", "&lt", "&gt", "for", "while", "if", "else", "long", "vector", "template", "|", "cin", "cout", "class", "+", "-", "*", "/", "=", "%", "!", "void", "new", ",", "&", ":", "\""],
    py_hls: ["def", "class", ":", "if", "&lt", "&gt", "else", "elif", "while", "import", "\'", "\"", "+", "-", "*", "/", "%", "__name__", "print", "input"],
};

code_data = {
    cpp_hello_world: "#include &ltiostream&gt \n using namespace std; \n  \n int main() { \n    cout &lt&lt \"hello, world!\" &lt&lt '\\n'; \n }",
    js_hello_world: "function main() { \n     console.log(\"Hello, world!\"); \n     document.getElementById(\"Output\").innerHTML = \"hello, world\"; \n }",
    py_hello_world: "def main(): \n     print('hello, world!') \n  \n if __name__ == \"__main__\": \n     main()",
};

function reset() {
    for(var i = 0; i < select_num; ++i)
        id_isop.push(false);
}

function setup() {
    reset();
    print_code(code_data.cpp_hello_world, hls_data.cpp_hls, "//", "cpp_cfhw");
    print_code(code_data.js_hello_world, hls_data.js_hls, "//", "js_cfhw");
    print_code(code_data.py_hello_world, hls_data.py_hls, "#", "py_cfhw");
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

function split(str, key) {
    recorder = [-1]
    ret = []
    for(var i = 0; i < str.length; ++i) {
        if(str.substr(i, 1) == key)
            recorder.push(i);
    }
    recorder.push(str.length);
    for(var i = 1; i < recorder.length; ++i) {
        ret.push(str.slice(recorder[i-1]+1, recorder[i]));
    }
    return ret;
}

function hightlight(str) {
    return "<a class=\"highlight\">" + str + "</a>";
}

function invisible(str) {
    return "<a class=\"invisible\">" + str + "</a>";
}

function min(a, b) {
    if(a > b) return b;
    else return a;
}

function print_code(code, hls, ncc, target) {
    opt = "<ol class=\"code_line\">";
    lines = split(code, "\n");
    for(var lns = 0; lns < lines.length; ++lns) {
        opt += "<li class=\"code\">"
        var ncid = 1e9;
        var each = lines[lns], beh_id = [], beh_pos = [];
        for(var i = 0; i < each.length; ++i) {
            for(var k = 0; k < hls.length; ++k) {
                if(i+2 <= each.length) {
                    if(each.substr(i, 2) == "//")
                        ncid = min(ncid, i);
                }
                if(i+hls[k].length <= each.length) {
                    if(each.substr(i, hls[k].length) == hls[k] && beh_pos[beh_pos.length-1] != i)
                        beh_pos.push(i), beh_id.push(k);
                }
            }
        }
        var id = 0;
        for(var j = 0; j < each.length; ++j) {
            if(ncid <= j) {
                opt += invisible(each[j]);
            }
            else if(j == beh_pos[id]) {
                opt += hightlight(each.substr(j, hls[beh_id[id]].length));
                j += (hls[beh_id[id]].length-1);
                ++id;
            } else {
                opt += each[j];
            }
        }
        opt += "</li>";
    }
    opt += "</ol>";
    document.getElementById(target).innerHTML = opt;
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
