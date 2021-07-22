$(document).ready(function () {
    var $required = ['ime', 'sola', 'naslov', 'email', 'placnik', 'nasplac', 'email_sola', 'id_ddv']; //required IDs
    var loopLength = $required.length;
    for (var i = 0; i < loopLength; i++) {
        $("#" + $required[i]).addClass("required");
    }
    $("input").focusout(function () {
        var selectedTB = $(this);
        if (selectedTB.hasClass("required")) {
            var textValue = selectedTB.val();
            if (textValue) {
                selectedTB.removeClass("required");
                selectedTB.addClass("validated");
            }
        }
    });
	
});