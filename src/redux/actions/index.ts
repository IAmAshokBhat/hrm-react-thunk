import { fetchUserDetailsAction } from './userInfoAction';
import { fetchUsersListAction } from './usersActions';
import {
  fetchAttendanceDetailsAction,
  fetchAllLeavesAction
} from './attedanceDetailsAction';
import { fetchLeaveBalanceAction } from './leaveBalanceAction';
import { fetchEventDetailsAction } from './eventDetailsAction';
import { applyLeaveAction } from './applyLeaveAction';
import { addAttendanceAction } from './addAttendanceAction';
import { loginAction } from './loginAction';
import { registerAction } from './registerAction';
import { fetchDesignationListAction } from './designationListAction';

export {
  fetchUsersListAction as fetchUsersAction,
  fetchUserDetailsAction,
  fetchAttendanceDetailsAction,
  fetchLeaveBalanceAction,
  fetchEventDetailsAction,
  applyLeaveAction,
  addAttendanceAction,
  loginAction,
  registerAction,
  fetchDesignationListAction,
  fetchAllLeavesAction
};
