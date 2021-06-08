ans = []
times = 0
win = false;

function setup() {
    ans.push(Math.floor(Math.random() * 10));
    while(ans.length < 4) {
        var value = Math.floor(Math.random() * 10);
        var ok = true;
        for(var i = 0; i < ans.length; ++i) {
            if(ans[i] == value) ok = false;
        }
        if(ok) ans.push(value);
    }
}

function check() {
    if(win) return;
    try {
        ++times;
        var sub = [];
        var guess = document.getElementById("input").value;
        for(var i = 0; i < guess.length; ++i) {
            if(guess[i] < '0' || guess[i] > '9')
                throw "Follow the Rule!!!"
            sub.push(parseInt(guess[i]));
        }
        if(guess.length != 4) throw "Follow the Rule!!!"
        for(var i = 0; i < 4; ++i) {
            for(var j = i+1; j < 4; ++j) {
                if(sub[i] == sub[j])
                    throw "Follow the Rule!!!"
            }
        }

        var a = 0, b = 0;

        // calculate A
        for(var i = 0; i < 4; ++i)
            if(sub[i] == ans[i])
                ++a;
        // calculate B
        for(var i = 0; i < 4; ++i) {
            for(var j = 0; j < 4; ++j) {
                if(i == j) continue;
                if(ans[i] == sub[j]) ++b;
            }
        }
        document.getElementById("res").value = (a + "A" + b + "B");
        if(a == 4) {
            win = true;
            var output = "";
            if(times == 1) output = "You're Lucky"
            else if(times < 5) output = "Grandmaster"
            else if(times < 8) output = "Master"
            else if(times < 15) output = "Expert"
            else if(times < 20) output = "You're first time?"
            else output = "Noob"
            document.getElementById("input").value = output;
        }
        var rec = (a + "A" + b + "B" + " ");
        for(var i = 0; i < 4; ++i)
            rec += sub[i];
        rec += "\n";
        document.getElementById("list").innerHTML += rec;
        document.getElementById("score").innerHTML = "目前猜了 " + times + " 次";
    } catch(e) {
        document.getElementById("input").value = e;
    }
}