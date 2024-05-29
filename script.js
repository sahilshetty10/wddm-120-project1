// NavBar
// Dark mode toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", toggleDarkMode);
function toggleDarkMode() {
  var element = document.body;
  element.classList.toggle("dark");
}

// window alert on hover
const hoverElement = document.getElementById("hover-element");
hoverElement.addEventListener("mouseover", hoverAlert);
function hoverAlert() {
  alert("You hovered over the button!");
}

// Render items
function renderMovies() {
  document.getElementById("hero-title").innerText = "Featured Movies";
  document.getElementById("trending-title").innerText = "Trending Movies";
  document.getElementById("top-rated-title").innerText = "Top Rated Movies";
  renderFeaturedMovies();
  renderTrendingMovies();
  renderTopRatedMovies();
}

function renderTv() {
  document.getElementById("hero-title").innerText = "Featured TV Shows";
  document.getElementById("trending-title").innerText = "Trending TV Shows";
  document.getElementById("top-rated-title").innerText = "Top Rated TV Shows";
  renderFeaturedTv();
  renderTrendingTv();
  renderTopRatedTv();
}

async function renderFeaturedMovies() {
  const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=1f54bd990f1cdfb230adb312546d765d")
  const data = await response.json();
  const featuredMovies = data.results;
  const featuredMoviesContainer = document.getElementById("hero-container");
  featuredMoviesContainer.innerHTML = "";
  featuredMovies.forEach(movie => {
    const movieElement = document.createElement("img");
    movieElement.classList.add("slide-item");
    movieElement.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    featuredMoviesContainer.appendChild(movieElement);
  })
}

async function renderTrendingMovies() {
  const response = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=1f54bd990f1cdfb230adb312546d765d")
  const data = await response.json();
  const trendingMovies = data.results;
  const trendingMoviesContainer = document.getElementById("trending-container");
  trendingMoviesContainer.innerHTML = "";
  trendingMovies.forEach(movie => {
    let title = movie.title;
    let poster = movie.poster_path;
    let cardElement = createCardElement(title, poster);
    trendingMoviesContainer.appendChild(cardElement);
  })
}
async function renderTopRatedMovies() {
  const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=1f54bd990f1cdfb230adb312546d765d")
  const data = await response.json();
  const topRatedMovies = data.results;
  const topRatedMoviesContainer = document.getElementById("top-rated-container");
  topRatedMoviesContainer.innerHTML = "";
  topRatedMovies.forEach(movie => {
    let title = movie.title;
    let poster = movie.poster_path;
    let cardElement = createCardElement(title, poster);
    topRatedMoviesContainer.appendChild(cardElement);
  })
}
function createCardElement(title, poster) {
  let cardElement = document.createElement("div");
  cardElement.classList.add("card");
  let imgElement = document.createElement("img");
  imgElement.src = `https://image.tmdb.org/t/p/w500${poster}`;
  let titleElement = document.createElement("h3");
  titleElement.innerText = title;
  cardElement.appendChild(imgElement);
  cardElement.appendChild(titleElement);
  return cardElement;
}

renderMovies()
// setInterval(renderFeaturedMovies, 10000)