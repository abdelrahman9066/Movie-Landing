//import { IMovieApp } from "./types/IMovieApp";
// import { IMovie } from "./types/IMovie";
class MovieApp {
    private moviesData: Array<any> = [];
    private currentMovieIndex: number = 0;

    private backgroundImg = document.querySelector<HTMLImageElement>('.main')!;
    private movieTitle = document.querySelector<HTMLHeadingElement>('.details .text h2')!;
    private imdbRating = document.querySelector<HTMLElement>('.details .rate .vote_average')!;
    private voteCount = document.querySelector<HTMLElement>('.details .vote_count')!;
    private releaseYear = document.querySelector<HTMLElement>('.details .year')!;
    private overview = document.querySelector<HTMLElement>('.details .info')!;
    private cardsContainer = document.querySelector<HTMLElement>('.cards-container')!;
    private prevButton = document.querySelector<HTMLElement>('.switch-buttons .left')!;
    private nextButton = document.querySelector<HTMLElement>('.switch-buttons .right')!;
    private searchIcon = document.querySelector<HTMLElement>('.search-icon')!;
    private searchInput = document.querySelector<HTMLInputElement>('.search-input')!;
    private searchButton = document.querySelector<HTMLElement>('.search-button')!;

    constructor() {
        this.setupListeners();
        this.fetchMovies();
    }

    private fetchMovies(query: string = 'spiderman') {
        try {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=21d6601622ce880a80939f3c1823ce8e&query=${query}`)
                .then(response => response.json())
                .then(data => {
                    this.moviesData = data.results.slice(0, 15);
                this.currentMovieIndex = 0;
                this.updateUI();
                });          
            
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    private updateUI(): void {
        const mainMovie = this.moviesData[this.currentMovieIndex];

        this.movieTitle.innerHTML = mainMovie.title;
        this.imdbRating.textContent = mainMovie.vote_average.toFixed(2);
        this.voteCount.textContent = `(${mainMovie.vote_count})`;
        this.releaseYear.textContent = new Date(mainMovie.release_date).getFullYear().toString();
        
        // change background image to poster path using background css 
        this.backgroundImg.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)),url(https://image.tmdb.org/t/p/original${mainMovie.backdrop_path || mainMovie.poster_path}) no-repeat center/cover fixed`;
        this.overview.textContent = mainMovie.overview || 'No overview available.';

        const cards = document.querySelectorAll<HTMLElement>('.card');
        cards.forEach((card, index) => {
            if (this.moviesData[index]) {
                let img = card.querySelector<HTMLImageElement>('img')!;
                img.src = `https://image.tmdb.org/t/p/w220_and_h330_face${this.moviesData[index].poster_path || this.moviesData[index].backdrop_path}`;
            }
            if (index === this.currentMovieIndex) {
                card.classList.add('active');
                
            } else {
                card.classList.remove('active');
                
            }
        });
    }

    private setupListeners(): void {
        this.prevButton.addEventListener('click', () => this.handlePrevClick());
        this.nextButton.addEventListener('click', () => this.handleNextClick());
        this.searchIcon.addEventListener('click', () => this.searchInput.focus());
        this.searchButton.addEventListener('click', () => {
            const query = this.searchInput.value.trim();
            if (query) {
                this.fetchMovies(query);
            }
        })
        this.searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const query = this.searchInput.value.trim();
                if (query) {
                    this.fetchMovies(query);}
                    }
        });
    }

    private handlePrevClick(): void {
        this.currentMovieIndex = (this.currentMovieIndex - 1 + this.moviesData.length) % this.moviesData.length;
        this.updateUI();
        this.cardsContainer.scrollBy({ top: 0, left: -150, behavior: 'smooth' });
        if (this.currentMovieIndex === this.moviesData.length - 1) {
            this.cardsContainer.scrollTo({ top: 0, left: 150 * 10, behavior: 'smooth' });
        }
    }

    private handleNextClick(): void {
        this.currentMovieIndex = (this.currentMovieIndex + 1) % this.moviesData.length;
        this.updateUI();
        this.cardsContainer.scrollBy({ top: 0, left: 150, behavior: 'smooth' });
        if (this.currentMovieIndex === 0) {
            this.cardsContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }
    

}
    

new MovieApp();
