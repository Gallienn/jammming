import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

export default function SearchResults(props) {
    return (
        <div className="container">
            <p className="container-title">results</p>
            <TrackList 
                tracks={props.searchResults} 
                button="add" 
                addTrackToPlaylist={props.addTrackToPlaylist}
            />
        </div>
    );
}