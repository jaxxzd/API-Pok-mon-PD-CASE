const tipoCor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
}

// Aramazenado a url da api em uma variável constante

const url = "https://pokeapi.co/api/v2/pokemon/";

// Integração de elementos do HTML com o JS

const card = document.querySelector("#card");
const btn = document.querySelector("#btn-gerar");
const input = document.querySelector("#input-buscar-pokemon");

// Gerando um número aleatório entre 1 e 500
async function pegarIdPokemon() {
    let id = Math.floor(Math.random() * 500) + 1;

    const resp = await fetch(url + id);
    const data = await resp.json();

    gerarCardPokemon(data);
}

// Um evento de clique para pegar o pokemon

btn.addEventListener("click", pegarIdPokemon);

// Serve pra quando a página carregar totalmente, gerar um pokémon aleatório

window.addEventListener("load", pegarIdPokemon);

// Função para gerar o card do pokemon

function gerarCardPokemon(data) {

    // dados do pokemon

    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
    const name = data.name;
    const statusAtaque = data.stats[1].base_stat;
    const statusDefesa = data.stats[2].base_stat;
    const statusVelocidade = data.stats[5].base_stat;

    // Colocando cores no fundo do card com base no tipo do pokémon

    const fundoCor = tipoCor[data.types[0].type.name];

    // Transformando o HTML do card com dados da API de Pokémon

    card.innerHTML = `
        <p class="poke-hp">
            <span>HP</span>
            ${hp}
        </p>

        <img class="poke-img" src="${imgSrc}">

        <h2 class="poke-name">${name}</h2>

        <div class="types">

        </div>

        <div class="status">
            <div>
                <h3>${statusAtaque}</h3>
                <p>Ataque</p>
            </div>

            <div>
                <h3>${statusDefesa}</h3>
                <p>Defesa</p>
            </div>

            <div>
                <h3>${statusVelocidade}</h3>
                <p>Velocidade</p>
            </div>
        </div>
    `;

    // Função chamada pra mostrar os tipos do pokémon

    TypesPokemon(data.types);
};

// função para buscar os tipos do pokémon buscando por cada item no array do "types", criado o elemento "span", colocando o nome do tipo como conteúdo de texto e acrescentando o span na div com classe ".types" pra colocar os tipos do pokémon no card

TypesPokemon = (types) => {
    types.forEach(item => {
        let span = document.createElement("span");
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span);
    });
}

