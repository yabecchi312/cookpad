$(document).on('turbolinks:load', function() {
  $('#user_menu_config').hover(function() {
     $('#setting_tip').toggle();
  });
  $('#user_menu_config').on("click", function() {
    $('body').append('<div id="fade-bg"></div>')
    $('.config_dropdown_menu,#fade-bg').fadeIn();
    $('#fade-bg').click(function() {
      $('.config_dropdown_menu,#fade-bg').fadeOut(function(){
        $('#fade-bg').remove()
      });
    });
  });
});

