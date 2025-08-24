function MovieInfo({ movie, exit }) {


    function dateFormat() {
        const date = new Date(movie.release_date);

        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear();

        // add ordinal suffix (st, nd, rd, th)
        const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
        day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" : "th";

        return `${month} ${day}${suffix}, ${year}`;
    }

    return ( 

        <div className="movie-box">

            <div className="box-containing">

                <div className="icon-container" onClick={exit}>
                    <i class="bi bi-x-circle-fill text-3xl cursor-pointer"></i>
                </div>

                <div className="info-container">

                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "not-available.png"} alt={movie.title}/>

                    <div className="detail-container">
                        <h2>{movie.title}</h2>
                        
                        <div className="rating">
                            <i className="bi bi-star-fill"></i>
                            <span>{`${movie.vote_average.toFixed(1)} Rating`}</span>
                            <span>•</span>
                            <span>{dateFormat()}</span>
                            <span>•</span>
                            <span>{movie.original_language.toUpperCase()}</span>
                        </div>
                        
                        <p>{movie.overview}</p>
                        <button>Download</button>
                        <button>Stream online</button>
                    </div>  

                </div>
            </div>
            

        </div>
    
    );
}

export default MovieInfo;