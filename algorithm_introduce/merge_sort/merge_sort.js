data = {
    err_msg: "ERR_MSG >> Invalid Type",
    code: "function merge_sort(l, r) { // [l, r) \n     // sort global array \"arr\" \n     var mid = parseInt((l+r)/2); \n     if(l == r-1) { \n         return; \n     } else { \n         merge_sort(l, mid); \n         merge_sort(mid, r); \n     } \n     al = []; \n     ar = []; \n     for(var i = l; i &lt mid; ++i) al.push(arr[i]); \n     for(var i = mid; i &lt r; ++i) ar.push(arr[i]); \n     var il = 0, ir = 0; \n     while(il &lt al.length && ir &lt ar.length) { \n         if(al[il] &lt ar[ir]) \n             arr[l++] = al[il++]; \n         else \n             arr[l++] = ar[ir++]; \n     } \n     while(il &lt al.length) arr[l++] = al[il++]; \n     while(ir &lt ar.length) arr[l++] = ar[ir++]; \n}",
    hls: ["while", "var", "function", "if", "else", "for", "return", "+", "-", "*", "/", "=", "!", "%", "&gt", "&lt", "^", ":", ",", "&", "|", ".", ";"]
};

var arr = [];

function setup() {
    gen_random_array();
    print_code();
}

function main() {
    spd_str = reader();
    if(!array_input(spd_str)) return;
    printer();
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
    o += "After merge_sort function\n"
    merge_sort(0, arr.length);
    o += "[" + arr.join(", ") + "]";
    document.getElementById("output").value = o;
}

function hightlight(str) {
    return "<a class=\"highlight\">" + str + "</a>";
}

function invisible(str) {
    return "<a class=\"invisible\">" + str + "</a>";
}

function print_code() {
    opt = "<ol class=\"code_line\">";
    lines = split(data.code, "\n");
    for(var lns = 0; lns < lines.length; ++lns) {
        opt += "<li class=\"code\">"
        words = split(lines[lns], " ")
        var isnc = false;
        for(var i = 0; i < words.length; ++i) {
            var is_hi = false;
            if(words[i] == "//")
                isnc = true;
            if(isnc) {
                opt += invisible(words[i]) + " ";
                continue;
            } 
            if(data.hls.includes(words[i])) {
                opt += hightlight(words[i]);
                is_hi = true;
            }
            if(!is_hi) {
                console.log(words[i])
                for(var j = 0; j < words[i].length; ++j) {
                    var klen = -1;
                    for(var k = 0; k < data.hls.length; ++k) {
                        if(j+data.hls[k].length > words[i].length)
                            continue;
                        if(words[i].substr(j, data.hls[k].length) == data.hls[k])
                            klen = data.hls[k].length;
                    }
                    if(klen > 0) {
                        opt += hightlight(words[i].substr(j, klen));
                        j += (klen-1);
                    } else {
                        opt += words[i][j];
                    }
                }
            }
            opt += " ";
        }
        opt += "</li>";
    }
    opt += "</ol>";
    document.getElementById("code").innerHTML = opt;
}

function checker(value, index, array) {
    console.log(isNumeric(value));
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

function printer() {
    o = "Before merge_sort function\n"
    o += "[" + arr.join(", ") + "]\n\n";
    o += "After merge_sort function\n"
    merge_sort(0, arr.length);
    o += "[" + arr.join(", ") + "]";
    document.getElementById("output").value = o;
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
