function MovieInfo() {
    return ( 

        <div className="movie-box">

            <div className="box-containing">

                <div className="icon-container">
                    <i class="bi bi-x-circle-fill text-3xl cursor-pointer"></i>
                </div>

                <div className="info-container">

                    <img src="not-available.png" alt="poster-name"/>

                    <div className="detail-container">
                        <h2>Name of Movie</h2>
                        
                        <div className="rating">
                            <i className="bi bi-star-fill"></i>
                            <span>1.5 Rating</span>
                        </div>
                        
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi vel tincidunt sodales, turpis mauris accumsan erat, vitae tempor sapien libero eget nunc. Nullam at dignissim justo. Vestibulum ultricies, purus sit amet pharetra suscipit, mauris orci egestas lectus, non posuere nisl lacus vitae lorem. Integer tincidunt feugiat dui, vel feugiat nibh efficitur non. Aenean facilisis massa sit amet diam ultrices, et condimentum ex porttitor.</p>
                        <button>Download</button>
                        <button>Stream online</button>
                    </div>  

                </div>
            </div>
            

        </div>
    
    );
}

export default MovieInfo;