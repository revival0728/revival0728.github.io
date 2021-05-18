var arr = [];
var err_msg = "ERR_MSG >> Invalid Type"

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

function print_code() {
    document.getElementById("code").innerHTML = merge_sort;
}

function checker(value, index, array) {
    console.log(isNumeric(value));
    return isNumeric(value);
}

function array_input(data) {
    numberic = data.every(checker);
    if(!numberic) {
        document.getElementById("output").value = err_msg;
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
