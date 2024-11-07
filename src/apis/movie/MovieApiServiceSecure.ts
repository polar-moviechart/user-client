
export class MovieApiServiceSecure {
    private static instatnce: MovieApiServiceSecure | null = null;
    private static baseURL = process.env.REACT_APP_EDGE_SERVICE_URL + "/secure/api/v1/movies";

    constructor() {
        if (!MovieApiServiceSecure.instatnce) {
            MovieApiServiceSecure.instatnce = new MovieApiServiceSecure();
        }
        return MovieApiServiceSecure.instatnce;
    }
};
