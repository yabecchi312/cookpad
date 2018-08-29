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
  // $(".step-image").on("change", function(){
  //   var file = this.files[0];
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onload = function() {
  //     $("#step_example").attr("src", reader.result)
  //   };
  // })
});
