# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_11_25_112614) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "consultation_definitions", force: :cascade do |t|
    t.string "title"
    t.integer "duration"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "consultant_id", null: false
    t.index ["consultant_id"], name: "index_consultation_definitions_on_consultant_id"
  end

  create_table "consultations", force: :cascade do |t|
    t.bigint "consultation_definition_id", null: false
    t.datetime "appointment_time"
    t.bigint "user_id", null: false
    t.bigint "consultant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "issue"
    t.index ["consultant_id"], name: "index_consultations_on_consultant_id"
    t.index ["consultation_definition_id"], name: "index_consultations_on_consultation_definition_id"
    t.index ["user_id"], name: "index_consultations_on_user_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.bigint "consultant_id", null: false
    t.time "start_time", null: false
    t.time "end_time", null: false
    t.integer "day", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["consultant_id"], name: "index_schedules_on_consultant_id"
  end

  create_table "users", force: :cascade do |t|
    t.integer "role", default: 0
    t.string "name"
    t.string "surname"
    t.integer "age", default: 0
    t.string "city"
    t.string "specialisation"
    t.string "education"
    t.string "experience"
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "ratings"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "consultation_definitions", "users", column: "consultant_id"
  add_foreign_key "consultations", "consultation_definitions"
  add_foreign_key "consultations", "users"
  add_foreign_key "consultations", "users", column: "consultant_id"
  add_foreign_key "schedules", "users", column: "consultant_id"
end
