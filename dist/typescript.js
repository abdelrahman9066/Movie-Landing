//import { IMovieApp } from "./types/IMovieApp";
// import { IMovie } from "./types/IMovie";
var MovieApp = /** @class */ (function () {
    function MovieApp() {
        this.moviesData = [];
        this.currentMovieIndex = 0;
        this.backgroundImg = document.querySelector('.main');
        this.movieTitle = document.querySelector('.details .text h2');
        this.imdbRating = document.querySelector('.details .rate .vote_average');
        this.voteCount = document.querySelector('.details .vote_count');
        this.releaseYear = document.querySelector('.details .year');
        this.overview = document.querySelector('.details .info');
        this.cardsContainer = document.querySelector('.cards-container');
        this.prevButton = document.querySelector('.switch-buttons .left');
        this.nextButton = document.querySelector('.switch-buttons .right');
        this.searchIcon = document.querySelector('.search-icon');
        this.searchInput = document.querySelector('.search-input');
        this.searchButton = document.querySelector('.search-button');
        this.setupListeners();
        this.fetchMovies();
    }
    MovieApp.prototype.fetchMovies = function (query) {
        var _this = this;
        if (query === void 0) { query = 'spiderman'; }
        try {
            fetch("https://api.themoviedb.org/3/search/movie?api_key=21d6601622ce880a80939f3c1823ce8e&query=".concat(query))
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.moviesData = data.results.slice(0, 15);
                _this.currentMovieIndex = 0;
                _this.updateUI();
            });
        }
        catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
    MovieApp.prototype.updateUI = function () {
        var _this = this;
        var mainMovie = this.moviesData[this.currentMovieIndex];
        this.movieTitle.innerHTML = mainMovie.title;
        this.imdbRating.textContent = mainMovie.vote_average.toFixed(2);
        this.voteCount.textContent = "(".concat(mainMovie.vote_count, ")");
        this.releaseYear.textContent = new Date(mainMovie.release_date).getFullYear().toString();
        // change background image to poster path using background css 
        this.backgroundImg.style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)),url(https://image.tmdb.org/t/p/original".concat(mainMovie.backdrop_path || mainMovie.poster_path, ") no-repeat center/cover fixed");
        this.overview.textContent = mainMovie.overview || 'No overview available.';
        var cards = document.querySelectorAll('.card');
        cards.forEach(function (card, index) {
            if (_this.moviesData[index]) {
                var img = card.querySelector('img');
                img.src = "https://image.tmdb.org/t/p/w220_and_h330_face".concat(_this.moviesData[index].poster_path || _this.moviesData[index].backdrop_path);
            }
            if (index === _this.currentMovieIndex) {
                card.classList.add('active');
            }
            else {
                card.classList.remove('active');
            }
        });
    };
    MovieApp.prototype.setupListeners = function () {
        var _this = this;
        this.prevButton.addEventListener('click', function () { return _this.handlePrevClick(); });
        this.nextButton.addEventListener('click', function () { return _this.handleNextClick(); });
        this.searchIcon.addEventListener('click', function () { return _this.searchInput.focus(); });
        this.searchButton.addEventListener('click', function () {
            var query = _this.searchInput.value.trim();
            if (query) {
                _this.fetchMovies(query);
            }
        });
        this.searchInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                var query = _this.searchInput.value.trim();
                if (query) {
                    _this.fetchMovies(query);
                }
            }
        });
    };
    MovieApp.prototype.handlePrevClick = function () {
        this.currentMovieIndex = (this.currentMovieIndex - 1 + this.moviesData.length) % this.moviesData.length;
        this.updateUI();
        this.cardsContainer.scrollBy({ top: 0, left: -150, behavior: 'smooth' });
        if (this.currentMovieIndex === this.moviesData.length - 1) {
            this.cardsContainer.scrollTo({ top: 0, left: 150 * 10, behavior: 'smooth' });
        }
    };
    MovieApp.prototype.handleNextClick = function () {
        this.currentMovieIndex = (this.currentMovieIndex + 1) % this.moviesData.length;
        this.updateUI();
        this.cardsContainer.scrollBy({ top: 0, left: 150, behavior: 'smooth' });
        if (this.currentMovieIndex === 0) {
            this.cardsContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    };
    return MovieApp;
}());
new MovieApp();
