Rails.application.routes.draw do


  resources :gear_categories

  resources :gear_pages

  resources :brands

  resources :artists

  resources :genres

  resources :video_uploads, :path => 'videos'

  # omniauth routes
  get 'auth/:provider/callback', to: 'oauth_sessions#create',
        as: :oauth_sign_in
  get 'auth/failure', to: 'user_sessions#new',
        as: :oauth_fail
  get 'oauth_sessions/create'
  get 'oauth_sessions/omniauth_failure'
  get 'oauth_sessions/email_exists'
  resources :oauth_sessions, only: [:edit, :update]
  # previous oauth routes
  #   get 'auth/:provider/callback', to: 'sessions#create'
  #   get 'auth/failure', to: redirect('/')
  #   get 'signout', to: 'sessions#destroy', as: 'signout'

  # static pages controller - welcome
  get 'welcome/landing'
  get 'welcome/normal_user'
  get 'dashboard', to: 'welcome#contributor', as: :welcome_contributor
  get 'curator', to: 'welcome#curator', as: :welcome_curator
  get 'admin', to: 'welcome#admin', as: :welcome_admin
  get 'privacy', to: 'welcome#privacy', as: :welcome_privacy
  get 'welcome/people', to: 'welcome#people', as: :welcome_people
  post '/search', to: 'welcome#search', as: :search_request
  get '/tag_search/:search_for_tag', to: 'welcome#tag_search', as: :tag_search
  get 'welcome/collections', to: 'welcome#collections', as: :welcome_collections

  # user authentication special routes
  get 'login', to: 'user_sessions#new'
  get 'log_in', to: 'user_sessions#new'
  get 'signin', to: 'user_sessions#new'
  get 'sign_in', to: 'user_sessions#new', as: :sign_in
  get 'logout', to: 'user_sessions#destroy', as: :logout
  get 'account', to: 'users#show', as: :account
  get 'my_account', to: 'users#show', as: :my_account
  get 'signup', to: 'users#new', as: :signup
  get 'sign_up', to: 'users#new', as: :sign_up
  get 'register', to: 'users#new', as: :register
  get 'activate/:code', to: 'users#activate', as: :activate
  put 'change_password', to: 'users#change_password', as: :change_password
  get 'people/:url_code', to: 'users#profile', as: :profile

  namespace :api do
    post 'email_yoke', to: 'email_yoke#create'
  end

  resources :stories, controller: 'bourbon_articles'
  #resources :bourbon_articles
  resources :countries
  resources :media_uploads
  get 'password_resets/token/:id', to: 'password_resets#edit'
  resources :password_resets, only: [:new, :edit, :create, :update]
  resources :pre_registrations
  resources :profile_questions
  resources :profile_question_answers, only: [:create, :update, :destroy]
  resources :profile_question_categories
  resources :users
  resources :user_content_links, only: [:create, :destroy]
  resources :user_invites
  get '/user_invite/activate/:code', to: 'user_invites#activate', as: :user_invite_activate
  get '/user_invite/re_send/:code', to: 'user_invites#re_send', as: :user_invite_re_send
  resources :user_groups
  resources :user_sessions, only: [:new, :create, :destroy]

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#landing'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
