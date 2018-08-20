$(document).on('turbolinks:load', function() {
  // profileのtext_areaを表示する
  $(".profile_text").on('click', function(){
    $(".profile_text").hide();
    $(".profile_text_edit").show();
  })
  $(".delete_profile").on('click', function(){
    $(".profile_text_edit").hide();
    $(".profile_text").show();
  })
  function buildprofile(data) {
    var profile = `
      <div class="profile_text">
        ${ data.profile }
      </div>`
    return profile;
  }
  $('.edit_user_profile').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var id = $(this).find('.form_userid').val();
    $.ajax({
      url: "/users/" + id,
      type: "PATCH",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildprofile(data);
      $('.profile_text_edit').hide();
      $('.profile_text').show();
      $('.profile_text').html(html);
      $('.form_profile_submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
      $('.form_profile_submit').prop('disabled', false);
    })
  })
});
