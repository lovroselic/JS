$(document).ready(function () {
    var selectedRow = "";
    $("#teme tbody tr").click(function () {
        if (selectedRow.length) {
            selectedRow.removeClass("sel");
        }
        selectedRow = $(this);
        selectedRow.addClass("sel");
    });
});