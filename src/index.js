const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const  API = 'https://rickandmortyapi.com/api/character/';
let  miStorage = window.localStorage;
miStorage.setItem('next_fetch',API)

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      apis = response
      console.log(apis)
      if (response.info.next === "") {
        miStorage.setItem('next_fetch',API)
      } else{
        miStorage.setItem('next_fetch',response.info.next)  
        miStorage.setItem('pages',response.info.pages)
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
    getData(miStorage.getItem('next_fetch'));    
  } catch (error) {
    console.log(`Error en la API: ${error}`)
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