export enum ACTIONS {
  GET_USERS = 'GET_USERS',
  GET_USER_DETAILS = 'GET_USER_DETAILS',
  GET_ATTENDANCE_DETAILS = 'GET_ATTENDANCE_DETAILS',
  GET_LEAVE_BALANCE = 'GET_LEAVE_BALANCE',
  GET_EVENT_DETAILS = 'GET_EVENT_DETAILS',
  GET_ALL_LEAVES = 'GET_ALL_LEAVES',
  APPLY_LEAVE = 'APPLY_LEAVE',
  ADD_ATTENDANCE = 'ADD_ATTENDANCE',
  GET_LOGIN = 'GET_LOGIN',
  LOGIN_LOADING = 'GET_LOGIN_LOADING',
  LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS',
  LOGIN_FAILURE = 'GET_LOGIN_FAILURE',
  GET_DESIGNATION_LIST = 'GET_DESIGNATION_LIST',
  REGISTER = 'REGISTER'
}

export const DATE_FORMAT = 'DD-MM-YYYY';

export const DATE_FORMAT_CALENDAR = 'YYYY-MM-DD';

export enum EventType {
  WORKING = 'WORKING',
  LEAVE = 'LEAVE'
}

export const enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export const defaultAction = { type: '', payload: null };

export const API_URL = process.env.REACT_APP_API_URL;

export const defaultHeaders = { headers: { 'X-JWT-Token': undefined } };
