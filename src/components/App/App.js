import {useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../util/Spotify';

function App() {

  // Search Logic
  const [searchResults, setSearchResults] = useState([]);
  const getTracks = async (query) => {
    console.log(`Function getTracks() starting...`);
    console.log(`Argument is: ${query}\n`);
    const tracks = await Spotify.search(query);
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

  // Saving the Playlist
  const newPlaylist = (playlistTitle) => {
    console.log(`Function newPlaylist() starting...`);
    console.log(`Argument are: ${playlistTitle} and ${playlist}\n`);
    Spotify.savePlaylist(playlistTitle, playlist);
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