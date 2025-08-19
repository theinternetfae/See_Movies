import { useState } from "react";
import Search  from "./components/Search.jsx";

function Mapp() {

    const [ searchTerm, setSearchTerm ] = useState('');

    return ( 
        <main>
            <div className="pattern"/>

            <div className="wrapper">

                <header>
                    <img src="./movie-banner.png" alt="banner" />
                    <h1>Find <span className="text-gradient">Chic-flics</span> You'll Enjoy Without The Stress</h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <h1 className="text-white">{searchTerm}</h1>

            </div>

        </main> 
    );
}

export default Mapp;

