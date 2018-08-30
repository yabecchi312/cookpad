$(document).on('turbolinks:load', function() {

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


$(function(){

    var text_max = 500; // 最大入力値
    // $("#comment-char-count").text(text_max - $("#comment-field").val().length);

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

  $(function(){
    function buildHTML(comment){
      var html = `
<div id="comment-list">
  <div class="comment">
    <div class="info">
      <img class="author_icon" src="${ comment.avatar.url }" alt="Senchou" width="22" height="22">
      <a href="/users/${ comment.user_id }">
        ${ comment.name }
      </a>
      <span class="comment-update">
        ${ comment.update }
      </span>
    </div>
    <div class="comment-text">
      ${ comment.text }
    </div>
  </div>
  <div class="paging-paginate">
  </div>
</div>`
      return html;
    }
    $('.user-comment-form').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var id = $(this).find('.form_recipeid').val() + '/comments'
      $.ajax({
        url: id,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('#comments-list').append(html)
        $('#comment-field').val('')
        $('.submit').prop('disabled', false);
      })
      .fail(function(){
        alert('error');
        $('.submit').prop('disabled', false);
      })
    })
  });
});
