import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { fetchSearchResults, removeSearchResults } from '../../../../actions/search_actions';
import { receiveAlbum } from '../../../../actions/album_actions';

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    fetchSearchResults: (query) => dispatch(fetchSearchResults(query)),
    removeSearchResults: () => dispatch(removeSearchResults()),
    receiveAlbum: (album) => dispatch(receiveAlbum(album))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
