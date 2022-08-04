const parentDiv = document.getElementById('joke-wrapper')
const favJoke = document.getElementById('favorites-joke-wrapper')
const jokeApi = fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart&amount=10')
const counter = document.getElementById('counter')
const alphabetized = document.querySelector('#a-z')
const reversedAlphabetized = document.querySelector('#z-a')
const favAlphabetized = document.querySelector('#fav-a-z')
const favReversedAlphabetized = document.querySelector('#fav-z-a')
const jokesArray = [];
const favorites = [];
const total = [];

jokeApi
.then((response) => {
  return response.json();
})
.then((data) => {
  let jokes = data
 jokesArray.push(jokes)
})
.then (() => {
  const [data] = jokesArray
  createJokeCards(data.jokes)
})
.then(() => {
  [data] = jokesArray
  count(data.jokes)
})
.then(() => {
  countJoin(total)
});

const count = (jokeItems) => {
  let pro = 0;
  let pun = 0;
  let misc = 0;
  jokeItems.map(({category}) => {
    if (category == 'Programming') {     
      pro++   
    }
    else if (category == 'Pun') {
      pun++
    }else if (category == 'Misc') {
      misc++
    }
  })
total.push({pro, pun, misc}) 
};

const countJoin = (categories) => {
  const cards = categories.map(({pro, pun, misc}) => {

    return (`
      <p>There are ${pro} programming jokes, ${pun} pun jokes, ${misc} misc jokes </P> 
    `)
  }).join('')
  counter.innerHTML = cards   
};

const createJokeCards = (jokeItems) => {
  const cards = jokeItems.map(({category, setup, delivery, id}) => {
  
    return (`
    <div " class="joke-card">
      <p>${setup}</p>
      <p>${delivery}</p>
      <p>${category}</p>
      <div class="joke-card-div">
        <button id="${id}" onclick="moveToFavorites(id)" class="favorites-btn">Add to Favorites</button>
      </div>
    </div>`)

  }).join('')
  parentDiv.innerHTML = cards
};

const createFavJokeCards = (jokeItems) => {
  const cards = jokeItems.map(({category, setup, delivery, id}) => {
  
    return (`
    <div " class="joke-card">
      <p>${setup}</p>
      <p>${delivery}</p>
      <p>${category}</p>
      <div>
        <button id="${id}" onclick="removeFromFavorites(id)" class="favorites-btn">Remove From Favorites</button>
      </div>
    </div>`)

  }).join('')
  favJoke.innerHTML = cards
}; 

const moveToFavorites = (jokeId) => {
  let [data] = jokesArray;
  let Id = jokeId;
  let jokeIndex = data.jokes.findIndex(item => item.id == Id)
  let favJoke = data.jokes.splice(jokeIndex, 1);
  favorites.push(...favJoke);
  createJokeCards(data.jokes)
  createFavJokeCards(favorites) 
};

const removeFromFavorites = (jokeId) => {
  let favData = favorites;
  let [data] = jokesArray
  let Id = jokeId;
  let jokeIndex = favData.findIndex(item => item.id == Id)
  let favJoke = favData.splice(jokeIndex, 1);
  data.jokes.push(...favJoke);
  createJokeCards(data.jokes)
  createFavJokeCards(favorites)
};

alphabetized.addEventListener('click', () => {
  [data] = jokesArray
  data.jokes.sort((a, b) => a.setup.toLowerCase().localeCompare(b.setup.toLowerCase()))
  createJokeCards(data.jokes)
});

reversedAlphabetized.addEventListener('click', () => {
  [data] = jokesArray
  data.jokes.sort((a, b) => b.setup.toLowerCase().localeCompare(a.setup.toLowerCase()))
  createJokeCards(data.jokes)
});

favAlphabetized.addEventListener('click', () => {
  favorites.sort((a, b) => a.setup.toLowerCase().localeCompare(b.setup.toLowerCase()))
  createFavJokeCards(favorites)
});

favReversedAlphabetized.addEventListener('click', () => {
  favorites.sort((a, b) => b.setup.toLowerCase().localeCompare(a.setup.toLowerCase()))
  createFavJokeCards(favorites)
});
