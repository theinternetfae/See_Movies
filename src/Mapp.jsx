import { useState, useEffect } from "react";
import Search  from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from 'react-use';
import { updateSearchCount } from "./appWrite.js";

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

    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    
    //DATABASES are permanent ways of storing data unlike useState which only saves data on on page mount.

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]); //To avoid making too many API requests by waiting for the user to stop typing for 500ms

    //FETCHING THE MOVIES FROM THE DATABASE
    const fetchMovies = async (query = '') => {

        setIsLoading(true);
        setErrorMessage('');
 
        try {
            
            const endPoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endPoint, API_OPTIONS);
            
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await response.json();

            // if(data.Response === 'false') {
            //     setErrorMessage(data.Error || 'Failed to fetch movies');
            //     setMovieList([]);
            //     return;
            // }

            setMovieList(data.results || []);
            
            if(query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }

        } catch (error) {
            console.log(`Error fetching movies ${error}`);
            setErrorMessage('Error fetching movies. Please try again');
        } finally {
            //'finally' As in regardless of what goes on in try or catch
            setIsLoading(false);
        }
    
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return ( 
        <main>

            <div className="pattern"/>

            <div className="wrapper">

                <header>
                    <img src="./chic-movies-logo.png" className="w-45 mb-10"/>
                    <img src="./movie-banner.png" alt="banner" className="w-125"/>
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Stress</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>

                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>

                    { isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}

                </section>

            </div>

        </main> 
    );
}

export default Mapp;