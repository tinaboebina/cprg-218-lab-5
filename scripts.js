// Get the container element where the cards will be displayed
const container = document.getElementById('option-2-results');

// Function to fetch data from the API
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

// Function to render movies onto the page
async function renderMovies() {
  try {
    // Fetch movie data from the API
    const movies = await fetchData();
    // Iterate over each movie in the data
    movies.forEach(movie => {
      // Create a card to represent each movie
      const card = document.createElement('li');
      card.setAttribute('class', 'card');

      // Create a div to hold the card content
      const divCardContent = document.createElement('div');
      divCardContent.setAttribute('class', 'card-content');

      // Create a heading element for the movie title
      const h3 = document.createElement('h3');
      h3.setAttribute('class', 'header');
      h3.textContent = movie.title;

      // Create a paragraph element for the movie description
      const p = document.createElement('p');
      p.setAttribute('class', 'description');
      // Shorten the description
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      // Append title and description to the card content div
      divCardContent.appendChild(h3);
      divCardContent.appendChild(p);

      // Append the card content to the card
      card.appendChild(divCardContent);

      // Append the card to the container
      container.appendChild(card);
    });
  } catch (error) {
    // If an error occurs during fetching or rendering, display an error message
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Sorry, it's not working :()`;
    container.appendChild(errorMessage);
  }
}

// Call the function to render movies onto the page
renderMovies();