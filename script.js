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
async function renderMovies(){
    let movieData = await getMovies();
    renderMovies(movieData);
}

async function renderTv(){
    let tvData = await getTv();
    renderTv(tvData);
}