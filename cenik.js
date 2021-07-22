$(document).ready(function () {
    var $required = ['ime', 'sola', 'naslov', 'email', 'DS']; //required IDs
    var loopLength = $required.length;
    for (var i = 0; i < loopLength; i++) {
        $("#" + $required[i]).addClass("required");
    }
	var selectedRow = "";
    $("#cenik tbody tr").click(function () {
        if (selectedRow.length) {
            selectedRow.removeClass("sel");
        }
        selectedRow = $(this);
        selectedRow.addClass("sel");
    });
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