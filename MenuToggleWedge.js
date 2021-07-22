//version 1.1
(function() {
  var INI = {
    iconSrc: "/Games/AA/Coolie2.png",
    maxResVisible: 768
  };
  $(function() {
    $(".toggleMenuIcon").attr("src", INI.iconSrc);
    $(".toggleMenuIcon").attr("width", "24px");
    $(".toggleMenuIcon").attr("height", "24px");
    $("#toggleMenuVisibility").on("click", function() {
      $("ul.navigation").toggle(400);
    });
    if (window.innerWidth < INI.maxResVisible) {
      $("ul.navigation").hide();
    }
    $(window).resize(function() {
      if (window.innerWidth < INI.maxResVisible) {
        $("ul.navigation").hide();
      } else {
        $("ul.navigation").show();
      }
    });
  });
})();
