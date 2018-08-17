
$(document).on('click','.myfolder_btn',function(e){
  e.preventDefault();
  registerOrUnregister($(this).prev().val(),$(this),$(this).parents(".myfolder"))
})

function registerOrUnregister(id, button,myfolder){
  if (button.hasClass("unregister")){
    $.ajax({
      url: "/myfolders/" + id,
      type: "delete",
      data: {post_id: id},
      dataType: "json"
    })
    .done(function(data){
      var html = buildRegisterIcon(data);
      myfolder.empty();
      myfolder.append(html);
    })
    .fail(function(){
      alert('通信に失敗しました')
    })
  }else{
    $.ajax({
      url: "/myfolders",
      type: "post",
      data: {recipe_id: id},
      dataType: "json"
    })
    .done(function(data){
      var html = buildUnregisterIcon(data);
      myfolder.empty();
      myfolder.append(html);
    })
    .fail(function(){
      alert('通信に失敗しました')
    })
  }
}

function buildRegisterIcon(data){
  var html =
  `
  <form class="new_myfolder" id="new_myfolder" action="/myfolders" accept-charset="UTF-8" data-remote="true" method="post">
    <input name="utf8" type="hidden" value="✓">
    <input type="hidden" name="recipe_id" id="recipe_id" value="${data.id}">
    <button name="button" type="submit" class="myfolder_btn register">
      <i class="fa fa-plus-circle myfolder_icon"></i>
    </button>
  </form>
  `
  return html
}

function buildUnregisterIcon(data){
  var html =
  `
  <form class="edit_myfolder" id="edit_myfolder_${data.myfolder_id}" action="/myfolders/${data.myfolder_id}" accept-charset="UTF-8" data-remote="true" method="post">
    <input name="utf8" type="hidden" value="✓">
    <input type="hidden" name="_method" value="delete">
    <input type="hidden" name="myfolder_id" id="myfolder_id" value="${data.myfolder_id}">
    <button name="button" type="submit" class="myfolder_btn unregister">
      <i class="fa fa-minus-circle myfolder_icon"></i>
    </button>
  </form>
  `
  return html
}
