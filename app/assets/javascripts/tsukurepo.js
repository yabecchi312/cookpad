// モーダルの起動
$(document).on('click','#js_tsukurepo_modal_button',function(e){
  e.preventDefault();
  $(this).blur();
  if($("#modal-overlay")[0]) $("#modal-overlay").remove();
  $("body").append('<div id="modal-overlay"></div>');
  centeringModalSyncer();
  var user_id = $(this).siblings()[0].value
  var user_name = $(this).siblings()[1].value
  var recipe_title = $(this).siblings()[2].value
  var recipe_id = $(this).siblings()[3].value
  $("#modal-overlay").append(makeTsukurepoModal(recipe_id,recipe_title,user_id,user_name));
  $("#modal-overlay").fadeIn("slow");
  $("#tsukurepo-modal-content").fadeIn("slow");
});

// 閉じるボタンでモーダルを閉じる
$(document).on("click","#modal-close",function(){
  $("#tsukurepo-modal-content,#modal-overlay").fadeOut("slow",function(){
  //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
  $("#modal-overlay").remove();
  });
});


// モーダルのhtml
function makeTsukurepoModal(recipe_id,recipe_title,user_id,user_name) {
  html =
  `
<div id="tsukurepo-modal-content">
  <div id="tsukurepost_header">
    <div id="post_header">
      <div id="posted-user-name">
        <span class="recipe-title">
          ${recipe_title}
        </span>
        に
      </div>
      <h2 class="content_title">
        「つくれぽ」を送る
      </h2>
    </div>
  </div>
  <div id="tsukurepo_post_navi">
    <div class="info_msg" id="tsukurepo_info_msg">
      あなたが作った料理の写真とメッセージで
      <br>
      ${user_name}さんに「おいしかった！」を伝えよう。
    </div>
    <div class="tab" id="tsukurepo_post">
      <div class="tsukurepo">
        <div class="tsukurepo-inner">
          <div class="tsukurepo_info">
            <p class="date">18/08/30</p>
          </div>
          <div class="image image_wrapper">
            <form class="new_tsukurepo" id="new_tsukurepo" enctype="multipart/form-data" action="/tsukurepos" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="Y8g9fnttqx+910GDzabsE5CvqhOyVSazWPnBVYBODoV26dqwJ8zAHTpbZgyc/9MpMPNHJSYY+OzJ2o0ElpRT0A=="><input value="${recipe_id}" type="hidden" name="tsukurepo[recipe_id]" id="tsukurepo_recipe_id">
              <input value="${user_id}" type="hidden" name="tsukurepo[user_id]" id="tsukurepo_user_id">
              <label for="tsukurepo_image"><img src="https://assets.cpcdn.com/assets/shared/tsukurepo_photo_blank.png?4a966ee051b533c75acabd178e0945eb3a9a4c495c832278fbface07682a94db" alt="Tsukurepo photo blank">
                <input class="tsukurepo_photo_wrapper_hidden" type="file" name="tsukurepo[image]" id="tsukurepo_image">
              </label><textarea class="tsukurepo_textarea" name="tsukurepo[text]" id="tsukurepo_text"></textarea>
              <input type="submit" name="commit" value="送信する" id="tsukurepo_submit_btn" data-disable-with="送信する">
            </form></div>
          </div>
        </div>
      </div>
    </div>
    <button id="modal-close" class="button-link search_submit_button">閉じる</button>
  </div>
  `

  return html;
}
