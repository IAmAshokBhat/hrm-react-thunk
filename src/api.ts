import {
  ILoginData,
  INewAttendance,
  INewLeave,
  IRegisterAPI
} from './constants';
import { fetchWithToken, getToken } from './utils';

const headers = {
  'X-JWT-Token': getToken()
};

export const getUserListAPI = () => fetchWithToken('user/list');

export const getUserDetailsAPI = (id: number) =>
  fetchWithToken(`api/users/${id}`);

export const getAttendanceDetailsAPI = (id: number, from: string, to: string) =>
  fetchWithToken(`api/attendance/${id}?from=${from}&to=${to}`);

export const getLeaveBalanceAPI = (id: number) =>
  fetchWithToken(`api/leaves/${id}`);

export const getEventDetailsAPI = (id: number, from: string, to: string) =>
  fetchWithToken(`api/events/${id}?from=${from}&to=${to}`);

export const getAllLeavesAPI = (id: number) =>
  fetchWithToken(`api/all-leaves/${id}`);

export const applyLeaveAPI = (newLeave: INewLeave) =>
  fetchWithToken(`api/apply-leave`, {
    method: 'POST',
    body: JSON.stringify(newLeave)
  });

export const addAttendanceAPI = (newAttendance: INewAttendance) =>
  fetchWithToken(`api/attendance`, {
    method: 'POST',
    body: JSON.stringify(newAttendance)
  });

export const loginAPI = (userInfo: ILoginData) =>
  fetchWithToken(`login`, {
    method: 'POST',
    body: JSON.stringify(userInfo)
  });

export const getDesignationListAPI = () =>
  fetchWithToken(`designation`, { headers: headers });

export const registerAPI = (newUser: IRegisterAPI) =>
  fetchWithToken(`user`, {
    method: 'POST',
    body: JSON.stringify(newUser)
  });
