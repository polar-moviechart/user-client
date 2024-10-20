/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface MovieDirectorDto {
  /** @format int32 */
  code?: number;
  name?: string;
}

export interface MovieDto {
  /** @format int32 */
  code?: number;
  /** @format int32 */
  ranking?: number;
  title?: string;
  poster?: string[];
  details?: string;
  /** @format date */
  releaseDate?: string;
  /** @format int32 */
  productionYear?: number;
  movieDirectorDtos?: MovieDirectorDto[];
  movieLeadactorDtos?: MovieLeadactorDto[];
}

export interface MovieLeadactorDto {
  /** @format int32 */
  code?: number;
  name?: string;
}

export interface MovieDetailsDto {
  /** @format int32 */
  code?: number;
  title?: string;
  poster?: string[];
  details?: string;
  /** @format date */
  releaseDate?: string;
  /** @format int32 */
  productionYear?: number;
  synopsys?: string;
  movieDirectorDtos?: MovieDirectorDto[];
  movieLeadactorDtos?: MovieLeadactorDto[];
}

export type MovieDailyAudience = MovieDailyStat & {
  /** @format int32 */
  audience?: number;
};

export type MovieDailyRanking = MovieDailyStat & {
  /** @format int32 */
  ranking?: number;
};

export type MovieDailyRevenue = MovieDailyStat & {
  /** @format int32 */
  revenue?: number;
};

export interface MovieDailyStat {
  /** @format date */
  date?: string;
}

export interface MovieDailyStatsResponse {
  /** @format int32 */
  code?: number;
  dailyStatsDtos?: (MovieDailyAudience | MovieDailyRanking | MovieDailyRevenue)[];
}
