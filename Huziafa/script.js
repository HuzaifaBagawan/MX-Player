const API_KEY = "001cca40cf994bba3f6aa49f29f650ad";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w300";

const endpoints = {
    trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    kdramas: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18&with_original_language=ko`,
    action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    romance: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10749`,
};

// Function to fetch and display movies
async function fetchMovies(endpoint, elementId) {
    const response = await fetch(endpoint);
    const data = await response.json();
    const container = document.getElementById(elementId);

    data.results.forEach((movie) => {
        const img = document.createElement("img");
        img.src = IMG_URL + movie.poster_path;
        img.alt = movie.title || movie.name;
        container.appendChild(img);
    });
}

// Load Banner
async function loadBanner() {
    const response = await fetch(endpoints.trending);
    const data = await response.json();
    const movie = data.results[Math.floor(Math.random() * data.results.length)];

    document.querySelector(".banner").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    document.getElementById("banner-title").innerText = movie.title || movie.name;
    document.getElementById("banner-description").innerText = movie.overview;
}

// Load All Sections
document.addEventListener("DOMContentLoaded", () => {
    loadBanner();
    fetchMovies(endpoints.kdramas, "kdramas");
    fetchMovies(endpoints.trending, "trending");
    fetchMovies(endpoints.action, "action");
    fetchMovies(endpoints.romance, "romance");
});