import {
  ILoginData,
  INewAttendance,
  INewLeave,
  IRegisterAPI
} from './constants';
import { IDetailsAPIReq, IDetailsAPIReqWithDates } from './contracts';
import { fetchWithToken, getToken } from './utils';

const headers = {
  'X-JWT-Token': getToken()
};
const API_URL = process.env.REACT_APP_API_URL;

export const getUserListAPI = () => fetchWithToken('user/list');

export const getUserDetailsAPI = ({ id }: IDetailsAPIReq) =>
  fetchWithToken(`${API_URL}api/users/${id}`);

export const getAttendanceDetailsAPI = ({
  id,
  from,
  to
}: IDetailsAPIReqWithDates) =>
  fetchWithToken(`${API_URL}api/attendance/${id}?from=${from}&to=${to}`);

export const getLeaveBalanceAPI = ({ id }: IDetailsAPIReq) =>
  fetchWithToken(`${API_URL}api/leaves/${id}`);

export const getEventDetailsAPI = ({ id, from, to }: IDetailsAPIReqWithDates) =>
  fetchWithToken(`${API_URL}api/events/${id}?from=${from}&to=${to}`);

export const getAllLeavesAPI = ({ id }: IDetailsAPIReq) =>
  fetchWithToken(`${API_URL}api/all-leaves/${id}`);

export const applyLeaveAPI = (newLeave: INewLeave) =>
  fetchWithToken(`${API_URL}api/apply-leave`, {
    method: 'POST',
    body: JSON.stringify(newLeave)
  });

export const addAttendanceAPI = (newAttendance: INewAttendance) =>
  fetchWithToken(`${API_URL}api/attendance`, {
    method: 'POST',
    body: JSON.stringify(newAttendance)
  });

export const loginAPI = (userInfo: ILoginData) =>
  fetchWithToken(`${API_URL}login`, {
    method: 'POST',
    body: JSON.stringify(userInfo)
  });

export const getDesignationListAPI = () =>
  fetchWithToken(`${API_URL}designation`, { headers: headers });

export const registerAPI = (newUser: IRegisterAPI) =>
  fetchWithToken(`${API_URL}user`, {
    method: 'POST',
    body: JSON.stringify(newUser)
  });
