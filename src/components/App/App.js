import {useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import styles from './App.module.css';

function App() {
  const [results, setResults] = useState([]);

  const getTracks = (tracks) => {
    tracks = tracks.map(({id, name, artists}) => ({
      id,
      name,
      artists
    }));
    setResults(tracks);
    console.log(results);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Jammm<span className={styles.letters}>ing</span></h1>
      <div className={styles.background}>
        <SearchBar getTracks={getTracks} />
        <div className={styles.container2}>
          <SearchResults results={results}/>
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;