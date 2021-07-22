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
	/*$("input[name='Kosilo']").prop("disabled", true);
	$("#termin").click(function(){
		var location = parseInt($("#termin").val(), 10);
		console.log(location);
		switch (location) {
			case 1:
				$("input[name='Kosilo']").prop("disabled", true);
				$("#Kosilo_0").prop("checked",true);
				return;
			case 2:
				$("input[name='Kosilo']").prop("disabled", false);
				return;
			default:
				return;
		}
	});*/
	
	/*$("#Narocilo").click(function(){
		$("input[name='Kosilo']").prop("disabled", false);
	});*/
});