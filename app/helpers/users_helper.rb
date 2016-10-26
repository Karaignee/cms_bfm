module UsersHelper

  def user_image(user, size: 100, **options)
    image_tag user_image_url(user, size: size), options
  end

  def user_image_url(user, size: 100)
    authorization = user.omniauth_authorizations.most_recent.first

    if authorization && authorization.provider == "facebook"
      facebook_picture_url authorization.uid, size
    else
      user.gravatar_url(size)
    end
  end

  def facebook_picture_url(uid, size)
    "https://graph.facebook.com/#{uid}/picture?height=#{size}&width=#{size}"
  end

end
