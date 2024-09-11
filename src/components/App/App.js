import {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import { getAuthorizationCode, createPlaylist, search } from '../../util/Spotify';

function App() {
  // AuthorizationCode Logic
  const [authCode, setAuthCode] = useState('');
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (code) {
      setAuthCode(code);
    }
  }, []);

  // Search Logic
  const [searchResults, setSearchResults] = useState([]);
  const getTracks = async (query) => {
    console.log('Argument successfully passed to getTracks()');
    console.log('Argument is: ' + query);
    const tracks = await search(query, authCode);
    setSearchResults(tracks);
  }

  // Playlist Logic
  const [playlist, setPlaylist] = useState([]);
  const addTrackToPlaylist = (trackToAdd) => {
    setPlaylist(prev => [...prev, trackToAdd]);
  }
  const removeTrackFromPlaylist = (trackToRemove) => {
    setPlaylist(prev => prev.filter(({id}) => id !== trackToRemove.id));
  }

  // Creating the Playlist
  const newPlaylist = (playlistTitle) => {
    console.log('Argument successfully passed to getTracks()');
    console.log('Argument is: ' + playlistTitle);
    createPlaylist(playlistTitle, authCode);
  }

  return (
    <div className='main-container'>
      <h1 className='title'>Jammm<span className='letters'>ing</span></h1>
      <div className='background'>
        <SearchBar getTracks={getTracks} />
        <div className='container2'>
          <SearchResults searchResults={searchResults} addTrackToPlaylist={addTrackToPlaylist}/>
          <Playlist playlist={playlist} removeTrackFromPlaylist={removeTrackFromPlaylist} newPlaylist={newPlaylist}/>
        </div>
      </div>
    </div>
  );
}

export default App;