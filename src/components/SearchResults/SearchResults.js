import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

export default function SearchResults(props) {
    return (
        <div className="container">
            <p className="container-title">results</p>
            <Tracklist 
                tracks={props.searchResults} 
                button="add" 
                addTrackToPlaylist={props.addTrackToPlaylist}
            />
        </div>
    );
}