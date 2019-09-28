const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const  API = 'https://rickandmortyapi.com/api/character/';
sessionStorage.setItem('next_fetch',API);
let paginas = 0;

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      if (response.info.next === "" ) {
        sessionStorage.setItem('next_fetch',API);
        intersectionObserver.disconnect();
        alert("Ya no hay más personajes") ;       
      } else{
        sessionStorage.setItem('next_fetch',response.info.next);
      }
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

async function loadData()  {
  try {
    await getData(sessionStorage.getItem('next_fetch'));
  } catch (error) {
    console.log(`Error de comunicacón con la API: ${error}`)
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);