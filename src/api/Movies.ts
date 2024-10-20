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

import { MovieDailyStatsResponse, MovieDetailsDto, MovieDto } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Movies<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags movie-controller
   * @name GetMovies
   * @request GET:/movies
   */
  getMovies = (
    query?: {
      /** @format date */
      targetDate?: string;
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 10
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MovieDto[], any>({
      path: `/movies`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags movie-controller
   * @name GetMovie
   * @request GET:/movies/{code}
   */
  getMovie = (code: number, params: RequestParams = {}) =>
    this.request<MovieDetailsDto, any>({
      path: `/movies/${code}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags movie-controller
   * @name GetMovieStats
   * @request GET:/movies/{code}/stats
   */
  getMovieStats = (
    code: number,
    query: {
      /** @format int32 */
      limit: number;
      field: "RANKING" | "AUDIENCE" | "REVENUE";
    },
    params: RequestParams = {},
  ) =>
    this.request<MovieDailyStatsResponse, any>({
      path: `/movies/${code}/stats`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}
