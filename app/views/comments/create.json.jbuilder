json.id           @comment.id
json.text         @comment.text
json.name         @comment.user.name
json.user_id      @comment.user_id
json.avatar       @comment.user.avatar
json.update       @comment.updated_at.to_s
