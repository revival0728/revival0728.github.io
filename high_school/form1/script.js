function random_background() {
    r = Math.floor(Math.random() * 300) % 256;
    g = Math.floor(Math.random() * 300) % 256;
    b = Math.floor(Math.random() * 300) % 256;
    color = "rgb(" + r + "," + g + "," + b + ")";
    console.log(color);
    document.body.style.backgroundColor = color;
}