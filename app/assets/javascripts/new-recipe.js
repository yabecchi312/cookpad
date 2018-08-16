$(document).on('turbolinks:load', function(){
$(function(){
  var html = `<div class="ingredient">
                <input placeholder="材料名" class="ingredient-name" type="text" name="recipe[ingredients_attributes][][name]" >
                <input placeholder="分量" class="ingredient-amount" type="text" name="recipe[ingredients_attributes][][amount]">
                <a id="ingredient-delete-button" href="">削除</a>
                </div>`
  $("#ingredient-add-button").on("click", function(){
    $(".ingredients").append(html);
    return false;
  });

  $(document).on("click", "#ingredient-delete-button", function(){
    $(this).closest(".ingredient").remove();
    return false;
  });
});

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
    $(".step textarea").val('');
    if ($(".step").length == 1) {
      $("#step-remove-button").hide();
    }
    else {
      $("#step-remove-button").show();
    };
  };

  $(function(){
    button();
  });

  $("#step-add-button").on("click", function(e){
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
});

