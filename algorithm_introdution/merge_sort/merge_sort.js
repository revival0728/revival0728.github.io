data = {
    err_msg: "ERR_MSG >> Invalid Type",
    code: ["function merge_sort(l, r) { // [l, r) \n     // sort global array \"arr\" \n     var mid = parseInt((l+r)/2); \n     if(l == r-1) { \n         return; \n     } else { \n         merge_sort(l, mid); \n         merge_sort(mid, r); \n     } \n     al = []; \n     ar = []; \n     for(var i = l; i &lt mid; ++i) al.push(arr[i]); \n     for(var i = mid; i &lt r; ++i) ar.push(arr[i]); \n     var il = 0, ir = 0; \n     while(il &lt al.length && ir &lt ar.length) { \n         if(al[il] &lt ar[ir]) \n             arr[l++] = al[il++]; \n         else \n             arr[l++] = ar[ir++]; \n     } \n     while(il &lt al.length) arr[l++] = al[il++]; \n     while(ir &lt ar.length) arr[l++] = ar[ir++]; \n}"
    ,"#include &ltvector&gt \nusing namespace std; \n \nvoid merge_sort(vector&ltint&gt& arr, int l, int r) { \n    int mid = (l+r)/2; \n    if(l == r-1) { \n        return; \n    } else { \n        merge_sort(arr, l, mid); \n        merge_sort(arr, mid, r); \n    } \n    vector&ltint&gt vl(arr.begin()+l, arr.begin()+mid), vr(arr.begin()+mid, arr.begin()+r); \n    auto it = arr.begin()+l, il = vl.begin(), ir = vr.begin(); \n    while(il != vl.end() && ir != vr.end()) { \n        if(*il &lt *ir) \n            *it++ = *il++; \n        else \n            *it++ = *ir++; \n    } \n    while(il != vl.end()) *it++ = *il++; \n    while(ir != vr.end()) *it++ = *ir++; \n}"
    ,],
    hls: [["while", "var", "function", "if", "else", "for", "return", "+", "-", "*", "/", "=", "!", "%", "&gt", "&lt", "^", ":", ",", "&", "|", ".", ";"]
    ,["#", "include", "define", "using", "namespace", ";", "int", "float", "double", "&lt", "&gt", "for", "while", "if", "else", "long", "ll", "vector", "template", "|", "cin", "cout", "class", "+", "-", "*", "/", "=", "%", "!", "void", "new", ",", "&", ":", "return"],
    ,],
    ncc: ["//", "//"],
    lan: ["javascript", "cpp"],
};

var arr = [];

function setup() {
    gen_random_array();
    print_code(data.code[0], data.hls[0], data.ncc[0], "code");
    update_sel();
}

function main() {
    spd_str = reader();
    if(!array_input(spd_str)) return;
    printer();
}

function change_lan(sel) {
    var index = sel.selectedIndex;
    print_code(data.code[index], data.hls[index], data.ncc[index], "code");
}

function update_sel() {
    opt = "";
    for(var i = 0; i < data.lan.length; ++i)
        opt += "<option>" + data.lan[i] + "</option>";
    document.getElementById("lan_sel").innerHTML = opt;
}

function gen_random_array() {
    def_ipt = "10\n"
    for(var i = 0; i < 10; ++i) {
        def_ipt += (Math.floor(Math.random() * 100));
        if(i != 9) def_ipt += " ";
    }
    document.getElementById("input").value = def_ipt;
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

function printer() {
    o = "Before merge_sort function\n"
    o += "[" + arr.join(", ") + "]\n\n";
    o += "After merge_sort function\n";
    pre_time = performance.now();
    merge_sort(0, arr.length);
    now_time = performance.now();
    during = (now_time-pre_time)/(1e6);
    during = during.toFixed(2);
    o += "[" + arr.join(", ") + "]\n\n";
    o += "\n>> Language: javascript\n";
    o += ">> Used " + during + " second";
    if(during != 0 && during != 1) o += "s";
    document.getElementById("output").value = o;
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

function print_code(code, hls, ncc, target) { // use <pre></pre> !!!
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

function checker(value, index, array) {
    return isNumeric(value);
}

function array_input(data) {
    numberic = data.every(checker);
    if(!numberic) {
        document.getElementById("output").value = data.err_msg;
        return false;
    }
    for(var i = 0; i < data.length; ++i)
        data[i] = parseInt(data[i]);
    while(arr.length < data[0]) arr.push(0);
    while(arr.length > data[0]) arr.pop();
    for(var i = 0; i < arr.length && i < data.length-1; ++i)
        arr[i] = data[i+1];
    return true;
}

function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str) &&
         !isNaN(parseFloat(str))
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

function merge_sort(l, r) { // [l, r)
    // sort global array "arr"
    var mid = parseInt((l+r)/2);
    if(l == r-1) {
        return;
    } else {
        merge_sort(l, mid);
        merge_sort(mid, r);
    }
    al = [];
    ar = [];
    for(var i = l; i < mid; ++i) al.push(arr[i]);
    for(var i = mid; i < r; ++i) ar.push(arr[i]);
    var il = 0, ir = 0;
    while(il < al.length && ir < ar.length) {
        if(al[il] < ar[ir])
            arr[l++] = al[il++];
        else
            arr[l++] = ar[ir++];
    }
    while(il < al.length) arr[l++] = al[il++];
    while(ir < ar.length) arr[l++] = ar[ir++];
}
