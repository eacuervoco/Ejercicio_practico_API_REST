async function getTrending_moviesPreview( ) {
    const url_API_Trending_movies = `https://api.themoviedb.org/3/trending/movie/day?language=es-ES`
    try {
        const response = await fetch (url_API_Trending_movies, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}` ,
            }
        })
        const data = await response.json()
        const movies = data.results;
        console.log('Tendencias', {data, movies})

        // Seleccionamos el contenedor de las películas
        const trendingPreviewmoviesCard = document.querySelector('.trending-container')
        // Limpiamos el contenedor para evitar duplicados
        trendingPreviewmoviesCard.innerHTML = '';

        // Iteramos sobre las películas y las añadimos al contenedor
        movies.forEach(movie => {  
            // Creamos el contenedor de cada película , imagen, titulo         
            const movieContainer = document.createElement('article')
            movieContainer.classList.add('movie-card', 'trending');

            const moviImg = document.createElement('img');
            moviImg.classList.add('movie-img');
            moviImg.setAttribute('alt', movie.title);
            moviImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

            // Creamos el contenedor movieinfo
            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movie-info');

            const movieTitle = document.createElement('h3');
            movieTitle.textContent = movie.title;

            const moviDescription = document.createElement('p')
            moviDescription.textContent = movie.overview;

            const movieButton = document.createElement('button')
            movieButton.classList.add('btn')
            movieButton.textContent = 'Ver Ahora'

            // Agregamos los elementos al contenedor de información
            movieInfo.appendChild(movieTitle);
            movieInfo.appendChild(moviDescription);
            movieInfo.appendChild(movieButton);

            // Combinamos todo en el contenedor principal de la película
            movieContainer.appendChild(moviImg);
            movieContainer.appendChild(movieInfo);


            // Agregamos la película al contenedor principal
            trendingPreviewmoviesCard.appendChild(movieContainer);

            
        });
        
    } catch (error)    {
        console.error('Error al obtener los datos de la API:', error);
    } 
}

getTrending_moviesPreview( )

async function getGenre_movies() {
    const url_API_Genre_movies = `https://api.themoviedb.org/3/genre/movie/list?language=es`;
    try{
        const response = await fetch (url_API_Genre_movies, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}` ,
            }
        })
        const data = await response.json()
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
    catch (error)    {
        console.error('Error al obtener los datos de la API:', error);
    }
    
}

getGenre_movies()