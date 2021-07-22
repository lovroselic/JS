$(document).ready(function () {
    $(".banner").hover(overB, outB);
});

function overB() {
    $(this).addClass("over");
}

function outB() {
    $(this).removeClass("over");
}