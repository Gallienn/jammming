import {useState} from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar ({getTracks}) {
    const [value, setValue] = useState('');

    const handleChange = ({target}) => {
        setValue(target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get('query');
        getTracks(query);
    }

    return (
        <div>
            <form 
                className={styles.form}
                onSubmit={handleSubmit}>
                <input 
                    className={styles.input} 
                    type="text" 
                    name="query" 
                    value={value}
                    onChange={handleChange}
                />
                <button 
                    className={styles.button} 
                    type="submit">
                    Search
                </button>
            </form>
        </div>
    );
}