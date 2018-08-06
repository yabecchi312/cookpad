# README
## DB設計

### users table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|avatar|text||
|background_image|text||
|profile|text||

※gem 'devise'にてemail,password等設定する

#### Association
- has_many :recipes
- has_many :mylists
- has_many :tsukurepos
- has_many :comments
- has\_many :like_tsukurepos
- has_many :kondates
- has_many :diaries
- has\_many :follow_relationships
- has\_many :users, through: :follow_relationships

***

### recipes table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|title|string||
|catch_copy|text||
|image|text||
|tips|text||
|background|text||
|status|integer||

#### Association
- has_many :ingredients
- has_many :flows
- has\_many :recipe_categories
- has\_many :categories, through: :recipe_categories
- has_many :tsukurepos
- has_many :comments
- has\_many :recipe_kondates
- has\_many :kondates, through: :recipe_kondates
- has_many :mylists
- belongs_to :user

***

### mylists table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|recipe_id|references|null: false, foreign_key: true|


#### Association
- belongs_to :user
- belongs_to :recipe

***

### ingredients table

|Column|Type|Options|
|------|----|-------|
|recipe_id|references|null: false, foreign_key: true|
|name|text||
|amount|text||


#### Association
- belongs_to :recipe

***

### flows table

|Column|Type|Options|
|------|----|-------|
|recipe_id|references|null: false, foreign_key: true|
|image|text||
|text|text||
|order|integer||


#### Association
- belongs_to :recipe

***

### recipe_categories table

|Column|Type|Options|
|------|----|-------|
|recipe_id|references|null: false, foreign_key: true|
|category_id|references|null: false, foreign_key: true|


#### Association
- belongs_to :recipe
- belongs_to :category

***

### categories table

|Column|Type|Options|
|------|----|-------|
|name|text||
|ancestry|text||


#### Association
- has\_many :recipe_categories
- has\_many :recipes, through: :recipe_categories

***

### recipe_kondates table

|Column|Type|Options|
|------|----|-------|
|recipe_id|references|null: false, foreign_key: true|
|kondate_id|references|null: false, foreign_key: true|
|status|integer||


#### Association
- belongs_to :recipe
- belongs_to :kondate

***

### kondates table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|title|string||
|image|text||
|tips|text||
|time|integer||
|point|text||
|status|integer||


#### Association
- has\_many :recipe_kondates
- has\_many :kondates, through: :recipe_kondates
- belongs_to :user

***

### tsukurepos table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|recipe_id|references|null: false, foreign_key: true|
|image|text||
|text|text||
|reply|text||


#### Association
- belongs_to :user
- belongs_to :recipe
- has\_many :like_tsukurepos

***

### like_tsukurepos table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|tsukurepo_id|references|null: false, foreign_key: true|


#### Association
- belongs_to :user
- belongs_to :tsukurepo

***

### comments table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|recipe_id|references|null: false, foreign_key: true|
|text|text||


#### Association
- belongs_to :user
- belongs_to :recipe

***

### follow_relationships table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|follow_id|integer||


#### Association
- has_many :users

***

### diaries table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|type|string||
|title|string||
|image|text||
|text|text||
|release_date|datetime||


#### Association
- belongs_to :user

***
