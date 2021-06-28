hls_data = {
    js_hls: [["//", "\"", "'", "+", "-", "*", "/", "=", "!", "%", "&gt", "&lt", "^", ":", ",", "&", "|", ".", ";", "(", ")", "[", "]", "{", "}"], ["var", "function", "while", "for", "if", "else", "console"]],
    cpp_hls: [["~", "//", "=", "?","\"", "'", "&gt", "&lt", "{", "}", "[", "]", "(", ")", "#", ",", "!", "-", "+", "*", "/", "&", "|", ":", "%", ";", "."], ["if", "cout", "include", "cin", "vector", "else", "for", "while", "namespace", "using", "int", "oduble", "float", "long", "template", "class", "void", "bool", "return", "define", "ifdef", "ifndef", "endif", "auto", "min", "struct", "friend", "operator", "const", "priority_queue", "greater", "continue", "break", "true", "false", "ios_base", "string", "delete", "new"]],
    py_hls: [["#", "'", "+", "*", "-", "=", "/", ":", "[", "]", "(", ")"], ["def", "return", "if", "else", "elif", "__name__", "print", "input", "map"]],
};

code_data = {
    single_update: "using ll = long long; \n#define mid ((l+r)/2) \n#define lc (id&lt&lt1) \n#define rc (id&lt&lt1|1) \n \nstruct segTree { \n	int N; \n	ll *seg; \n	segTree(int _N) : N(_N), seg(new ll[N&lt&lt2]) {} \n	~segTree() {delete [] seg;} \n \n	void pull(int id, int l, int r) { \n		if(l != r) seg[id] = seg[lc] + seg[rc]; \n	} \n	void build(vector&ltint&gt& vt, int id, int l, int r) { \n		if(l == r) { \n			seg[id] = vt[l]; \n			return; \n		} \n		build(vt, lc, l, mid), build(vt, rc, mid+1, r); \n		pull(id, l, r); \n	} \n	void upd(int id, int l, int r, int x, ll v) { \n		if(x &lt= mid) upd(lc, l, mid, x, v); \n		else upd(rc, mid+1, r, x, v); \n		pull(id, l, r); \n	} \n	ll qry(int id, int l, int r, int ql, int qr) { \n		if(ql &lt= l && r &lt= qr) return seg[id]; \n		if(l &gt qr || r &lt ql) return 0; \n		return qry(lc, l, mid, ql, qr) + qry(rc, mid+1, r, ql, qr); \n	} \n \n	void build(vector&ltint&gt& vt) {build(vt, 1, 1, N);} \n	void upd(int x, ll v) {upd(1, 1, N, x, v);} \n	ll qry(int ql, int qr) {return qry(1, 1, N, ql, qr);} \n};",
    range_update: "using ll = long long; \n#define mid ((l+r)/2) \n#define lc (id&lt&lt1) \n#define rc (id&lt&lt1|1) \n \nstruct segTree { \n	int N; \n	ll *seg, *tag; \n	segTree(int _N) : N(_N), seg(new ll[N&lt&lt2]), tag(new ll[N&lt&lt2]) {} \n	~segTree() {delete [] seg; delete [] tag;} \n \n	void pull(int id, int l, int r) { \n		if(l != r) seg[id] = seg[lc] + seg[rc]; \n	} \n	void push(int id, int l, int r) { \n		if(tag[id]) { \n			if(l != r) { \n				seg[lc] += tag[id]*(mid-l+1), seg[rc] += tag[id]*(r-mid); \n				tag[lc] += tag[id], tag[rc] += tag[id]; \n			} \n			tag[id] = 0; \n		} \n	} \n	void build(vector&ltint&gt& vt, int id, int l, int r) { \n		if(l == r) { \n			seg[id] = vt[l]; \n			return; \n		} \n		build(vt, lc, l, mid), build(vt, rc, mid+1, r); \n		pull(id, l, r); \n	} \n	void upd(int id, int l, int r, int ql, int qr, ll v) { \n		push(id, l, r); \n		if(ql &lt= l && r &lt= qr) { \n			seg[id] += v*(r-l+1); \n			tag[id] += v; \n			return; \n		} \n		if(l &gt qr || r &lt ql) return; \n		upd(lc, l, mid, ql, qr, v), upd(rc, mid+1, r, ql, qr, v); \n		pull(id, l, r); \n	} \n	ll qry(int id, int l, int r, int ql, int qr) { \n		push(id, l, r); \n		if(ql &lt= l && r &lt= qr) return seg[id]; \n		if(l &gt qr || r &lt ql) return 0; \n		return qry(lc, l, mid, ql, qr) + qry(rc, mid+1, r, ql, qr); \n	} \n \n	void build(vector&ltint&gt& vt) {build(vt, 1, 1, N);} \n	void upd(int ql, int qr, ll v) {upd(1, 1, N, ql, qr, v);} \n	ll qry(int ql, int qr) {return qry(1, 1, N, ql, qr);} \n};",
}

function setup() {
    print_code(code_data.single_update, hls_data.cpp_hls, "//", "\"", "single_update");
    print_code(code_data.range_update, hls_data.cpp_hls, "//", "\"", "range_update")
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