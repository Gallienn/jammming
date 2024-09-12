import { useState } from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

export default function Playlist(props) {
    // Playlist Title Logic
    const [playlistTitle, setPlaylistTitle] = useState('');
    const handleChange = ({target}) => {
        setPlaylistTitle(target.value);
    }

    // Create Playlist
    const handleClick = () => {
        props.newPlaylist(playlistTitle);
    }

    return (
        <div className="container">
            <div className="container-2">
                <input 
                    type="text"
                    name="playlist-title"
                    value={playlistTitle}
                    onChange={handleChange}
                    placeholder="Enter a title"/>
                <p className="container-title">playlist</p>
            </div>
            <TrackList 
                tracks={props.playlist} 
                button="remove" 
                removeTrackFromPlaylist={props.removeTrackFromPlaylist}
            />
            <button 
                className='spotify-button'
                onClick={handleClick}
            >
                Save to Spotify
            </button>
        </div>
    );
}