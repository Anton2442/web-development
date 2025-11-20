function create_card(character) {
    const card = document.createElement('div');
    const info = document.createElement('div');
    const img = document.createElement('img');
    const name = document.createElement('p');
    const status = document.createElement('p');
    const location = document.createElement('p');
    const species = document.createElement('p');
    
    img.src = character.image;
    name.textContent = character.name;
    status.textContent = character.status;
    location.textContent = character.location.name;
    species.textContent = character.species;

    card.classList.add('card');
    info.classList.add('info');

    card.appendChild(img);
    card.appendChild(info);
    info.appendChild(name);
    info.appendChild(species);
    info.appendChild(status);
    info.appendChild(location);

    return card;
}

fetch('https://rickandmortyapi.com/api/character?page=17')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const container = document.getElementById('characters-container');
        data.results.forEach(character => {
           container.appendChild(create_card(character)); 
        });
        // container.appendChild(create_card(data.results[1])); 
    })
    .catch(error => console.error('Ошибка:', error))
