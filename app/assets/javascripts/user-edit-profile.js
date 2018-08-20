$(document).on('turbolinks:load', function() {
  $(".profile_text").on('click', function(){
    $(".profile_text").hide();
    $(".profile_text_edit").show();
  })
  $(".delete_profile").on('click', function(){
    $(".profile_text_edit").hide();
    $(".profile_text").show();
  })
});
