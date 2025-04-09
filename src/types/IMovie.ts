export interface IMovie {
    title: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    backdrop_path?: string;
    poster_path?: string;
    overview?: string;
}