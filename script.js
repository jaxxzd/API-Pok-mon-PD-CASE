const tipoCor = {
    bug: "#A8B820",
    dragon: "#7038F8",
    electric: "#F8D030",
    fairy: "#EE99AC",
    fighting: "#C03028",
    fire: "#F08030",
    flying: "#A890F0",
    grass: "#78C850",
    ground: "#E0C068",
    ghost: "#705898",
    ice: "#98D8D8",
    normal: "#A8A878",
    poison: "#A040A0",
    psychic: "#F85888",
    rock: "#B8A038",
    water: "#6890F0",
    dark: "#705848",
    steel: "#B8B8D0",
};

// Ícones oficiais estilo Pokédex (SVG minimalista)
const tipoIcone = {
    fire: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fire.svg",
    water: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/water.svg",
    grass: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/grass.svg",
    bug: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/bug.svg",
    dragon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dragon.svg",
    electric: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/electric.svg",
    fairy: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fairy.svg",
    fighting: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fighting.svg",
    flying: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/flying.svg",
    ghost: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ghost.svg",
    ground: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ground.svg",
    ice: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ice.svg",
    normal: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/normal.svg",
    poison: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/poison.svg",
    psychic: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/psychic.svg",
    rock: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/rock.svg",
    steel: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/steel.svg",
    dark: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dark.svg"

};

// EXEMPLO — depois você liga ao seu código da API
function pokedexIcon(tipos) {
    const container = document.getElementById("tipo-container");
    container.innerHTML = ""; // limpa

    tipos.forEach(tipo => {
        const span = document.createElement("span");
        span.className = "badge-tipo";
        span.style.background = tipoCor[tipo];

        span.innerHTML = `
            <img src="${tipoIcone[tipo]}" alt="${tipo}">
            ${tipo}
        `;

        container.appendChild(span);
    });
}

// Aramazenado a url da api em uma variável constante

const url = "https://pokeapi.co/api/v2/pokemon/";

// Integração de elementos do HTML com o JS

// card onde se encontra as informações do Pokémon

const card = document.querySelector("#card");

// botão para gerar um pokémon aleatório, utilizando a função "addEventListener" para executar uma função ao clicar e "pegarIdPokemon" para receceber um número aleatório do id do pokémon, depois, pega a resposta da requisição com a espera da API "fetch" com a soma da url da PokéAPI com o número aleatório chamado "id", então a variável constante "data" espera a converção da resposta da requisição para json e por fim gera o card

const btnGerar = document.querySelector(".btn-gerar");

// input de busca por nome do pokémon ou id

const input = document.querySelector("#input-buscar-pokemon");

// botão para buscar o pokémon por nome ou id através de um adição de evento

const btnBuscar = document.querySelector(".btn-buscar");

// Gerando um número aleatório entre 1 e 500

async function pegarIdPokemon() {
    let id = Math.floor(Math.random() * 1000) + 1;

    // definindo para a variável "resp" a espera com o fetch somado à url + id, para processar a requisição e id.

    const resp = await fetch(url + id);

    // na variável "data" temos a resposta da requisição que está sendo convertida em JSON

    const data = await resp.json();

    card.style.width = `100%`;

    // Chamando a função "gerarCardPokemon" com os dados do "data" para servir como valor para o parâmetro da função e gerar as características do pokémon.

    gerarCardPokemon(data);
}

//  Botão para executar a ação de busca por um pokémon por nome ou id

input.value = "";

btnBuscar.addEventListener("click", () => {
    const value = input.value.toLowerCase().trim();
    buscarPokemon(value)
})

// Um evento de clique para gerar o card do pokemon

btnGerar.addEventListener("click", pegarIdPokemon);

// Serve pra quando a página carregar totalmente, gerar um pokémon aleatório

window.addEventListener("load", pegarIdPokemon);

// Função para gerar o card do pokemon

function gerarCardPokemon(data) {

    // dados do pokemon, pegos do valor "data" que foi atribuído como parãmetro para a função "gerarCardPokemon"

    const id = data.id
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.versions["generation-v"]["black-white"].animated.front_default || data.sprites.front_default || data.sprites?.other?.["official-artwork"]?.front_default || "";
    const name = data.name;
    const statusAtaque = data.stats[1].base_stat;
    const statusDefesa = data.stats[2].base_stat;
    const statusVelocidade = data.stats[5].base_stat;

    //  cor do card com base no tipo do pokémon, pegando o objeto com as cores "TipoCor" e pegando o array "types" no json da API com o parâmetro "data", pegando o primeiro tipo do pokémon com "[0]", presente no json da API, para definir a cor do círculo do card e por fim pegando o nome do tipo com "type.name"

    const fundoCor = tipoCor[data.types[0].type.name];

    // Criando o card com as informações do pokémon dinamicamente com JavaScript para colocar no HTML

    card.innerHTML = `
        <div class="header-dados">
            <p class="poke-id">
                <span>#</span>
                ${String(id).padStart(4, "0")}
            </p>

            <p class="poke-hp">
                <span>HP</span>
                ${hp}
            </p>
        </div>

        <img class="poke-img" src="${imgSrc}">

        <h2 class="poke-name">${name}</h2>

        <div class="pokedex-icon" id="tipo-container"></div>

        <div class="status">
            <div>
                <h3 class="ataque">${statusAtaque}</h3>
                <p>Ataque</p>
            </div>

            <div>
                <h3 class="defesa">${statusDefesa}</h3>
                <p>Defesa</p>
            </div>

            <div>
                <h3 class="velocidade">${statusVelocidade}</h3>
                <p>Velocidade</p>
            </div>
        </div>
    `;

    // Função chamada para mudar a cor do card e dos tipos do pokémon

    corCard(fundoCor)

    pokedexIcon(data.types.map(t => t.type.name));
};

// função corCard com parâmetro "cor", que faz a alteração do CSS com JavaScript, definindo um círculo central no topo do card, usando o parâmetro "cor" para receber da variável "fundoCor" a cor do fundo do card, então o card pega os elementos ".types" e "span", esse comando pega todos os spans que selecionam os tipos do pokémon e por fim, o "forEach" com o parâmetro "TipoCor" percorre todos os spans e coloca o background color do tipo do pokémon

let corCard = cor => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${cor} 45%, #eeededde 0%)`
    card.querySelectorAll(".types span").forEach((TipoCor) => {
        TipoCor.style.backgroundColor = cor;
    })
}



async function buscarPokemon(value) {

    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);

        if (!resp.ok) {
            card.style.background = `#eeededde 0%`;

            card.innerHTML =
                `<div id="erro-content">
                    <img src="img/erro.png" class="erro-img">
                    <p class="no-found-pokemon"> Pokémon não identificado ⛌
                </div>`;

            input.value = "";
            return
        }

        const data = await resp.json();
        gerarCardPokemon(data);

        input.value = "";
    }


    catch (error) {

        card.style.background = `#eeededde 0%`;

        card.style.width = `250px`;

        card.innerHTML =
            `<div id="erro-content">
                <img src="img/erro.png" class="erro-img">
                <p class="no-found-pokemon"> Não encontrado :(
                </div>`;

        input.value = "";

    }

}



