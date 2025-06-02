
// escuchamos el ARRANQUE y los cambios de hash
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

// Funcion de utilidad para mostrar  y ocultar secciones

function setSectionVisibility(element, isVisible) {
    if (!element) {
        console.warn('Elemento no encontrado para cambiar visibilidad:', element);
        return;
    }
    element.classList.toggle('inactive', !isVisible);
}



function navigator () {
    console.log({location});

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    }
    else if (location.hash.startsWith('#search=')) {
        searchPage();
    }
    else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    }
    else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    }
    else {
        homePage();
    }
}

function homePage() {
    console.log('Estamos en el Home !!')

    const trendingSection = document.querySelector('.trending-movie');
    const categoriesSection = document.getElementById('categories');
    const favoritesSection = document.getElementById('favoritos');

// Mostramos las secciones
    setSectionVisibility(trendingSection, true);
    setSectionVisibility(categoriesSection, true);
    setSectionVisibility(favoritesSection, true);

    getTrending_moviesPreview( )
    getGenre_movies()
}



function categoriesPage() {
    console.log('Estamos en categories !!')

    const trendingSection = document.querySelector('.trending-movie');
    const categoriesSection = document.getElementById('categories');
    const favoritesSection = document.getElementById('favoritos');

    // Solo categorias visibles
    setSectionVisibility(trendingSection, false);
    setSectionVisibility(categoriesSection, false);
    setSectionVisibility(favoritesSection, false);
    setSectionVisibility(document.getElementById('trends-section'), true);
    setSectionVisibility(document.getElementById('movie-details'), false);
    setSectionVisibility(document.getElementById('search-section'), false);
    setSectionVisibility(document.getElementById('favoritos'), false);

    const list = categoriesSection.querySelector('.category-list');
        if (list.children.length === 0) {
            getGenre_movies();
        }

    const hash = location.hash;
    const categoryData = hash.split('=')[1];

    if (!categoryData || !categoryData.includes('-')) {
        console.warn('Hash de categoría inválido:', categoryData);
        return;
    }

    const [id, name] = categoryData.split('-');    

    getMoviesByCategory(id, decodeURIComponent(name));    
    window.scrollTo({top: 0, behavior: 'smooth' });

}

function movieDetailsPage() {
    console.log('Estamos en Movies !!')

    setSectionVisibility(document.querySelector('.trending-movie'), false);
    setSectionVisibility(document.getElementById('categories'), false);
    setSectionVisibility(document.getElementById('favoritos'), false);
    setSectionVisibility(document.getElementById('trends-section'), false);
    setSectionVisibility(document.getElementById('search-section'), false);
    setSectionVisibility(document.getElementById('movie-details'), true);

    // Aquí llamarías a una función para cargar detalles de la película
    const [_, movieId] = location.hash.split('=');
    if (movieId) {
        getMovieDetails(movieId);
    }
}

function searchPage() {
    console.log('Estamos en search !!')

    setSectionVisibility(document.querySelector('.trending-movie'), false);
    setSectionVisibility(document.getElementById('categories'), false);
    setSectionVisibility(document.getElementById('favoritos'), false);
    setSectionVisibility(document.getElementById('trends-section'), false);
    setSectionVisibility(document.getElementById('search-section'), true);
    setSectionVisibility(document.getElementById('movie-details'), false);

    const [_, query] = location.hash.split('=');
    const decodedQuery = decodeURIComponent(query || '');
    if (decodedQuery) {
        getMoviesBySearch(decodedQuery);
    }


}

function trendsPage() {
    console.log('Estamos en Trends !!')

    setSectionVisibility(document.querySelector('.trending-movie'), false);
    setSectionVisibility(document.getElementById('categories'), false);
    setSectionVisibility(document.getElementById('favoritos'), false);
    setSectionVisibility(document.getElementById('trends-section'), true);
    setSectionVisibility(document.getElementById('search-section'), false);
    setSectionVisibility(document.getElementById('movie-details'), false);
     // Aquí llamarías a una función para cargar películas de tendencia extendida

    getTrendingMovies();

}

const searchForm = document.querySelector('.search-bar');
const searchInput = document.getElementById('search');

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        const newHash = `#search=${encodeURIComponent(query)}`;
        if (location.hash === newHash) {
            navigator(); // Forzamos recarga si ya estamos en el mismo hash
        } else {
            location.hash = newHash;
        }
    }
});
