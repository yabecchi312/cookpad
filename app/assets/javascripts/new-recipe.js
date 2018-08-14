$(function(){
  var html = `<div class="ingredient">
                <input placeholder="材料名" class="ingredient-name" type="text" name="recipe[ingredients_attributes][][name]" >
                <input placeholder="分量" class="ingredient-amount" type="text" name="recipe[ingredients_attributes][][amount]">
                </div>`
  $("#add-button").on("click", function(){
    $(".ingredients").append(html);
    return false;
  });
});
