$(function(){
  // 新規,編集レシピメイン画像
  $(".recipe-image").on("change", function(){
    var file = this.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function() {
      $("#image_example").attr("src", reader.result)
    };
  });
  // 新規料理手順の画像
  $(document).on("change", ".step-image", function(){
    var file = this.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    var StepImage = $(this).prev('.step_example')
    reader.onload = function() {
      $(StepImage).attr("src", reader.result)
    };
  });
});
