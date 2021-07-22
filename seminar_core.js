(function () {
    $(document).ready(function () {
        $("#lunch2").hide(400);
        $("#Kosilo_true").click(function () {
            console.log("clicked yes");
            $("#lunch2").show(400);
        });
          $("#Kosilo_false").click(function () {
            console.log("clicked no");
            $("#lunch2").hide(400);
        });

    });
})();


