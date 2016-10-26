json.array!(@user_invites) do |user_invite|
  json.extract! user_invite, :id, :user_id, :invited_at, :first_name, :email, :invitee_user_id, :emails_sent
  json.url user_invite_url(user_invite, format: :json)
end
