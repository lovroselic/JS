$(document).ready(function () {
    var $selectedTable = "";
    $(".clickable").click(function () {
        if ($selectedTable.length) {
            $selectedTable.hide();
        }
        $selectedTable = $(this).find("table");
        $selectedTable.fadeIn(800);
        $selectedTable.css("display", "table");
    });
});