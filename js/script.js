const container = document.getElementById('container')
const searchButton = document.getElementById('search')
const loadMore = document.getElementById('load-more')
const countCharacters = 100

const fetchCharacters = async () => {
    for (let i = 1; i <= countCharacters; i ++) {
        await getCharacters(i)
    }
}

const API = 'https://rickandmortyapi.com/api'

const defaultFilters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1
}

async function getCharacters({name, species, gender, status, page = 1}) {
    const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);
    const characters = await response.json()
    console.log(characters)
    return characters.results
}

async function handleLoadMore() {
    defaultFilters.page += 1
    const characters = await getCharacters(defaultFilters)
    render({characters})
}

async function render({characters}) {
    characters.forEach((character) => {

        return container.innerHTML += `
        <div class="cards">
            <div class="character-img">
                <img src="${character.image}" alt="">
            </div>
            <div class="info">
                <div class="name">
                    <h1>${character.name}</h1>
                    <span class="status"><span class="status-alive">•</span> ${character.status} - Espécie: ${character.species} </span>
                </div>
                <div class="local">
                    <h2>Última localização conhecida:</h2>
                    <span class="encontrado">${character.location.name}</span>
                </div>
                <div class="first-time-seen">
                    <h3>Dimensão:</h3>
                    <span class="encontrado">${character.origin.name}</span>
                </div>
            </div>
        </div>
        `
    })
}

function addListeners() {
    searchButton.addEventListener('keyup', async (event) => {
        defaultFilters.name = event.target.value
        container.innerHTML = ''
        const characters = await getCharacters(defaultFilters)
        render({characters})
    })

    loadMore.addEventListener('click', handleLoadMore)
}

function menuShow() {
    const MenuMobile = document.querySelector('.mobile-menu')
    if (MenuMobile.classList.contains('open')) {
        MenuMobile.classList.remove('open')
    } else {
        MenuMobile.classList.add('open')
    }
}



async function main() {
    const characters = await getCharacters(defaultFilters)
    addListeners()
    render({characters})
}

main()





































// const getCharacters = async (id) => {
//     const url = `https://rickandmortyapi.com/api/character/${id}`;
//     const resp = await fetch(url);
//     const data = await resp.json();
//     console.log(data)
//     buildCard(data)
// }

// getCharacters()

// function buildCard (character) {

//     const card = document.createElement('div');
//     card.classList = 'cards';

//     const id = character.id;
//     const name = character.name;
//     const status = character.status;
//     const species = character.species;
//     const local = character.location.name;
//     const origin = character.origin.name;

//     console.log(origin)

//     const build = `
//         <div class="character-img">
//             <img src="https://rickandmortyapi.com/api/character/avatar/${id}.jpeg" alt="">
//         </div>
//         <div class="info">
//             <div class="name">
//                 <h1>${name}</h1>
//                 <span class="status"><span class="status-alive">•</span> ${status} - Espécie: ${species}</span>
//             </div>
//             <div class="local">
//                 <h2>Última localização conhecida:</h2>
//                 <span class="encontrado">${local}</span>
//             </div>
//             <div class="first-time-seen">
//                 <h3>Dimensão</h3>
//                 <span class="encontrado">${origin}</span>
//             </div>
//         </div>
//         `;

//         card.innerHTML = build;
//         container.appendChild(card)
// }

// buildCard()
