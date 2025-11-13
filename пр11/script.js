function create_card(character) {
    const container = document.createElement('div');
    const img = document.createElement('img');

}

fetch('https://rickandmortyapi.com/api/character?page=39')
    .then(response => response.json())
    .then(data => {})
    .catch(error => console.error('Ошибка:', error))
