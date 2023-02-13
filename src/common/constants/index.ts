const CREATE_SUCCESS = '생성 성공';
const FETCH_SUCCESS = '조회 성공';
const UPDATE_SUCCESS = '수정 성공';
const DELETE_SUCCESS = '삭제 성공';
const REFRESH_TOKEN_GUARD_TYPE = 'REFRESH_TOKEN';
const REFRESH_TOKEN_COOKIE = 'REFRESH_TOKEN';
const ACCESS_TOKEN_COOKIE = 'ACCESS_TOKEN';

export const messages = {
  CREATE_SUCCESS,
  FETCH_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
};

export const keys = {
  REFRESH_TOKEN_GUARD_TYPE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_COOKIE,
};

export const accessMaxAge = 60 * 1000 * 30;
export const refreshMaxAge = 1000 * 60 * 60 * 24 * 30;
