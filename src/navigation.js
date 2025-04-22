window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

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
    getTrending_moviesPreview( )
    getGenre_movies()
}

function categoriesPage() {
    console.log('Estamos en categories !!')
}

function movieDetailsPage() {
    console.log('Estamos en Movies !!')
}

function searchPage() {
    console.log('Estamos en search !!')
}

function trendsPage() {
    console.log('Estamos en Trends !!')
}