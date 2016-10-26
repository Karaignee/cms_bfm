# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150502204111) do

  create_table "artists", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "profile_image_file_name"
    t.string   "profile_image_content_type"
    t.integer  "profile_image_file_size"
    t.datetime "profile_image_updated_at"
    t.text     "description"
    t.integer  "gear_id"
  end

  add_index "artists", ["gear_id"], name: "index_artists_on_gear_id"

  create_table "artists_gear_pages", id: false, force: true do |t|
    t.integer "artist_id"
    t.integer "gear_page_id"
  end

  add_index "artists_gear_pages", ["artist_id"], name: "index_artists_gear_pages_on_artist_id"
  add_index "artists_gear_pages", ["gear_page_id"], name: "index_artists_gear_pages_on_gear_page_id"

  create_table "bourbon_article_media_uploads", force: true do |t|
    t.integer  "bourbon_article_id"
    t.integer  "media_upload_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bourbon_articles", force: true do |t|
    t.string   "article_title"
    t.integer  "contributor_id"
    t.integer  "curator_id"
    t.integer  "user_id"
    t.string   "article_subtitle"
    t.datetime "article_published_at"
    t.integer  "image_id"
    t.text     "article_body"
    t.string   "tags"
    t.boolean  "visible"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "clickable_title"
    t.boolean  "ready_for_curation",   default: false
  end

  create_table "brands", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "profile_image_file_name"
    t.string   "profile_image_content_type"
    t.integer  "profile_image_file_size"
    t.datetime "profile_image_updated_at"
    t.text     "description"
    t.integer  "gear_id"
  end

  add_index "brands", ["gear_id"], name: "index_brands_on_gear_id"

  create_table "countries", force: true do |t|
    t.string   "name"
    t.boolean  "in_the_eu"
    t.integer  "running_order"
    t.string   "iso_code"
    t.string   "country_tld"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "gear_categories", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "gear_page_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "gear_categories", ["gear_page_id"], name: "index_gear_categories_on_gear_page_id"

  create_table "gear_pages", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "brand_id"
    t.integer  "artist_id"
    t.integer  "genre_id"
    t.string   "ancestry"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "gear_category_id"
    t.string   "profile_image_file_name"
    t.string   "profile_image_content_type"
    t.integer  "profile_image_file_size"
    t.datetime "profile_image_updated_at"
    t.integer  "user_id"
  end

  add_index "gear_pages", ["ancestry"], name: "index_gear_pages_on_ancestry"
  add_index "gear_pages", ["artist_id"], name: "index_gear_pages_on_artist_id"
  add_index "gear_pages", ["brand_id"], name: "index_gear_pages_on_brand_id"
  add_index "gear_pages", ["gear_category_id"], name: "index_gear_pages_on_gear_category_id"
  add_index "gear_pages", ["genre_id"], name: "index_gear_pages_on_genre_id"

  create_table "genres", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "profile_image_file_name"
    t.string   "profile_image_content_type"
    t.integer  "profile_image_file_size"
    t.datetime "profile_image_updated_at"
    t.text     "description"
  end

  create_table "media_uploads", force: true do |t|
    t.integer  "user_id"
    t.string   "description"
    t.string   "tags"
    t.string   "media_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "upload_file_name"
    t.string   "upload_content_type"
    t.integer  "upload_file_size"
    t.datetime "upload_updated_at"
    t.boolean  "publicly_available"
    t.string   "video_embed_code"
    t.string   "alt_tag"
    t.boolean  "make_text_bright",    default: false
  end

  create_table "omniauth_authorizations", force: true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "oauth_token"
    t.datetime "oauth_token_expires_at"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pre_registrations", force: true do |t|
    t.string   "email"
    t.string   "ip_address"
    t.string   "source"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "user_agent"
  end

  create_table "profile_question_answers", force: true do |t|
    t.text     "the_response"
    t.integer  "user_id"
    t.integer  "profile_question_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "profile_question_categories", force: true do |t|
    t.string   "name"
    t.integer  "running_order"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "profile_questions", force: true do |t|
    t.string   "the_question"
    t.integer  "profile_question_category_id"
    t.integer  "running_order"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_content_links", force: true do |t|
    t.integer  "user_id"
    t.integer  "bourbon_article_id"
    t.integer  "profile_id"
    t.integer  "profile_question_answer_id"
    t.string   "preference"
    t.integer  "score",                      default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_groups", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.boolean  "is_admin"
    t.boolean  "is_curator"
    t.boolean  "is_contributor"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "limit_user_invites_for_this_group", default: true
    t.integer  "invites_limit_per_user",            default: 0
  end

  create_table "user_invites", force: true do |t|
    t.integer  "user_id"
    t.datetime "invited_at"
    t.string   "first_name"
    t.string   "email"
    t.string   "activation_code"
    t.integer  "invitee_user_id"
    t.integer  "emails_sent",     default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_sessions", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.integer  "country_id"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "time_zone"
    t.integer  "user_group_id"
    t.boolean  "active",                            default: false, null: false
    t.boolean  "blocked",                           default: false, null: false
    t.string   "activation_code"
    t.datetime "activated_at"
    t.integer  "blocked_by"
    t.string   "password_reset_token"
    t.datetime "password_reset_token_requested_at"
    t.datetime "password_reset_at"
    t.string   "crypted_password",                  default: "",    null: false
    t.string   "password_salt",                     default: "",    null: false
    t.string   "perishable_token",                  default: ""
    t.string   "persistence_token"
    t.string   "single_access_token"
    t.integer  "login_count",                       default: 0
    t.integer  "failed_login_count",                default: 0
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.boolean  "allow_email_alerts",                default: false
    t.string   "url_code"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "remaining_invites",                 default: 0
    t.string   "tags"
    t.string   "location"
  end

  create_table "video_uploads", force: true do |t|
    t.integer  "bourbon_article_id"
    t.string   "url"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "video_thumbnail"
  end

end
