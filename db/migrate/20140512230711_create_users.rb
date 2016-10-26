class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name, index: true
      t.string :last_name, index: true
      t.string :email, index: true
      t.integer :country_id
      t.float :latitude, index: true
      t.float :longitude, index: true
      t.string  :time_zone
      t.integer :user_group_id, index: true
      t.boolean :active, default: false, null: false
      t.boolean :blocked, default: false, null: false
      t.string :activation_code, index: true
      t.datetime :activated_at
      t.integer :blocked_by
      t.string :password_reset_token, index: true
      t.datetime :password_reset_token_requested_at
      t.datetime :password_reset_at
      t.string :crypted_password, length: 128, default: '', null: false
      t.string :password_salt, length: 128, default: '', null: false
      t.string :perishable_token, length: 128, default: ''
      t.string :persistence_token
      t.string :single_access_token
      t.integer :login_count, default: 0
      t.integer :failed_login_count, default: 0
      t.datetime :last_request_at
      t.datetime :current_login_at
      t.datetime :last_login_at
      t.string :current_login_ip
      t.string :last_login_ip
      t.boolean :allow_email_alerts, default: false
      t.string :url_code

      t.timestamps
    end
  end
end
