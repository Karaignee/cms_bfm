class CreateUserInvites < ActiveRecord::Migration
  def change
    create_table :user_invites do |t|
      t.integer :user_id, index: true
      t.datetime :invited_at, index: true
      t.string :first_name
      t.string :email
      t.string :activation_code
      t.integer :invitee_user_id, index: true
      t.integer :emails_sent, default: 0

      t.timestamps
    end
  end
end
