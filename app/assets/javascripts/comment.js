$(function($){
  // コメントタブクリック時に起動
  $("#comment_tab").click(function(e){
    e.preventDefault();
      $("#tsukurepo").hide();
      $("#comments").show();
      $("#tsukurepo_tab").removeClass("selected");
      $("#comment_tab").addClass("selected");
    });
  // つくれぽタブクリック時に起動
  $("#tsukurepo_tab").click(function(e){
    e.preventDefault();
      $("#comments").hide();
      $("#tsukurepo").show();
      $("#comment_tab").removeClass("selected");
      $("#tsukurepo_tab").addClass("selected");
    });
  });

$(function(){

    var text_max = 500; // 最大入力値
    $("#comment-char-count").text(text_max - $("#comment-field").val().length);

    $("#comment-field").on("keydown keyup keypress change",function(){
        var text_length = $(this).val().length;
        var countdown = text_max - text_length;
        $("#comment-char-count").text(countdown);
        if(countdown < 0){
            $("#comment-char-count").css({
                color:'#999999',
                fontWeight:'normal'
            });
        } else {
            $("#comment-char-count").css({
                color:'#999999',
                fontWeight:'normal'
            });
        }
    });
});


  jQuery(function($) {
    $('#comment-list').on('ajax:success', function(evt, data) {
      $('#comment-list').html(data.comment_list_html);
    });
  });
