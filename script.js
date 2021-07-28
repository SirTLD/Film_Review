const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b7e8f5b51945e5e96372a885db3436fc&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

const SEARCH_API =
  'https://api.themoviedb.org/3/discover/movie?api_key=b7e8f5b51945e5e96372a885db3436fc&page=1&query=" ';

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
     
      <img src="${IMG_PATH + poster_path}" alt="">
      <div class="movie__info">
          <h3>${title}</h3>
          <i class="rating-color fas fa-thumbs-up"></i>
      </div>
      <div class="movie__overview">
          <h3>Overview</h3>
          ${overview}
      </div>       
      `;

    main.appendChild(movieDiv);
  });
}

// function toggleRate(vote) {
//   vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red';
// }

//FORM INFORMATION

const form = document.getElementById('form');

//SEARCH LOCATION

const searchValue = document.getElementById('search');

form.addEventListener('submit', (submitQuery) => {
  submitQuery.preventDefault();

  const searchInfo = search.value;

  searchValue && searchInfo !== ''
    ? getMovies(SEARCH_API + searchValue)
    : window.location.reload();
});
