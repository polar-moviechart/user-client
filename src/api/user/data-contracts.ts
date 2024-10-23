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

export interface KakaoUserInfoDto {
  /** @format int64 */
  id?: number;
}

export interface CustomResponseTokenResponse {
  isSuccess?: boolean;
  code?: string;
  data?: TokenResponse;
  errorMsg?: string;
}

export interface TokenResponse {
  accessToken?: string;
  refreshToken?: string;
}
