json.array!(@album.songs) do |song|
  json.id song.id
  json.name song.name
  json.album song.album
  json.album_id song.album_id
  json.genre song.genre
  json.artist song.album.artist
  json.album_ord song.album_ord
  json.duration song.duration
  json.audio_url asset_path(song.audio_url)
  json.image_url song.album.image_url
end
