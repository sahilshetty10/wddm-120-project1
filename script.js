// NavBar
// Dark mode toggle
const isDark = false;
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", toggleDarkMode);
function toggleDarkMode() {
  let body = document.body;
  body.classList.toggle("dark");
  let navbar = document.getElementById("navbar");
  navbar.classList.toggle("dark-header");
  document.documentElement.setAttribute(
    "data-color-scheme",
    isDark ? "light" : "dark"
  );
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
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=1f54bd990f1cdfb230adb312546d765d"
  );
  const data = await response.json();
  const featuredMovies = data.results;
  const featuredMoviesContainer = document.getElementById("hero-container");
  featuredMoviesContainer.innerHTML = "";
  featuredMovies.forEach((movie) => {
    let title = movie.title;
    let poster = movie.backdrop_path;
    featuredMoviesContainer.appendChild(createHeroElement(title, poster));
  });
}

async function renderFeaturedTv() {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/tv?api_key=1f54bd990f1cdfb230adb312546d765d"
  );
  const data = await response.json();
  const featuredTv = data.results;
  console.log(featuredTv);
  const featuredTvContainer = document.getElementById("hero-container");
  featuredTvContainer.innerHTML = "";
  featuredTv.forEach((movie) => {
    let title = movie.name;
    let poster = movie.backdrop_path;
    featuredTvContainer.appendChild(createHeroElement(title, poster));
  });
}

function createHeroElement(title, poster) {
  let heroCard = document.createElement("div");
  heroCard.classList.add("hero-card");
  let heroTitle = document.createElement("div");
  heroTitle.classList.add("hero-title");
  heroTitle.innerText = title;
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  let favIcon = document.createElement("img");
  favIcon.classList.add("heart-icon");
  favIcon.src = "heart-solid.svg";
  favIcon.setAttribute("onclick", `addToFavorites("${title}")`);
  imgContainer.appendChild(favIcon);
  let imgElement = document.createElement("img");
  imgElement.classList.add("hero-image");
  imgElement.src = `https://image.tmdb.org/t/p/original${poster}`;
  imgContainer.appendChild(imgElement);
  heroCard.appendChild(heroTitle);
  heroCard.appendChild(imgContainer);
  return heroCard;
}

async function renderTrendingMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=1f54bd990f1cdfb230adb312546d765d"
  );
  const data = await response.json();
  const trendingMovies = data.results;
  const trendingMoviesContainer = document.getElementById("trending-container");
  trendingMoviesContainer.innerHTML = "";
  trendingMovies.forEach((movie) => {
    let title = movie.title;
    let poster = movie.poster_path;
    let cardElement = createCardElement(title, poster);
    trendingMoviesContainer.appendChild(cardElement);
  });
}

async function renderTrendingTv() {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/tv/day?api_key=1f54bd990f1cdfb230adb312546d765d"
  );
  const data = await response.json();
  const trendingTv = data.results;
  const trendingTvContainer = document.getElementById("trending-container");
  trendingTvContainer.innerHTML = "";
  trendingTv.forEach((movie) => {
    let title = movie.name;
    let poster = movie.poster_path;
    let cardElement = createCardElement(title, poster);
    trendingTvContainer.appendChild(cardElement);
  });
}

async function renderTopRatedMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=1f54bd990f1cdfb230adb312546d765d"
  );
  const data = await response.json();
  const topRatedMovies = data.results;
  const topRatedMoviesContainer = document.getElementById(
    "top-rated-container"
  );
  topRatedMoviesContainer.innerHTML = "";
  topRatedMovies.forEach((movie) => {
    let title = movie.title;
    let poster = movie.poster_path;
    let cardElement = createCardElement(title, poster);
    topRatedMoviesContainer.appendChild(cardElement);
  });
}

async function renderTopRatedTv() {
  const response = await fetch(
    "https://api.themoviedb.org/3/tv/top_rated?api_key=1f54bd990f1cdfb230adb312546d765d"
  );
  const data = await response.json();
  const topRatedTv = data.results;
  const topRatedTvContainer = document.getElementById("top-rated-container");
  topRatedTvContainer.innerHTML = "";
  topRatedTv.forEach((movie) => {
    let title = movie.name;
    let poster = movie.poster_path;
    let cardElement = createCardElement(title, poster);
    topRatedTvContainer.appendChild(cardElement);
  });
}

function createCardElement(title, poster) {
  let cardElement = document.createElement("div");
  cardElement.classList.add("card");
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  let favIcon = document.createElement("img");
  favIcon.classList.add("heart-icon");
  favIcon.src = "heart-solid.svg";
  favIcon.setAttribute("onclick", `addToFavorites("${title}")`);
  imgContainer.appendChild(favIcon);
  let imgElement = document.createElement("img");
  imgElement.classList.add("card-image");
  imgElement.src = `https://image.tmdb.org/t/p/w500${poster}`;
  imgContainer.appendChild(imgElement);
  let titleElement = document.createElement("h3");
  titleElement.innerText = title;
  cardElement.appendChild(imgContainer);
  cardElement.appendChild(titleElement);
  return cardElement;
}

function addToFavorites(title) {
  let favContainer = document.getElementById("fav-container");
  let favElement = document.createElement("li");
  favElement.innerText = title;
  favContainer.appendChild(favElement);
}

renderMovies();
