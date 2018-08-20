$('.delete_avatar').on('click', function(e){
    $('.colorbox_link').modaal('close');
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
      if (data.length !== 0) {
        var Avatar1 = buildAvatar_top(data);
        var Avatar2 = buildAvatar_bottom(data);
        $(".colorbox_link").empty();
        $(".colorbox_link").append(Avatar1);
        $(".user_icon").empty();
        $(".user_icon").append(Avatar2);
        $('.form__submit').prop('disabled', false);
      }
      else {
        alert('error');
        $('.form__submit').prop('disabled', false);
      }
    })
    .fail(function(){
      alert('写真を選択してください');
      $('.form__submit').prop('disabled', false);
    })
  });
