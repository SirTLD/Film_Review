const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b7e8f5b51945e5e96372a885db3436fc&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=b7e8f5b51945e5e96372a885db3436fc&query=';

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showResults(data.results);
}

//TARGETING THE MAIN SECTION

const main = document.getElementById('main');

function showResults(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    movieDiv.innerHTML = `           
     
      <img src="${defaultImage(poster_path)}" alt="">
      <div class="movie__info">
          <h3>${title}</h3>
          
          <i class="rating-color ${ratingColor(
            vote_average
          )} fas fa-thumbs-${toggleRate(vote_average)}"></i>
               
      </div>
      <div class="movie__overview">
          <h3>Overview</h3>
          ${overview}
      </div>       
      `;

    main.appendChild(movieDiv);
  });
}

//SOLVE MISSING IMAGE ISSUE

function defaultImage(posterPath) {
  if (posterPath == null) {
    return 'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
  } else {
    return IMG_PATH + posterPath;
  }
}

function toggleRate(vote) {
  if (vote >= 8) {
    return 'up';
  }
  if (vote >= 5) {
    return 'up';
  } else {
    return 'down';
  }
}

function ratingColor(voteTally) {
  if (voteTally >= 8) {
    return 'green';
  }
  if (voteTally >= 5) {
    return 'orange';
  }
  if (voteTally < 5) {
    return 'red';
  }
}

//GETTING FORM QUERYS

let formElement = document.getElementById('search');

formElement.addEventListener('submit', (e) => {
  e.preventDefault();

  let search = document.querySelector('.search-field');

  let searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});
