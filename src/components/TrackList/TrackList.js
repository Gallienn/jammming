import Track from "../Track/Track";
import './TrackList.css';
import { ReactComponent as IconAdd } from './add.svg';
import { ReactComponent as IconRemove } from './remove.svg';



export default function TrackList(props) {
    const handleClick = track => {
        if (props.button === 'add') {
            props.addTrackToPlaylist(track);
        } else {
            props.removeTrackFromPlaylist(track);
        }
    }

    return (
        <ul>
            {(props.tracks || []).map(track => (
                <li key={track.id}>
                    <Track name={track.name} artist={track.artist} album={track.album}/>
                    <button onClick={() => handleClick(track)}>
                        {props.button === 'add' ? 
                        <IconAdd className="icon-add"/> : 
                        <IconRemove />}
                    </button>
                    <hr/>
                </li>
            ))}
        </ul>
    );
}