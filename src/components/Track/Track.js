import './Track.css';

export default function Track(props) {
    return (
        <div>  
            <h3>{props.name}</h3>
            <p><span>by</span> {props.artist} | <span>in</span> {props.album}</p>
        </div>
    );
}