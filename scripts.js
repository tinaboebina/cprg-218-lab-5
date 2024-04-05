const filmContainer = document.getElementById('film-cards');

// Get movie data from API //
async function fetchData() {
  try {
    const response = await fetch('https://ghibli.rest/films');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Create movie card in this format //
async function renderMovies() {
  try {
    const movies = await fetchData();
    movies.forEach(movie => {
      const card = `
        <li class="card" data-title="${movie.title.toLowerCase()}">
          <div class="card-content">
            <h3 class="header">${movie.title}</h3><br>
            <h5 class="subheader">
              Running Time: ${movie.running_time} minutes <br>
              Rotten Tomatoes Score: ${movie.rt_score}
            </h5>
            <p class="card-text">${movie.description}</p>
          </div>
        </li>
      `;
      filmContainer.insertAdjacentHTML('beforeend', card);
    });
  } catch (error) {
    const errorMessage = `<marquee>Sorry, it's not working :(</marquee>`;
    filmContainer.insertAdjacentHTML('beforeend', errorMessage);
  }
}

// OPTION 2 ENHANCED - Search Bar //
function searchMovies(input) {
  const cards = filmContainer.querySelectorAll('.card');
  cards.forEach(card => {
    const title = card.dataset.title;
    if (title.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function searchbarEventHandler() {
  let input = document.getElementById("searchbar").value.toLowerCase();
  searchMovies(input);
}

// Card will populate during user input //
const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchbarEventHandler);

renderMovies();
