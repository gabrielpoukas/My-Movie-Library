const movieForm = document.getElementById('movie-form');
const movieGrid = document.getElementById('movie-grid');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

let myMovies = JSON.parse(localStorage.getItem('cineLog_movies')) || [];

function initTheme() {

    const savedTheme = localStorage.getItem('cineLog_theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

}

themeToggle.addEventListener('click', () => {

    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('cineLog_theme', newTheme);
});

movieForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleEl = document.getElementById('movie-title');
    const genreEl = document.getElementById('movie-genre');
    const posterEl = document.getElementById('movie-poster');
    const ratingEl = document.getElementById('movie-rating');

    if (!titleEl.value || !genreEl.value) {
        alert("Por favor, preencha o título e o gênero!");
        return;
    }

    const newMovie = {
        id: Date.now(),
        title: titleEl.value,
        genre: genreEl.value,
        poster: posterEl.value || 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300&h=450&auto=format&fit=crop',
        rating: ratingEl.value
    };

    myMovies.push(newMovie);
    salvarESalvarguardar(); 
    movieForm.reset();
    
    document.activeElement.blur(); 
    
    console.log("Filme salvo com sucesso!");
});

function atualizarInterface(FilmesParaExibir = myMovies) {

movieGrid.innerHTML = '';

FilmesParaExibir.forEach((movie) => {

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `

    <div class="rating-tag">★ ${movie.rating}</div>
            <img src="${movie.poster}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x450?text=Erro+Capa'">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre}</p>
                <button onclick="removerFilme(${movie.id})" class="del-btn" style="margin-top:10px; color:var(--accent); background:none; border:none; cursor:pointer; font-weight:bold;">
                    Excluir
                </button>
            </div>
        `;
        movieGrid.appendChild(movieCard);

    });

}

function salvarESalvarguardar() {

 localStorage.setItem('cineLog_movies', JSON.stringify(myMovies));
    atuaalizarInterface();

}


window.removerFilme = (id) => {

if(confirm('Deseja realmente Excluir este Filme??')) {
    myMovies = myMovies.filter(movie => movie.id !== id);
    salvarESalvarguardar();

}
};

searchInput.addEventListener('input', () => {

    const termoBusca = searchInput.value.toLowerCase().trim();

    const filmesFiltrados = myMovies.filter(movie => {

        const titulo = movie.title.toLowerCase();
        const genero = movie.genre.toLowerCase();
        
        return titulo.includes(termoBusca) || genero.includes(termoBusca);
    });

    console.log("Termo:", termoBusca, "| Encontrados:", filmesFiltrados.length);

    atualizarInterface(filmesFiltrados);
});

initTheme();
atuaalizarInterface();
