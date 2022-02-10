import { combineReducers } from 'redux';
import { userListReducer } from './userListReducer';
import { userInfoReducer } from './userInfoReducer';
import { attendanceReducer } from './attendanceReducer';
import { leaveBalanceReducer } from './leaveBalanceReducer';
import { eventReducer } from './eventReducer';
import { allLeavesReducer } from './allLeavesReducer';
import { leaveCountByMonthReducer } from './leaveCountByMonth';
import { applyLeaveReducer } from './applyLeaveReducer';
import { addAttendanceReducer } from './addAttendanceReducer';
import { loginReducer } from './loginReducer';
import { designationListReducer } from './designationListReducer';
import { registerReducer } from './registerReducer';

export const reducers = combineReducers({
  userList: userListReducer,
  userInfo: userInfoReducer,
  attendanceDetails: attendanceReducer,
  leaveBalance: leaveBalanceReducer,
  evetDetails: eventReducer,
  allLeaves: allLeavesReducer,
  leaveCountByMonth: leaveCountByMonthReducer,
  applyLeave: applyLeaveReducer,
  addAttendance: addAttendanceReducer,
  loginDetails: loginReducer,
  designationList: designationListReducer,
  registeration: registerReducer
});
