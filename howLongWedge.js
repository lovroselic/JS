$(document).ready(function () {
    var start = 2003;
    var D = new Date();
    var yD = D.getFullYear();
    var csLength = yD - start;
    $("#calc").html(csLength);
    $("#calc3").html(csLength);
    $("#calc2").html(csLength + 12);
});


