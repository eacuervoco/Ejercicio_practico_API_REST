const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }     
});

document.addEventListener('DOMContentLoaded', () => {
    // Ejecutamos solo cuando el DOM esté completamente listo
    getTrending_moviesPreview();
    getGenre_movies();
    
});

//Obtenemos las peliculas de tendencia y renderizamos.
async function getTrending_moviesPreview( ) {
    const url_API_Trending_movies = 'trending/movie/day?language=es-ES'
    try {
        const response = await api.get (url_API_Trending_movies);        
        const data = response.data;
        const movies = data.results;
        console.log('Tendencias', {data, movies});

        const trendingContainer = document.getElementById('home-trending-container');
        const movieTemplate = document.getElementById('movie-card-template');
        if (!movieTemplate) {
            console.error('Template de tarjeta de película no encontrado');
            return;
        }
        //Limpiamos el contenedor de las tendencias
        trendingContainer.innerHTML = '';

        movies.forEach(movie => {
            const clone = movieTemplate.content.cloneNode(true);

            const img   = clone.querySelector('img');
            const title = clone.querySelector('h3');
            const desc  = clone.querySelector('p');

            img.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
            img.alt = movie.title;
            title.textContent = movie.title;
            desc.textContent = movie.overview || 'Descripción no disponible';

            trendingContainer.appendChild(clone);
        });

        
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
    } 
}

async function getGenre_movies() {
    const url_API_Genre_movies = 'genre/movie/list?language=es';
    try{ 
        const response = await api.get (url_API_Genre_movies);        
        const data = response.data
        const categories = data.genres;
        console.log('Categorias', {data, categories})


        //seleccionamos el contenedor de cartegorias
        const genreMoviescard = document.querySelector('.category-list')
        genreMoviescard.innerHTML = '';

        //Creamos el elemento de la lista
        categories.forEach(category => {

            //Creamos el elemento de la lista
            const categoriesItems = document.createElement('li');
            categoriesItems.classList.add('category-item');

            //Creamos la tarjeta de la categoria
            const cardCategory = document.createElement('article');
            cardCategory.classList.add('category-card');

            //Creamos el h3 con el nombre de la categoria
            const nameCategory = document.createElement('h3');
            nameCategory.textContent = category.name;

            // Combinamos los elementos
            cardCategory.appendChild(nameCategory)            
            categoriesItems.appendChild(cardCategory)
            genreMoviescard.appendChild(categoriesItems)

            // Eblazamos la navegación
            cardCategory.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${encodeURIComponent(category.name)}`;
             }); 
        });     
        
    }
    catch (error)  {
        console.error('Error al obtener los datos de la API:', error);
    }   
}


async function getMoviesBySearch(query) {
    const url_API_Search = `search/movie?query=${encodeURIComponent(query)}&language=es-ES`;

    try {
        const response = await api.get(url_API_Search);
        const data = response.data;
        const movies = data.results;

        console.log('Resultados búsqueda:', { query, data });

        const searchContainer = document.getElementById('search-results');
        const movieTemplate = document.getElementById('movie-card-template');

        if (!movieTemplate || !searchContainer) {
            console.error('Faltan elementos en el DOM para renderizar los resultados.');
            return;
        }

        // Limpiar resultados anteriores
        searchContainer.innerHTML = '';

        if (movies.length === 0) {
            searchContainer.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
            return;
        }

        // Renderizar resultados
        movies.forEach(movie => {
            const clone = movieTemplate.content.cloneNode(true);

            const img = clone.querySelector('img');
            const title = clone.querySelector('h3');
            const desc = clone.querySelector('p');

            img.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
            img.alt = movie.title;
            title.textContent = movie.title;
            desc.textContent = movie.overview || 'Sinopsis no disponible';

            searchContainer.appendChild(clone);
        });

    } catch (error) {
        console.error('Error al obtener los resultados de búsqueda:', error);
    }    
} 

async function getTrendingMovies() {
    const url = 'trending/movie/day?language=es-ES';
    try {
        const response = await api.get(url);
        const movies = response.data.results;
        const trendsContainer = document.getElementById('trends-results');
        const template = document.getElementById('movie-card-template');

        trendsContainer.innerHTML = ''; // Limpia antes de renderizar

        movies.forEach(movie => {
            const clone = template.content.cloneNode(true);
            const img = clone.querySelector('img');
            const title = clone.querySelector('h3');
            const desc = clone.querySelector('p');

            img.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
            img.alt = movie.title;
            title.textContent = movie.title;
            desc.textContent = movie.overview || 'Sin sinopsis';

            trendsContainer.appendChild(clone);
        });

    } catch (error) {
        console.error('Error al cargar películas en tendencia extendida:', error);
    }
}

async function getMovieDetails(movieId) {
    const url = `movie/${movieId}?language=es-ES`;

    try {
        const response = await api.get(url);
        const movie = response.data;

        console.log('Detalle de película:', movie);

        const container = document.getElementById('movie-details-container');
        const template = document.getElementById('movie-card-template');

        container.innerHTML = ''; // Limpia antes de mostrar nuevo detalle

        const clone = template.content.cloneNode(true);
        const img = clone.querySelector('img');
        const title = clone.querySelector('h3');
        const desc = clone.querySelector('p');

        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;
        title.textContent = movie.title;
        desc.textContent = movie.overview || 'Sin descripción disponible.';

        container.appendChild(clone);

    } catch (error) {
        console.error('Error al cargar detalle de película:', error);
    }
}

async function getMoviesByCategory(id, name) {
    const url = `discover/movie?with_genres=${id}&language=es-ES`;

    try {
        const response = await api.get(url);
        const movies = response.data.results;

        console.log(`Películas en categoría: ${name}`, movies);

        const container = document.getElementById('trends-results');
        const template = document.getElementById('movie-card-template');

        container.innerHTML = ''; // Limpiar contenido anterior

        movies.forEach(movie => {
            const clone = template.content.cloneNode(true);

            const img = clone.querySelector('img');
            const title = clone.querySelector('h3');
            const desc = clone.querySelector('p');


            document.getElementById('trends-title').textContent = `Películas de ${name}`;
            img.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
            img.alt = movie.title;
            title.textContent = movie.title;
            desc.textContent = movie.overview || 'Sin sinopsis.';

            container.appendChild(clone);
        });

    } catch (error) {
        console.error('Error al cargar películas por categoría:', error);
    }
}
