$(document).on('click','#kondate-modal-open',function(e){
  e.preventDefault();
  $(this).blur() ;
  if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;
  $("body").append('<div id="modal-overlay"></div>');
  $("#modal-overlay").append(makeKondateModalContents());
  centeringModalSyncer();
  $("#modal-overlay").fadeIn("slow");
  $("#modal-content").fadeIn("slow");
});

$(document).on("click","#modal-close",function(){
  $("#modal-content,#modal-overlay").fadeOut("slow",function(){
  //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
  $("#modal-overlay").remove();
  });
});

$(document).on("click",".menu_list",function(e){
  e.preventDefault();
  if($(this).hasClass('selected')){
    return;
  }
  else{
    var pre = $(this).parent().find(".selected");
    pre.removeClass('selected');
    $(this).addClass('selected');

    $('.tab').not('.tab_hide').addClass('tab_hide');
    var index = $('li.menu_list').index(this);
    $('.tab').eq(index).removeClass('tab_hide');
  }
});



function centeringModalSyncer(){

  //画面(ウィンドウ)の幅を取得し、変数[w]に格納
  var w = $(window).width();

  //画面(ウィンドウ)の高さを取得し、変数[h]に格納
  var h = $(window).height();

  //コンテンツ(#modal-content)の幅を取得し、変数[cw]に格納
  var cw = $("#modal-content").outerWidth({margin:true});

  //コンテンツ(#modal-content)の高さを取得し、変数[ch]に格納
  var ch = $("#modal-content").outerHeight({margin:true});

  //コンテンツ(#modal-content)を真ん中に配置するのに、左端から何ピクセル離せばいいか？を計算して、変数[pxleft]に格納
  var pxleft = ((w - cw)/2);

  //コンテンツ(#modal-content)を真ん中に配置するのに、上部から何ピクセル離せばいいか？を計算して、変数[pxtop]に格納
  var pxtop = ((h - ch)/2);

  //[#modal-content]のCSSに[left]の値(pxleft)を設定
  $("#modal-content").css({"left": pxleft + "px"});

  //[#modal-content]のCSSに[top]の値(pxtop)を設定
  $("#modal-content").css({"top": pxtop + "px"});

}


function makeKondateModalContents() {
  html =
  `
  <div id="modal-content">
    <div id="recipe_selector">
      <h2 class="title_row">クックパッド内のレシピ</h2>
      <ul class="menu_tab">
        <li class="menu_list menu_myrecipe selected">
          <p>あなたのレシピ</p>
        </li>
        <li class="menu_list menu_myhistory">
          <p>最近見たレシピ</p>
        </li>
        <li class="menu_list menu_myfolder">
          <p>MYフォルダ</p>
        </li>
        <li class="menu_list menu_recipe_id">
          <p>レシピID</p>
        </li>
      </ul>
      <div class="tab" id="from_mykitchen">
        <div class="recipe_selector">
          <div class="selectable_recipes">
            <div class="search_box">
              <form action="/recipe/select" accept-charset="UTF-8" data-remote="true" method="get">
                <input name="utf8" type="hidden" value="✓">
                <i class="fas fa-search"></i>
                <input type="text" name="keyword" id="keyword" placeholder="MYキッチンから検索">
                <input type="hidden" name="page" id="page" value="1">
                <input type="hidden" name="size" id="size" value="4">
                <input type="hidden" name="from" id="from" value="mykitchen">
                <input type="hidden" name="next_url" id="next_url" value="/user_kondates/182528/confirm_add_recipe">
                <input type="hidden" name="add_params" id="add_params" value="kondate_recipe_id=822255">
                <input type="hidden" name="remote" id="remote" value="1">
                <input type="submit" name="commit" value="検索" class="search_submit_button small">
              </form>
            </div>
            <div class="center paginate">
            </div>
          </div>
        </div>
      </div>
      <div class="tab tab_hide" id="from_history">
      </div>
      <div class="tab tab_hide" id="from_myfolder">
      </div>
      <div class="tab tab_hide" id="from_recipe_id">
      </div>
    </div>
    <button id="modal-close" class="button-link search_submit_button">閉じる</button>
    <div class="clear_both">
  </div>

  `


  return html;
}
