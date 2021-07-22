$(document).ready(function () {
    var $selected = "";
    $(".faq h3").click(function () {
        if ($selected.length) {
            $selected.hide();
        }
        $selected = $(this).next();
        $selected.fadeIn(999);
    });
});