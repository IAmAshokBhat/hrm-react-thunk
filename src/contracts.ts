import { AnyAction, Dispatch } from 'redux';

export type TAnyObject = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

export type TAny = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export type TFPromise = (params: TAny) => Promise<TAnyObject>;

export type TFPromiseAPI = (params?: TAny | TAnyObject) => Promise<TAnyObject>;

export type TFAction = (dispatch: Dispatch<AnyAction>) => Promise<void>;

export interface IKeyValue {
  [key: string]: number;
}

export interface IDefaultState {
  loading: boolean;
  value: TAny;
  error: IError | null;
}

export type TFReducer = (
  state: IDefaultState,
  action: IGenericAction
) => TAnyObject;

export type TFGenerateReducer = (
  state: IDefaultState,
  action: IGenericAction,
  actionName: string
) => TAnyObject;

export interface IGenericResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

export interface IGenericAction extends IAction {
  payload: IGenericResponse | null;
}

export interface IError {
  ok: boolean;
  message: string;
  status: number;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IAsyncState<T = any> {
  error: IError | null;
  loading: boolean;
  value: T;
}

export type ExpirationStatus = 'expired' | 'active' | 'grace';

export interface Session {
  id: number;
  dateCreated: number;
  username: string;
  issued: number;
  expires: number;
}

export type DecodeResult =
  | {
      type: 'valid';
      session: Session;
    }
  | {
      type: 'integrity-error';
    }
  | {
      type: 'invalid-token';
    };

export interface IDetailsAPIReqWithDates {
  id: number;
  from: string;
  to: string;
}

export interface IDetailsAPIReq {
  id: number;
}

export interface INewAttendance {
  userId: number;
  date: string;
  inTime: string;
  outTime: string;
}

export interface ILoginData {
  userId: number;
  password: string;
}

export interface ILoginAPI {
  token: string;
  issued: number;
  expires: number;
  loginStatus: number;
  message: string;
  userId: number;
}

export interface ILoginAction extends IAction {
  payload: ILoginAPI | null;
}

export interface IRegistration {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface ILabelValue {
  value: number;
  label: string;
}

export interface IDesignationListAPI {
  data: ILabelValue[];
}

export interface IDesignationListAction extends IAction {
  payload: ILabelValue[] | null;
}

export interface IRegisterAPI {
  name: string;
  designation: number;
  manager: number;
  password: string;
  email: string;
}

export interface IRegisterAction extends IAction {
  payload: IRegisterAPI | null;
}

export interface ILeaveCountByMonth {
  days: number;
  month: string;
}

export interface INewLeave {
  leaveTypeId: number;
  fromDate: string;
  toDate: string;
  userId: number;
}

export interface IEvent {
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
}

interface IEventItemAPI {
  attendance_date?: string;
  start_time?: string;
  end_time?: string;
  from_date?: string;
  to_date?: string;
  leave_type?: string;
}

export interface IEventDetailsAPI {
  data: IEventItemAPI[];
}

export interface IAction {
  type: string;
}

export interface IUserListAction extends IAction {
  payload: IUserAPI[] | null;
}

export interface IUserInfoAction extends IAction {
  payload: IUserInfoDataAPI[] | null;
}

export interface ILeaveBalanceAction extends IAction {
  payload: ILeaveBalanceItemAPI[] | null;
}

export interface IAttendanceDetailsAction extends IAction {
  payload: IAttendanceItemAPI[] | null;
}

export interface IEventDetailsAction extends IAction {
  payload: IEventItemAPI[] | null;
}

interface ILeaveItemAPI {
  from_date: string;
  to_date: string;
  leave_type: string;
  status: number;
}

export interface IAllLeavesAction extends IAction {
  payload: ILeaveItemAPI[] | null;
}

export interface IAllLeavesAPI {
  data: ILeaveItemAPI[];
}

export type TFAttendanceDetailsAction = (
  id: number,
  from: string,
  to: string
) => Promise<Response>;

export interface ILeave {
  leaveType: string;
  from: Date;
  to: Date;
  status: string;
  noOfDays: number;
}

export interface ILeaveInfo {
  from: string;
  to: string;
  category: string;
}

export interface ISelectLeaveType {
  value: number;
  label: string;
  balance: number;
}

export interface IDefaultRoot {
  userList: IAsyncState<ILabelValue[]>;
  userInfo: IAsyncState<IUserInfo | null>;
  leaveBalance: IAsyncState<ILeaveBalance[]>;
  attendanceDetails: IAsyncState<IAttendanceItem[]>;
  evetDetails: IAsyncState<IEvent[]>;
  allLeaves: IAsyncState<ILeave[]>;
  leaveCountByMonth: IAsyncState<ILeaveCountByMonth[] | []>;
  applyLeave: IAsyncState<IGenericResponse>;
  addAttendance: IAsyncState<IGenericResponse>;
  loginDetails: IAsyncState<ILoginAPI>;
  designationList: IAsyncState<ILabelValue[]>;
  registeration: IAsyncState<IGenericResponse>;
}

export interface IUserAPI {
  user_id: number;
  name: string;
}
export interface IUserListAPI {
  data: IUserAPI[];
}

export interface IUserInfoDataAPI {
  user_id: number;
  name: string;
  designation: string;
  manager: string;
  email: string;
}

export interface IUserInfoAPI {
  data: IUserInfoDataAPI[];
}

export interface IUserInfo {
  userId: number;
  name: string;
  designation: string;
  manager: string;
  email: string;
}

interface ILeaveBalanceItemAPI {
  leave_type_id: number;
  leave_type: string;
  balance: number;
}

export interface ILeaveBalanceAPI {
  data: ILeaveBalanceItemAPI[];
}

export interface ILeaveBalance {
  leaveTypeId: number;
  leaveType: string;
  balance: number;
}

interface IAttendanceItemAPI {
  name: string;
  attendance_date: string;
  start_time: string;
  end_time: string;
}

export interface IAttendanceDetailsAPI {
  data: IAttendanceItemAPI[];
}

export interface IAttendanceItem {
  name: string;
  attendanceDate: string;
  startTime: string;
  endTime: string;
  noOfHours: number;
}
