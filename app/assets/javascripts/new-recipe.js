// レシピ投稿
$(document).on('turbolinks:load', function(){
  $(function(){
    var ingredient_number = $(".ingredient").length - 1;

// 新規投稿
    function newAppendIngredient(ingredient_num){
      var newHtml = `<div class="ingredient">
                    <input placeholder="材料名" class="ingredient-name" type="text" name="recipe[ingredients_attributes][${ingredient_num}][name]" >
                    <input placeholder="分量" class="ingredient-amount" type="text" name="recipe[ingredients_attributes][${ingredient_num}][amount]">
                    <a id="ingredient-delete-button" href="">削除</a>
                    </div>`
                    return newHtml;
                  };

// 編集
    function editAppendIngredient(ingredient_num){
      var editHtml = `<div class="ingredient">
                        <input placeholder="材料名" class="ingredient-name" type="text" name="recipe[ingredients_attributes][${ingredient_num}][name]" >
                        <input placeholder="分量" class="ingredient-amount" type="text" name="recipe[ingredients_attributes][${ingredient_num}][amount]">
                        <a id="ingredient-delete-button" href="">削除</a>
                        <input name="recipe[ingredients_attributes][${ingredient_num}][_destroy]" type="hidden", value="">
                        <input id="update_destroy" type="checkbox" value="" name="recipe[ingredients_attributes][${ingredient_num}][_destroy]">
                      </div>
                      `
                    return editHtml;
                  };


// 新規投稿
    $("#ingredient-add-button").on("click", function(){
      ingredient_number = ingredient_number + 1
      newHtml = newAppendIngredient(ingredient_number)
      $(".ingredients").append(newHtml);
      return false;
    });

// 編集
    $("#ingredient-add-button-edit").on("click", function(){
      ingredient_number = ingredient_number + 1
      editHtml = editAppendIngredient(ingredient_number)
      $(".ingredients").append(editHtml);
      return false;
    });


// 新規投稿 削除
    $(document).on("click", "#ingredient-delete-button", function(){
      $(this).closest(".ingredient").remove();
      return false;
    });

// 編集 削除
    $(document).on("click", "#ingredient-delete-button-edit", function(){
      $(this).nextAll("input").prop("checked", true);
      $(this).closest(".ingredient").hide();
      return false;
    });
  });
});


// 料理手順
$(function(){
  var step_number = $(".step").length;

  function appendStep(step_num){
  var step = `<div class="step">
                <div class="step__header">
                  <div class="step__header__left">
                    <div class="step-position">${step_num}</div>
                    <div class="step_move_higher">
                      <a href="#">←</a>
                    </div>
                    <div class="step_move_lower">
                      <a href="#">→</a>
                    </div>
                  </div>
                  <div class="step__header__right">
                    <a id="step-remove-button" href="#">削除</a>
                    <a id="step-add-button" href="#">追加</a>
                  </div>
                </div>
                <div class="step__main">
                  <div class="step__main_image">
                    <label for="recipe_flows_attributes_0_image">
                      <img src="/assets/step_blank-c36c8efecb31bebf8f7ef53a7fc4f24034c74677b0fdb521996e77d54b2962fa.png" alt="Step blank">
                      <input class="step-image" type="file" name="recipe[flows_attributes][][image]">
                    </label>
                  </div>
                  <div class="step__main_text">
                    <textarea name="recipe[flows_attributes][][text]">
                    </textarea>
                  </div>
                </div>
              </div>`
              return step;
              };

  function addNumber(){
    $("#cooking-steps .step-position").each(function(i){
      var i = i + 1;
      $(this).html( i );
    })
  };

  function button(){
    if ($(".step").length == 1) {
      $("#step-remove-button").hide();
    }
    else {
      $("#step-remove-button").show();
    };
  };

  $(document).on("click", "#step-add-button", function(){
    step_number = step_number + 1
    step = appendStep(step_number);
    $(this).closest(".step").after(step);
    addNumber();
    button();
    return false;
  });

  $(document).on("click", "#step-remove-button", function(){
      $(this).closest(".step").remove();
      addNumber();
      button();
      return false;
  });
});


// レシピ投稿のサイドバー
$(document).on('turbolinks:load', function(){
// タイトルについて
  $(function(){
    $("#example_title").on("click", function(){
      $("#example_title .example_arrow_top").hide();
      $("#example_title .example_arrow_bottom").show();
      $("#example_title .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $("#example_title .example_box_yellow").hide();
      $("#example_title .example_arrow_bottom").hide();
      $("#example_title .example_arrow_top").show();
      return false;
    });
  });

  // 写真について
  $(function(){
    $("#example_photo").on("click", function(){
      $("#example_photo .example_arrow_top").hide();
      $("#example_photo .example_arrow_bottom").show();
      $("#example_photo .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $("#example_photo .example_box_yellow").hide();
      $("#example_photo .example_arrow_bottom").hide();
      $("#example_photo .example_arrow_top").show();
      return false;
    });
  });

  // レシピの紹介文について
  $(function(){
    $(".example_description").on("click", function(){
      $(".example_description .example_arrow_top").hide();
      $(".example_description .example_arrow_bottom").show();
      $(".example_description .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $(".example_description .example_box_yellow").hide();
      $(".example_description .example_arrow_bottom").hide();
      $(".example_description .example_arrow_top").show();
      return false;
    });
  });

  // 材料、調味料について
  $(function(){
    $(".example_ingredients").on("click", function(){
      $(".example_ingredients .example_arrow_top").hide();
      $(".example_ingredients .example_arrow_bottom").show();
      $(".example_ingredients .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $(".example_ingredients .example_box_yellow").hide();
      $(".example_ingredients .example_arrow_bottom").hide();
      $(".example_ingredients .example_arrow_top").show();
      return false;
    });
  });

  // 作り方について
  $(function(){
    $(".example_setup").on("click", function(){
      $(".example_setup .example_arrow_top").hide();
      $(".example_setup .example_arrow_bottom").show();
      $(".example_setup .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $(".example_setup .example_box_yellow").hide();
      $(".example_setup .example_arrow_bottom").hide();
      $(".example_setup .example_arrow_top").show();
      return false;
    });
  });

  // コツ、ポイントについて
  $(function(){
    $(".example_advice").on("click", function(){
      $(".example_advice .example_arrow_top").hide();
      $(".example_advice .example_arrow_bottom").show();
      $(".example_advice .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $(".example_advice .example_box_yellow").hide();
      $(".example_advice .example_arrow_bottom").hide();
      $(".example_advice .example_arrow_top").show();
      return false;
    });
  });

  // レシピの生い立ちについて
  $(function(){
    $(".example_history").on("click", function(){
      $(".example_history .example_arrow_top").hide();
      $(".example_history .example_arrow_bottom").show();
      $(".example_history .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $(".example_history .example_box_yellow").hide();
      $(".example_history .example_arrow_bottom").hide();
      $(".example_history .example_arrow_top").show();
      return false;
    });
  });
});
