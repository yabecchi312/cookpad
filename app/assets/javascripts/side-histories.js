$(document).on('turbolinks:load', function() {
  var $sidebar = $('#side_history'),
      sidebarOffsetTop = $sidebar.offset().top;
  $(window).on('scroll', function () {
    $sidebar.css('top', 35 - $(this).scrollTop());
    if($(this).scrollTop() >= 35) {
      $sidebar.css('top', '0');
    }
  });
});
