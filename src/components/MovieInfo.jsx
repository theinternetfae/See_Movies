function MovieInfo({ movie, exit }) {

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
                            <span>{`${movie.vote_average} Rating`}</span><span>•</span><span>{movie.release_date}</span>
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