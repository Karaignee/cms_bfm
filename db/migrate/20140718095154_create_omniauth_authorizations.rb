class CreateOmniauthAuthorizations < ActiveRecord::Migration
  def change
    create_table :omniauth_authorizations do |t|
      t.string :provider, index: true
      t.string :uid, index: true
      t.string :name
      t.string :first_name
      t.string :last_name
      t.string :email, index: true
      t.string :oauth_token
      t.datetime :oauth_token_expires_at
      t.integer :user_id, index: true

      t.timestamps
    end
  end
end
