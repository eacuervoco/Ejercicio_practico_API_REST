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

        const trendingContainer = document.querySelector('.trending-container');
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
        });     
        
    }
    catch (error)  {
        console.error('Error al obtener los datos de la API:', error);
    }
    
}

// getTrending_moviesPreview( )
// getGenre_movies()