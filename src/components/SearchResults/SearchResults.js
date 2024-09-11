import styles from './SearchResults.module.css';

export default function SearchResults({results}) {
    return (
        <div className={styles.container}>
            <p className={styles.title}>results</p>
            <ul>
            {results.map(({name, id, artists}) => (
                <li key={id}>{name} - by - {artists.map(artist => artist.name).join(', ')}</li>
            ))}
            </ul>
        </div>
    );
}