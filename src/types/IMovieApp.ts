import { IMovie } from './IMovie';

export interface IMovieApp {
    updateUI(): void;
    setupSlider(): void;
    handlePrevClick(): void
    handleNextClick(): void;
    setupEventListeners(): void;

}