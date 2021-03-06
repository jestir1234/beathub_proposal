Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, default: {format: :json} do
    resources :users, only: [:create, :index, :show] do
      resources :playlists, only: [:create, :index]
    end
    resource :session, only: [:create, :destroy]
    resources :albums, only: [:show, :index] do
      resources :songs, only: [:index]
    end
    resources :songs, only: [:show]
    resources :artists, only: [:show] do
      resources :albums, only: [:index]
    end
    get '/search' => 'searches#search', as: 'search'
    resources :radio, only: [:index, :show]
    get '/user-songs/:id' => 'users#songs', as: 'songs'
    resources :playlists, only: [:show, :update, :destroy]
    resources :playlist_songs, only: [:create, :destroy]
    resources :follows, only: [:create, :destroy, :index]
    get '/follows/artists/:id/:user_id' => 'follows#follows_artist', as: 'follows_artist'
    resources :genres, only: [:index]
    get '/genres/:category' => 'genres#category', as: 'category'
    get '/users/:id/followed_albums' => 'users#followed_albums', as: 'followed_albums'
    get '/users/:id/followed_artists' => 'users#followed_artists', as: 'followed_artists'
  end
end
