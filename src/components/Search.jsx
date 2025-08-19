function Search({searchTerm, setSearchTerm}) {
    return ( 
        <div className="search">
            <div>
                <i className="text-white ml-4 text-xl bi bi-search-heart"></i>
                <input type="text" placeholder="Search chic-flics" value={searchTerm} onChange={s => setSearchTerm(s.target.value)}/>
            </div>
        </div>
    );
}

export default Search;