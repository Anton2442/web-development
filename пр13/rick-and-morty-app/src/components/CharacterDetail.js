import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../CharacterDetail.css'


export default function CharacterDetail() {
    const { id } = useParams();
    const [character, setCharacter] = useState();

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => setCharacter(response.data))
            .catch(error => console.error("Ошибка:", error));
    }, [id]);

    console.log(character);

    if (!character) return <h1>Загрузка...</h1>;

    return (
        <div className="detail">
            {/* <div className="info"> */}
                <img src={character.image}></img>
                <div>
                    <p className='label'>Name</p>
                    <p>{character.name}</p>
                </div>
                <div>
                    <p className='label'>Species</p>
                    <p>{character.species}</p>
                </div>
                <div>
                    <p className='label'>Status</p>
                    <p>{character.status}</p>
                </div>
                <div>
                    <p className='label'>Location</p>
                    <p>{character.location.name}</p>
                </div>
            {/* </div> */}
        </div>
    );
}