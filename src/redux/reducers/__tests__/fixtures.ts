import { IDefaultRoot } from '../../../constants';

export const defaultNullState = {
  error: null,
  loading: false,
  value: null
};

export const defaultArrayState = {
  error: null,
  loading: false,
  value: []
};

export const defaultState: IDefaultRoot = {
  userList: defaultArrayState,
  userInfo: defaultNullState,
  attendanceDetails: defaultArrayState,
  leaveBalance: defaultArrayState,
  evetDetails: defaultArrayState,
  allLeaves: defaultArrayState,
  leaveCountByMonth: defaultArrayState,
  applyLeave: defaultNullState,
  addAttendance: defaultNullState,
  loginDetails: defaultNullState,
  designationList: defaultArrayState,
  registeration: defaultNullState
};
