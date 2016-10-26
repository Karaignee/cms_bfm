class AddExtraStuffToSupportInvites < ActiveRecord::Migration

  def up
    add_column :user_groups, :limit_user_invites_for_this_group, :boolean, default: true
    add_column :user_groups, :invites_limit_per_user, :integer, default: 0

    puts; print 'Updating user groups '
    UserGroup.all.each do |ug|
      ug.limit_user_invites_for_this_group = !ug.is_admin
      ug.invites_limit_per_user = 3 if ug.limit_user_invites_for_this_group
      ug.save!
      print ug.invites_limit_per_user
    end
    puts ' DONE'

    add_column :users, :remaining_invites, :integer, default: 0

    User.reset_column_information

    puts; print 'Updating users '
    User.all.each do |u|
      u.remaining_invites = u.user_group.invites_limit_per_user
      u.save!
      print u.remaining_invites
    end
    puts ' DONE'
  end

  def down
    remove_column :users, :remaining_invites
    remove_column :user_groups, :limit_user_invites_for_this_group
    remove_column :user_groups, :invites_limit_per_user
  end

end
