$(document).on('turbolinks:load', function() {
// useravatarのモーダルを表示
  $('.colorbox_link2').modaal({width: 600, height:250,});

  // user_avatarの更新をajax化
  function buildBackground(data){
    var image_top = `
        <img src= ${ data.background } class= 'user-avater__image' width= "648" height= "200" data-modaal-scope="modaal_153458640205425d75f82004fc">`
    return image_top;
  }


  $('.edit-user-background').on('submit', function(e){
    $('.colorbox_link2').modaal('close');
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
      if (data.length !== 0) {
        var back = buildBackground(data);
        $(".colorbox_link2").empty();
           console.log(this);
        $(".colorbox_link2").append(back);
        $('.btn').prop('disabled', false);
      }
      else {
        alert('error');
        $('.btn').prop('disabled', false);
      }
    })
    .fail(function(){
      alert('写真を選択してください');
      $('.btn').prop('disabled', false);
    })
  });
});
