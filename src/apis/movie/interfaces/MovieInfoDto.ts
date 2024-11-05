import { movieDirectorDto } from "./MovieDirectorDto";
import { movieLeadactorDto } from "./MovieLeadactorDto";

export interface MovieInfoDto {
    code: number;
    ranking: number;
    title: string;
    poster: string[];
    details: string;
    releaseDate: string;
    productionYear: number;
    movieDirectorDtos: movieDirectorDto[];
    movieLeadactorDtos: movieLeadactorDto[];
};
