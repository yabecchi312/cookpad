// モーダルの起動
$(document).on('click','#kondate-modal-open',function(e){
  e.preventDefault();
  $(this).blur();
  if($("#modal-overlay")[0]) $("#modal-overlay").remove();
  $("body").append('<div id="modal-overlay"></div>');
  var recipeIndex = $('.kondate_recipe_index').index(this);
  $("#modal-overlay").append(makeSelectRecipeModal(recipeIndex));
  centeringModalSyncer();
  $("#modal-overlay").fadeIn("slow");
  $("#modal-content").fadeIn("slow");
  makeInitialMyRecipeLists();
  makeInitialMyFolderRecipeLists();
});

// 閉じるボタンでモーダルを閉じる
$(document).on("click","#modal-close",function(){
  $("#modal-content,#modal-overlay").fadeOut("slow",function(){
  //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
  $("#modal-overlay").remove();
  });
});

// モーダル内タブの切り替え
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

// 自身のレシピを非同期で取得し、一覧化
function makeInitialMyRecipeLists(){
  var userId = $('#user_id_for_search').val();
  $.ajax({
    url: location.origin + '/recipes/list/' + userId,
    type: 'GET',
    data: {"id": userId},
    dataType: 'json',
  })
  .done(function(recipes){
    if(recipes.length !== 0){
      var tagAddedfor = $('#from_mykitchen').find('.selectable_recipes');
      recipes.forEach(function(recipe){
        var html = buildKondateRecipeModalPreview(recipe);
        tagAddedfor.append(html);
      })
    }
  })
  .fail(function(){
    alert('MYレシピ取得に失敗しました')
  })
}

// 自身のMYフォルダに登録されているレシピを非同期で取得し、一覧化
function makeInitialMyFolderRecipeLists(){
  var userId = $('#user_id_for_search').val();
  $.ajax({
    url: location.origin + '/myfolders',
    type: 'GET',
    data: {"id": userId},
    dataType: 'json',
  })
  .done(function(recipes){
    if(recipes.length !== 0){
      var tagAddedfor = $('#from_myfolder').find('.selectable_recipes');
      recipes.forEach(function(recipe){
        var html = buildKondateRecipeModalPreview(recipe);
        tagAddedfor.append(html);
      })
    }
  })
  .fail(function(){
    alert('MYフォルダ内レシピ取得に失敗しました')
  })
};

// 自身のレシピ内で検索、および結果の反映
$(document).on("click","#kondate_my_recipe_search",function(e){
  e.preventDefault();
  var userId = $('#user_id_for_search').val();
  var keyword = $('#my_recipe_keyword').val();
  $.ajax({
    url: location.origin + '/recipes/list/' + userId,
    type: 'GET',
    data: {"id": userId, "keyword": keyword},
    dataType: 'json',
  })
   .done(function(recipes){
    var tagAddedfor = $('#from_mykitchen').find('.selectable_recipes');
    tagAddedfor.find('.recipe').remove();
    if(recipes.length !== 0){
      recipes.forEach(function(recipe){
        var html = buildKondateRecipeModalPreview(recipe);
        tagAddedfor.append(html);
      })
    }
  })
  .fail(function(){
    alert('MYレシピ取得に失敗しました')
  })
});

// 自身のMYフォルダ内で検索、および結果の反映
$(document).on("click","#kondate_my_folder_recipe_search",function(e){
  e.preventDefault();
  var userId = $('#user_id_for_search').val();
  var keyword = $('#my_folder_recipe_keyword').val();
  $.ajax({
    url: location.origin + '/myfolders',
    type: 'GET',
    data: {"id": userId, "keyword": keyword},
    dataType: 'json',
  })
   .done(function(recipes){
    var tagAddedfor = $('#from_myfolder').find('.selectable_recipes');
    tagAddedfor.find('.recipe').remove();
    if(recipes.length !== 0){
      recipes.forEach(function(recipe){
        var html = buildKondateRecipeModalPreview(recipe);
        tagAddedfor.append(html);
      })
    }
  })
  .fail(function(){
    alert('MYレシピ取得に失敗しました')
  })
});

// レシピIDで検索、および結果の反映
$(document).on("click","#kondate_recipe_id_search",function(e){
  e.preventDefault();
  var recipe_id = $('#recipe_id_keyword').val();
  $.ajax({
    url: location.origin + '/recipes/' + recipe_id,
    type: 'GET',
    data: {"id": recipe_id},
    dataType: 'json',
  })
   .done(function(recipe){
    var tagAddedfor = $('#from_recipe_id').find('.selectable_recipes');
    tagAddedfor.find('.recipe').remove();
    if(recipe){
      var html = buildKondateRecipeModalPreview(recipe);
      tagAddedfor.append(html);
    }
  })
  .fail(function(){
    alert('レシピ取得に失敗しました')
  })
});

// モーダル内のレシピプレビューのhtml作成
function buildKondateRecipeModalPreview(recipe){
  var html =
  `
  <div class="recipe">
    <a href="#" class="image_back_80x80">
      <img alt="${recipe.title}" src="${recipe.image}">
    </a>
    <div class="title_block">
      <a class="pickup_title recipe_title" href="/recipe/${recipe.recipe_id}">${recipe.title}</a>
      <span class="author">
        by
        <a class="pickup_user_name" href="/kitchen/${recipe.user_id}">${recipe.user_name}</a>
      </span>
    </div>
    <input class="pickup_recipe_id" type="hidden" value="${recipe.recipe_id}">
    <button id="select_this_recipe" class="search_submit_button small">選択する</button>
  </div>
  `
  return html;
}

// モーダル内の選択ボタン押下で、作成ページにレシピを反映し、モーダルを閉じる
$(document).on('click','#select_this_recipe',function(){
  var recipe_id = $(this).prev('.pickup_recipe_id').attr('value');
  $.ajax({
    url: location.origin + '/recipes/' + recipe_id,
    type: 'GET',
    data:{id: recipe_id},
    dataType: 'json'
  })
  .done(function(recipe){
    var recipeIndex = $('#recipe_index').val();
    if(recipeIndex == 0){
      var status_text = "主";
    }
    else{
      var status_text = "副";
    }
    var html = buildKondateRecipeCreatePreview(recipe,recipeIndex,status_text);
    if($('.kondate_recipe_wrapper').eq(recipeIndex).hasClass('add_kondate_recipe')){
      $('.kondate_recipe_wrapper').eq(recipeIndex).before('<div class="kondate_recipe_wrapper"></div>');
    }
    var target = $('.kondate_recipe_wrapper').eq(recipeIndex);
    target.empty();
    target.append(html);
    $("#modal-content,#modal-overlay").fadeOut("slow",function(){
      $("#modal-overlay").remove();
    });
  })
  .fail(function(){
    alert('レシピ反映に失敗しました')
  })
});

// 作成ページに反映するhtmlの作成
function buildKondateRecipeCreatePreview(recipe,recipeIndex,status_text){
  if(recipe.image){
    var recipe_image =
    `
      <a id="kondate-modal-open" class="kondate_recipe_index" href="#">
        <img alt="${recipe.title}" src="${recipe.image}">
      </a>
    `
  }
  else{
    var recipe_image =
    `
      <a id="kondate-modal-open" class="kondate_recipe_index kondate_recipe_blank" href="#">
      </a>
    `
  }
  html =
  `
  <input type="hidden" name="kondate[recipe_kondates_attributes][][recipe_id]" id="kondate_recipe_condates_recipe_id" value="${recipe.recipe_id}">
  <input type="hidden" name="kondate[recipe_kondates_attributes][][status]" id="kondate_recipe_condates_status" value="${recipeIndex}">
  <div class="operation_links right">
    <span class="update_recipe_link font12">
    </span>
  </div>
  <div class="kondate_recipe">
    <div class="icon_kondate_recipe">
      <div class="kondate_status_icon">
        ${status_text}
      </div>
    </div>
    <div class="kondate_recipe_image">
      ${recipe_image}
    </div>
    <div class="block5_0">
      <a class="recipe_title" href="/recipe/${recipe.recipe_id}">${recipe.title}</a>
      <div class="gray font12">
        by ${recipe.user_name}
      </div>
    </div>
  </div>
  `
  return html;
};

// モーダルを中央に表示させるための値を取得
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

// モーダルのhtml
function makeSelectRecipeModal(recipeIndex) {
  html =
  `
  <div id="modal-content">
    <input type="hidden" name="recipe_index" value="${recipeIndex}" id="recipe_index">
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
                <input type="text" name="my_recipe_keyword" id="my_recipe_keyword" placeholder="MYキッチンから検索">
                <input type="hidden" name="page" id="page" value="1">
                <input type="hidden" name="size" id="size" value="4">
                <input type="hidden" name="from" id="from" value="mykitchen">
                <input type="hidden" name="remote" id="remote" value="1">
                <input type="submit" name="commit" value="検索" id="kondate_my_recipe_search" class="search_submit_button small">
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
        <div class="recipe_selector">
          <div class="selectable_recipes">
            <div class="search_box">
              <form action="/recipe/select" accept-charset="UTF-8" data-remote="true" method="get">
                <input name="utf8" type="hidden" value="✓">
                <i class="fas fa-search"></i>
                <input type="text" name="my_recipe_keyword" id="my_folder_recipe_keyword" placeholder="MYフォルダから検索">
                <input type="hidden" name="page" id="page" value="1">
                <input type="hidden" name="size" id="size" value="4">
                <input type="hidden" name="from" id="from" value="mykitchen">
                <input type="hidden" name="remote" id="remote" value="1">
                <input type="submit" name="commit" value="検索" id="kondate_my_folder_recipe_search" class="search_submit_button small">
              </form>
            </div>
            <div class="center paginate">
            </div>
          </div>
        </div>
      </div>
      <div class="tab tab_hide" id="from_recipe_id">
        <div class="recipe_selector">
          <div class="selectable_recipes">
            <div class="search_box">
              <form action="/recipe/select" accept-charset="UTF-8" data-remote="true" method="get">
                <input name="utf8" type="hidden" value="✓">
                <i class="fas fa-search"></i>
                <input type="text" name="recipe_id_keyword" id="recipe_id_keyword" placeholder="レシピIDで検索">
                <input type="hidden" name="page" id="page" value="1">
                <input type="hidden" name="size" id="size" value="4">
                <input type="hidden" name="from" id="from" value="mykitchen">
                <input type="hidden" name="remote" id="remote" value="1">
                <input type="submit" name="commit" value="検索" id="kondate_recipe_id_search" class="search_submit_button small">
              </form>
            </div>
            <div class="center paginate">
            </div>
          </div>
        </div>
      </div>
    </div>
    <button id="modal-close" class="button-link search_submit_button">閉じる</button>
    <div class="clear_both">
  </div>
  `

  return html;
}
