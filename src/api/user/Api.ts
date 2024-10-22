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

import { CustomResponseTokenResponse, KakaoCodeDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user-controller
   * @name KakaoLogin
   * @request POST:/api/v1/users/login/kakao/callback
   */
  kakaoLogin = (data: KakaoCodeDto, params: RequestParams = {}) =>
    this.request<CustomResponseTokenResponse, any>({
      path: `/api/v1/users/login/kakao/callback`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}