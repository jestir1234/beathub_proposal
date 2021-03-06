class Api::PlaylistsController < ApplicationController

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.author = current_user ? current_user : User.find(param[:user_id])
    @playlist.image_url = 'https://x.myspacecdn.com/new/common/images/ilike-logo-square_512.png'

    if @playlist.save
      render 'api/playlists/show'
    else
      render json: @playlist.errors.full_messages, status: 422
    end
  end

  def index
    user = User.includes(:playlists).find(params[:user_id])
    @playlists = user.playlists
    render 'api/playlists/index'
  end

  def destroy
    @playlist = Playlist.find(params[:id])

    if @playlist.destroy
      render 'api/playlists/show'
    else
      render json: @playlist.errors.full_messages
    end
  end

  def update

    @playlist = Playlist.find(params[:id])

    if @playlist.update(playlist_params)
      render 'api/playlists/show'
    else
      render json: @playlist.errors.full_messages
    end
  end

  def show
    @playlist = Playlist.includes(:songs).find(params[:id]);

    render 'api/playlists/playlist_songs'
  end

  private

  def playlist_params
    params.require(:playlist).permit(:name, :description, :image_url)
  end
end
