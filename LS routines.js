/* LaughingSkull - Lovro Selič - common routines */

outp = function (data, tag) {
    document.getElementById('page').innerHTML += "<" + tag + ">" + data + "</" + tag + ">";
};
cls = function () {
    document.getElementById('page').innerHTML = "";
};
rnd = function (start, end) {
    return Math.floor(Math.random() * end) + start;
};