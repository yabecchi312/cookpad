$(function(){
  var html = `<div class="" `

  $(".recipe-photo").on("click", function(){
    $(this).find("#recipe-main-photo").remove();
    $("#recipe-main-photo").append(html);
  });
})
