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

import { CustomResponseTokenResponse, KakaoUserInfoDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user-controller
   * @name KakaoLogin
   * @request POST:/api/v1/users/login/kakao
   */
  kakaoLogin = (data: KakaoUserInfoDto, params: RequestParams = {}) =>
    this.request<CustomResponseTokenResponse, any>({
      path: `/api/v1/users/login/kakao`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags kakao-auth-controller
   * @name GetKakaoExternalId
   * @request GET:/api/v1/users/kakao/login/callback
   */
  getKakaoExternalId = (
    query: {
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/users/kakao/login/callback`,
      method: "GET",
      query: query,
      ...params,
    });
}
