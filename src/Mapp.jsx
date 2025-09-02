import { useState, useEffect } from "react";
import Search  from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import MovieInfo from "./components/MovieInfo.jsx";
import {useDebounce} from 'react-use';
import { getTrendingMovies, updateSearchCount } from "./appWrite.js";

//DATABASE INFO SETUP
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

function Mapp() {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [movieList, setMovieList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingError, setTrendingError] = useState(null);
    const [trendingLoading, setTrendingLoading] = useState(false);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        document.title = "See Movies"; 

        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "/favicon.png"; 

    }, []);

    //DATABASES are permanent ways of storing data unlike useState which only saves data on on page mount.

    function descriptionPopUp(movie) {
        setSelectedMovie(movie);
    }

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]); //To avoid making too many API requests by waiting for the user to stop typing for 500ms

    //FETCHING THE MOVIES FROM THE DATABASE
    async function fetchMovies (query = '') {

        setIsLoading(true);
        setErrorMessage('');
 
        try {
            
            const endPoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endPoint, API_OPTIONS);
            
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await response.json();

            console.log(data.results);

            setMovieList(data.results || []);

            if (query && data.results.length === 0) {
                setErrorMessage(`No results found for "${query}"`);
            }   
            
            if(query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }



        } catch (error) {
            console.log(`Error fetching movies ${error}`);
            setErrorMessage('Error fetching movies. Please try again.');
        } finally {
            //'finally' As in regardless of what goes on in try or catch
            setIsLoading(false);
        }
    
    }

    async function loadTrendingMovies () {

        setTrendingLoading(true);
        setTrendingError('');       

        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        } catch (error) {
            console.log(`Error fetching trending movies ${error}`);
            setTrendingError('Error fetching trending movies. Please try again.');
        } finally {
            setTrendingLoading(false);
        }

    }

    useEffect(() => {
        loadTrendingMovies();
    }, []);

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return ( 

        <>
        
            <main>

                <div className="pattern"/>

                <div className="wrapper">

                    <header className="header">
                        <img src="./chic-movies-logo.png" className="w-45 mb-10 logo"/>
                        <img src="./movie-banner.png" alt="banner" className="w-125 banner"/>
                        <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Stress</h1>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    </header>


                    <h2>Trending Movies</h2>

                    { trendingLoading ? (
                            <Spinner />
                    ) : trendingError ? (
                            <p className="text-red-500 mb-10 ml-5 mt-10">{trendingError}</p>
                    ) : (

                        trendingMovies.length > 0 ? (
                        
                            <section className="trending">

                                <ul>
                                    {trendingMovies.map((movie, index) => (
                                        <li key={movie.$id}>
                                        <p>{index + 1}</p>
                                        <img
                                            src={movie.poster_url && `https://image.tmdb.org/t/p/w500${movie.poster_url}`}
                                            alt={movie.title}                                    
                                        />
                                        </li>
                                    ))}
                                </ul>

                            </section>

                        ) : (<p className="no-trending">Start searching movies to get your trending list!</p>)

                    )}


                    <section className="all-movies">
                        
                        <h2>All Movies</h2>

                        { isLoading ? (
                            <Spinner />
                        ) : errorMessage ? (
                            <p className="text-red-500">{errorMessage}</p>
                        ) : (
                            <ul>
                                {movieList.map((movie) => (
                                    <li key={movie.id} onClick={() => descriptionPopUp(movie)}><MovieCard key={movie.id} movie={movie}/></li>
                                ))}
                            </ul>
                        )}

                    </section>

                </div>
        
            </main> 

            {selectedMovie && <MovieInfo movie={selectedMovie} exit={() => setSelectedMovie(null)}/>}
        </>

    );
}

export default Mapp;