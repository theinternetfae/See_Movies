function MovieCard({movie}) {
    return ( 
        <p className="text-white" key={movie.id}>{movie.title}</p>
    );
}

export default MovieCard;