export default function TrackList({results}) {
    return (
        <ul>
            {results.map(({name, id, artists}) => {
                <li id={id}>{name} - by - {artists[0]}</li>
            })}
        </ul>
    );
}