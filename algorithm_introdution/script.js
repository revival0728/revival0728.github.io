var select_num = 6;
id_table = ["sas", "dpagd", "ghatr", "ds", "adt", "ps"]
id_isop = []

sel_data = [ // [Name, Url]
    [["Merge Sort", "./merge_sort/"], ["Ternary Search", "./Ternary_search/"]], // sas
    [["nothing yet", ""]], // dpagd
    [["nothing yet", ""]], // ghatr
    [["Segment Tree", "./segment_tree/"]], // ds
    [["IO Optimization", "./IO_optimization/"], ["KMP algorithm", "./KMP_algorithm/"]], // adt
    [["nothing yet", ""]], // ps
]

code_data = {
    bsh_code: "bool binary_search(vector&ltint&gt& arr, int target) { \n    int l = 0, r = arr.size()-1, mid = (l+r)/2; \n    while(l &lt= r) { \n        mid = (l+r)/2; \n        if(target == arr[mid]) \n            break; \n        else if(target &lt arr[mid]) \n            r = mid-1; \n        else \n            l = mid+1; \n    } \n    return mid&ltarr.size() ? target == arr[mid] : false; \n}",
    zok_code: "int ZOKnapSack(int s, vector&ltint&gt c, vector&ltint&gt w) { \n	vector&ltint&gt dp(s+1, 0); \n	for(int i = 0; i &lt c.size(); ++i) { \n		for(int j = s; j-c[i] &gt= 0; --j) \n			dp[j] = min(dp[j], dp[j-c[i]]+w[i]); \n	} \n	return dp[s]; \n}",
    mspn_code: "using ll = long long; \n \nstruct node { \n	int w, nd; \n	node(int _w, int _nd) : w(_w), nd(_nd) {} \n \n	friend bool operator&gt(const node& a, const node& b) { \n		return a.w &gt b.w; \n	} \n}; \n \nll Prims(vector&ltvector&ltnode&gt&gt graph, int n, int m) { \n	priority_queue&ltnode, vector&ltnode&gt, greater&ltnode&gt&gt pq; \n	vector&ltbool&gt vis(n, 0); \n	ll ans = 0; \n	pq.emplace(0, 0); \n	while(!pq.empty()) { \n		auto t = pq.top(); pq.pop(); \n		if(vis[t.nd]) continue; \n		ans += t.w, vis[t.nd] = 1; \n		for(auto& nd : graph[t.nd]) { \n			if(!vis[nd.nd]) \n				pq.push(nd); \n		} \n	} \n	return ans; \n}",
};

hls_data = {
    js_hls: [["//", "\"", "'", "+", "-", "*", "/", "=", "!", "%", "&gt", "&lt", "^", ":", ",", "&", "|", ".", ";", "(", ")", "[", "]", "{", "}"], ["var", "function", "while", "for", "if", "else", "console"]],
    cpp_hls: [["//", "=", "?","\"", "'", "&gt", "&lt", "{", "}", "[", "]", "(", ")", "#", ",", "!", "-", "+", "*", "/", "&", "|", ":", "%", ";"], ["if", "cout", "include", "cin", "vector", "else", "for", "while", "namespace", "using", "int", "oduble", "float", "long", "template", "class", "void", "bool", "return", "define", "ifdef", "ifndef", "endif", "auto", "min", "struct", "friend", "operator", "const", "priority_queue", "greater", "continue", "break", "true", "false"]],
    py_hls: [["#", "'", "+", "*", "-", "=", "/", ":", "[", "]", "(", ")"], ["def", "return", "if", "else", "elif", "__name__", "print", "input", "map"]],
};

function reset() {
    for(var i = 0; i < select_num; ++i)
        id_isop.push(false);
}

function setup() {
    reset();
    print_code(code_data.bsh_code, hls_data.cpp_hls, "//", "\"", "bsh");
    print_code(code_data.zok_code, hls_data.cpp_hls, "//", "\"", "zok");
    print_code(code_data.mspn_code, hls_data.cpp_hls, "//", "\"", "mspn");
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

function check_url(url) {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

var prange = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

function make_plink(olink, contest, problem) {
    return olink + "/" + contest + "/" + prange[problem];
}

function random_problem_picker() { //beta
    var olink = "https://codeforces.com/problemset/problem";
    var contest = Math.floor(Math.random() * 10000) % 1520;
    var problem = Math.floor(Math.random() * 10) % prange.length;
    if(contest < 500) contest += 500;
    while(!check_url(make_plink(olink, contest, problem))) {
        console.log(make_plink(olink, contest, problem));
        problem = Math.floor(Math.random() * 10) % prange.length;
    }
    var link = make_plink(olink, contest, problem);
    document.getElementById("gotp").href = link;
    document.getElementById("stp").value = link;
}