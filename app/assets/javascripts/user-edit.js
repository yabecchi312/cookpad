$(document).on('turbolinks:load', function() {
  // usernameのモーダルの表示
    $('.modal').modaal({width: 600, height:250});
    $(function(){
      //残り文字数を表す要素を無ければ追加する
      function add_count_disp(targetElement){
        if(!targetElement.prev().hasClass("count-disp")){
          targetElement.before('<p class="count-disp"></p>');
        }
      }
      //指定した要素の残り入力可能文字数を表示する
      function count_length(targetElement){
        var inputlength = targetElement.val().length;
        var maxlength = targetElement.attr("maxlength");

        if(!maxlength) return;

        var count = (maxlength - inputlength);
        var count_message = 'あと' + count + '文字';

        if(targetElement.prev().hasClass("count-disp")){
            targetElement.prev().html(count_message);
        }
      }
      //クラス:count-lengthの要素に入力があるたびに呼び出す
      $(".count-length").keyup(function(){
        add_count_disp($(this));
        count_length($(this));
      })
      //ページ読み込み時、クラス：count-lengthのすべての要素の入力文字数をカウント
      $(".count-length").each(function(){
        add_count_disp($(this));
        count_length($(this));
      })
    });
  // useravatarのモーダルを表示
  $('.colorbox_link').modaal({width: 600, height:250,});

  // user_avatarの更新をajax化
  function buildAvatar_top(data){
    var avatar_top = `
        <img src= ${ data.avatar } class= 'user-avater__image' width= "50" height= "50" data-modaal-scope="modaal_153458640205425d75f82004fc">
        <p>変更する</p>`
    return avatar_top;
  }

  function buildAvatar_bottom(data){
    var avatar_bottom = `
        <img src= ${ data.avatar } class= 'user-avater__image' width= "50" height= "50">`
    return avatar_bottom;
  }

  function buildAvatar_delete(){
    var avatar_delete = `
      <span>
        <input type="hidden" name="user_id" id="user_id" value="1" class="form_userid">
        <a class="delete_avatar" data-method="delete" href="/users/1/avatar_destroy" data-remote="true">(削除する)</a>
      </span>`
    return avatar_delete;
  }

  $('.edit_user').on('submit', function(e){
    $('.colorbox_link').modaal('close');
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
        var Avatar1 = buildAvatar_top(data);
        var Avatar2 = buildAvatar_bottom(data);
        $(".colorbox_link").empty();
        $(".colorbox_link").append(Avatar1);
        $(".user_icon").empty();
        $(".user_icon").append(Avatar2);
        $('.form__submit').prop('disabled', false);
        if (!$("#change_user_name_form span a").hasClass("delete_avatar")) {
          $("#change_user_name_form p").append(buildAvatar_delete());
        }
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
});




