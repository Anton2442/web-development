import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function CharacterList() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character/?page=19')
            .then(response => setCharacters(response.data.results))
            .catch(error => console.error("Ошибка:", error));
    }, []);

    return (
        <div className="character-list">
            {characters.map(character => (
                <Link key={character.id} to={`/character/${character.id}`}>
                    <div className="card">
                        <img src={character.image}></img>
                        <div className="info">
                            <p>{character.name}</p>
                            <p>{character.species}</p>
                            <p>{character.status}</p>
                            <p>{character.location.name}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}