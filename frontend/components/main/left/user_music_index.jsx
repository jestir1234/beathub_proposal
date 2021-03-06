import React from 'react';
import { Link } from 'react-router';
import merge from 'lodash/merge';


class UserMusicIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {playlists: []};
    this.handleClick = this.handleClick.bind(this);
    this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this);
    this.handleSelectMusic = this.handleSelectMusic.bind(this);
    this.handleBeginRadioPlay = this.handleBeginRadioPlay.bind(this);
    this.handleGoToHomePage = this.handleGoToHomePage.bind(this);
  }

  componentDidMount(){
    if (this.props.currentUser){
      this.props.fetchPlaylists(this.props.currentUser.id);
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.currentUser){
      if (newProps.playlists.playlists.length || newProps.playlists.playlists.length === 0){
        if (this.state.playlists.length !== newProps.playlists.playlists.length || newProps.playlists.status === "updated"){
          this.setState({playlists: newProps.playlists.playlists});
        }
      } else if (newProps.playlists.playlist) {
        if (!this.state.playlists.includes(newProps.playlists.playlist)){
          let copy = merge({}, this.state);
          copy.playlists.push(newProps.playlists.playlist);
          this.setState(copy);
        }
      }
    }
  }

  handleSelectMusic(type){
    return (e) => {
      e.preventDefault();
      this.props.fetchUpdatedUser(this.props.currentUser.id).then((action) => this.props.receivePresentationItem(action.presentationItem, type));
    };
  }

  handleSelectSongs(){
    return (e) => {
      e.preventDefault();
      this.props.fetchUserSongs(this.props.currentUser.id)
      .then((songs) => {
        this.props.receivePresentationItem(songs, "MySongs")
      });
    }
  }

  handleSelectPlaylist(playlist){
    return (e) => {
      e.preventDefault();
      this.props.receivePresentationItem(playlist, "Playlists");
    };
  }

  handleGoToHomePage(e){
    this.props.receivePresentationItem(null, null);
  }

  handleClick(e){
    e.preventDefault();
    let modal = document.getElementById("playlist-form-modal");
    modal.style.display = "inline-block";
  }

  handleBeginRadioPlay(){
    this.props.fetchRadioSongs().then(() => this.props.removeCurrentSong());
  }


  render(){

    let userPlaylists = this.state.playlists ? this.state.playlists.map((playlist, idx) => {
        return(
          <li onClick={this.handleSelectPlaylist(playlist)} className="playlist-item" key={idx}>{playlist.name}</li>
        );
    }) : null;
    return(
      <div className="left-content">

        <div className="left-nav-logo-container">
          <img onClick={this.handleGoToHomePage} src="https://s3.amazonaws.com/beathub-dev/songs/logo.png"/>
        </div>

        <div className="radio-container">
          <p onClick={this.handleBeginRadioPlay}>Radio</p>
        </div>

        <div className="user-music-nav">
          <h1>Your Music</h1>
          <p onClick={this.handleSelectSongs("MySongs")}>Songs</p>
          <p onClick={this.handleSelectMusic("MyArtists")}>Artists</p>
          <p onClick={this.handleSelectMusic("MyFollowedPlaylists")}>Playlists</p>
        </div>

        <div className="user-playlist-index">
          <div className="playlists-container">
            <h3>PLAYLISTS</h3>
            <ul>
              {userPlaylists}
            </ul>
          </div>
        </div>

        <div className="create-playlist-link">
          <div onClick={this.handleClick} className="create-playlist-icon"><div id="cross">+</div></div>
          <Link onClick={this.handleClick}>New Playlist</Link>
        </div>

      </div>
    );
  }
}

export default UserMusicIndex;
