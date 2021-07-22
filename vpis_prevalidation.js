$(document).ready(function () {
    var $required = ['ime', 'sola', 'placnik', 'naslov', 'email', 'telefon']; //required IDs
    var loopLength = $required.length;
    for (var i = 0; i < loopLength; i++) {
        $("#" + $required[i]).addClass("required");
    }
    $("input").focusout(function () {
        var selectedTB = $(this);
        if (selectedTB.hasClass("required")) {
            console.log(selectedTB);
            var textValue = selectedTB.val();
            if (textValue) {
                selectedTB.removeClass("required");
                selectedTB.addClass("validated");
            }
        }
    });
});