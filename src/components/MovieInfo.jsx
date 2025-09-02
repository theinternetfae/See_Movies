import ReadMore from "./ReadMore.jsx";

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
                            <span>{`${movie.vote_average.toFixed(1)}`} <span className="rate-text">Rating</span></span>
                            <span className="hiding">•</span>
                            <span className="hiding">{dateFormat()}</span>
                            <span className="hiding">•</span>
                            <span className="hiding">{movie.original_language.toUpperCase()}</span>
                        </div>
                        
                        <ReadMore text={movie.overview} limit={100} />
                        <p className="big-info">{movie.overview}</p>
                        <button className="info-button">Download</button>
                        <button className="info-button">Stream online</button>
                    
                    </div>  

                </div>
            </div>
            

        </div>
    
    );
}

export default MovieInfo;