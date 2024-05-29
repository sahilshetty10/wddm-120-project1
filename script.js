// TMDB API key
const api_key = "1f54bd990f1cdfb230adb312546d765d";

// Variables to hold fetched data to optimize performance and avoid refetching and unnecessary API calls
let featuredMovies = [];
let trendingMovies = [];
let topRatedMovies = [];
let featuredTvShows = [];
let trendingTvShows = [];
let topRatedTvShows = [];

// Dark mode toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-color-scheme");
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-color-scheme", "dark");
    darkModeToggle.innerText = "Switch to Light Mode";
  } else {
    document.documentElement.setAttribute("data-color-scheme", "light");
    darkModeToggle.innerText = "Switch to Dark Mode";
  }
});

// Window alert on hover
document.getElementById("hover-element").addEventListener("mouseover", () => {
  alert("You hovered over the button!");
});

// Fetch data for movies and TV shows
async function fetchData() {
  // Fetch all data in parallel
  const [
    featuredMoviesResponse,
    trendingMoviesResponse,
    topRatedMoviesResponse,
    featuredTvResponse,
    trendingTvResponse,
    topRatedTvResponse,
  ] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`),
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`),
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`),
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}`),
    fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`),
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}`),
  ]);

  // Parse JSON responses
  const featuredMoviesData = await featuredMoviesResponse.json();
  const trendingMoviesData = await trendingMoviesResponse.json();
  const topRatedMoviesData = await topRatedMoviesResponse.json();
  const featuredTvData = await featuredTvResponse.json();
  const trendingTvData = await trendingTvResponse.json();
  const topRatedTvData = await topRatedTvResponse.json();

  // Store data in variables
  featuredMovies = featuredMoviesData.results;
  trendingMovies = trendingMoviesData.results;
  topRatedMovies = topRatedMoviesData.results;
  featuredTvShows = featuredTvData.results;
  trendingTvShows = trendingTvData.results;
  topRatedTvShows = topRatedTvData.results;

  // Initial render of movies
  renderMovies();
}

// Render items
function renderMovies() {
  setTitles("Featured Movies", "Trending Movies", "Top Rated Movies");
  renderFeatured(featuredMovies);
  renderTrending(trendingMovies);
  renderTopRated(topRatedMovies);
}

function renderTv() {
  setTitles("Featured TV Shows", "Trending TV Shows", "Top Rated TV Shows");
  renderFeatured(featuredTvShows);
  renderTrending(trendingTvShows);
  renderTopRated(topRatedTvShows);
}

function setTitles(heroTitle, trendingTitle, topRatedTitle) {
  document.getElementById("hero-title").innerText = heroTitle;
  document.getElementById("trending-title").innerText = trendingTitle;
  document.getElementById("top-rated-title").innerText = topRatedTitle;
}

// Render featured items
function renderFeatured(items) {
  const container = document.getElementById("hero-container");
  container.innerHTML = "";
  items.forEach((item) => {
    const { title, name, backdrop_path } = item;
    container.appendChild(createHeroElement(title || name, backdrop_path));
  });
}

// Render trending items
function renderTrending(items) {
  const container = document.getElementById("trending-container");
  container.innerHTML = "";
  items.forEach((item) => {
    const { title, name, poster_path } = item;
    container.appendChild(createCardElement(title || name, poster_path));
  });
}

// Render top-rated items
function renderTopRated(items) {
  const container = document.getElementById("top-rated-container");
  container.innerHTML = "";
  items.forEach((item) => {
    const { title, name, poster_path } = item;
    container.appendChild(createCardElement(title || name, poster_path));
  });
}

// Creates a hero element (large card) with title and image
function createHeroElement(title, poster) {
  const heroCard = document.createElement("div");
  heroCard.classList.add("hero-card");

  const heroTitle = document.createElement("div");
  heroTitle.classList.add("hero-title");
  heroTitle.innerText = title;

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const favIcon = document.createElement("img");
  favIcon.classList.add("heart-icon");
  favIcon.src = "heart-solid.svg";
  favIcon.setAttribute("onclick", `addToFavorites("${title}")`);

  const imgElement = document.createElement("img");
  imgElement.classList.add("hero-image");
  imgElement.src = `https://image.tmdb.org/t/p/w780${poster}`;

  imgContainer.append(favIcon, imgElement);
  heroCard.append(heroTitle, imgContainer);

  return heroCard;
}

// Creates a card element (small card) with title and image
function createCardElement(title, poster) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const favIcon = document.createElement("img");
  favIcon.classList.add("heart-icon");
  favIcon.src = "heart-solid.svg";
  favIcon.setAttribute("onclick", `addToFavorites("${title}")`);

  const imgElement = document.createElement("img");
  imgElement.classList.add("card-image");
  imgElement.src = `https://image.tmdb.org/t/p/w500${poster}`;

  const titleElement = document.createElement("h3");
  titleElement.innerText = title;

  imgContainer.append(favIcon, imgElement);
  cardElement.append(imgContainer, titleElement);

  return cardElement;
}

// Adds the specified title to the favorites list
function addToFavorites(title) {
  const favContainer = document.getElementById("fav-container");
  const favElement = document.createElement("li");
  favElement.innerText = title;
  favContainer.appendChild(favElement);
}

// Fetch data on initial load
fetchData();
