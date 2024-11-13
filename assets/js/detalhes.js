const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('pokemonId');

function fetchPokemonDetails(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            const pokemonDetail = document.getElementById('pokemonDetail');
            const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            const pokemonTypes = pokemon.types.map(t => t.type.name);
            const primaryType = pokemonTypes[0];
            const weight = (pokemon.weight / 10).toFixed(1);
            const height = (pokemon.height / 10).toFixed(1);

            pokemonDetail.innerHTML = `
                <div class="pokemon-type ${primaryType}">
                    <h2>${pokemonName}</h2>
                    <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemonName}">
                    <p><strong>Número:</strong> #${pokemon.id}</p>
                    <p><strong>Tipo:</strong> ${pokemonTypes.join(', ')}</p>
                    <p><strong>Peso:</strong> ${weight} kg</p>
                    <p><strong>Altura:</strong> ${height} m</p>
                </div>
            `;

            pokemonDetail.className = '';
            pokemonDetail.classList.add(primaryType);
        })
        .catch(error => {
            console.error('Erro ao carregar os detalhes:', error);
            document.getElementById('pokemonDetail').innerHTML = '<p>Erro ao carregar detalhes.</p>';
        });
}

if (pokemonId) {
    fetchPokemonDetails(pokemonId);
} else {
    document.getElementById('pokemonDetail').innerHTML = '<p>ID do Pokémon não encontrado.</p>';
}
