async function FetchApiPokemon() {
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await resp.json();
    const { results } = data;

    const payLoadPokemon = await Promise.all(
        results.map(async pokemon => {
            const { id, types, abilities, hidden_abilities } = await getMoreInfo(pokemon.url);

            return {
                name: pokemon.name,
                types,
                id,
                abilities,
                hidden_abilities
            }
        })
    )

    console.dir(payLoadPokemon, { depth: null, maxArrayLength: null });
}

FetchApiPokemon();

async function getMoreInfo(url) {
    const resp = await fetch(url);
    const data = await resp.json();

    return {
        id: data.id,

        types: data.types.map(t => t.type.name),

        abilities: data.abilities.
            filter(a => !a.is_hidden)
            .map(a => a.ability.name),

        hidden_abilities: data.abilities.
            filter(a => a.is_hidden)
            .map(a => a.ability.name)
    }
}