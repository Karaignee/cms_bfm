class CreateUserSocialNetworkConnections < ActiveRecord::Migration
  def change
    create_table :user_social_network_connections do |t|
      t.integer :user_id, index: true
      t.string :social_network_name, index: true
      t.string :user_guid, index: true
      t.string :email_address, index: true
      t.string :current_token
      t.datetime :current_token_expires_at

      t.timestamps
    end
  end
end
