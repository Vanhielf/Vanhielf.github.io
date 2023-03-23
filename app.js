const form = document.querySelector("form");
const movieList = document.querySelector("#movieList");

form.addEventListener("keyup", async(e) => {
    
    const search = form.elements.search.value;
    if (search) {
        await removeMovies()
        const config = { params: { q: search } };
        const request = await axios.get("https://api.tvmaze.com/search/shows?q=", config);
        await makeMovieElement(request.data);
    } else {
        await removeMovies()
        const msg = document.createElement("H2");
        msg.textContent = "waiting for input...";
        msg.classList.add("temp");
        movieList.append(msg);
    }
    
})

async function makeMovieElement(movieData) {
    
    for (let md of movieData) {
        
        if (md.show.image) {
        
            const movie = document.createElement("LI");
            movie.classList.add("movie");
        
            const image = document.createElement("IMG");
            image.classList.add("image-content");
            image.src = md.show.image.medium;
        
            const context = document.createElement("DIV");
            context.classList.add("context");
            context.innerHTML = md.show.summary;
        
            movie.append(image);
            movie.append(context);
        
            movieList.append(movie);
        
        }
    
    }
}

async function removeMovies() {
    for (let movie of [...movieList.children]) {
        // console.log(movieList.children)
        movieList.removeChild(movie);
    }
}


















