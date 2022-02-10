import { IDefaultRoot } from '../constants';

export const selectUserInfo = (state: IDefaultRoot) => state.userInfo.value;

export const selectUserInfoState = (state: IDefaultRoot) => state.userInfo;

export const selectLeaveBalance = (state: IDefaultRoot) =>
  state.leaveBalance.value;

export const selectLeaveBalanceState = (state: IDefaultRoot) =>
  state.leaveBalance;

export const selectWeeklyAttendance = (state: IDefaultRoot) =>
  state.attendanceDetails.value;

export const selectMonthlyEvents = (state: IDefaultRoot) =>
  state.evetDetails.value;

export const selectMonthlyEventsState = (state: IDefaultRoot) =>
  state.evetDetails;

export const selectAllLeaves = (state: IDefaultRoot) => state.allLeaves.value;

export const selectAllLeavesState = (state: IDefaultRoot) => state.allLeaves;

export const selectLeaveCountsByMonth = (state: IDefaultRoot) =>
  state.leaveCountByMonth.value;

export const selectLeaveCountsByMonthState = (state: IDefaultRoot) =>
  state.leaveCountByMonth;

export const selectApplyLeave = (state: IDefaultRoot) => state.applyLeave.value;

export const selectApplyLeaveState = (state: IDefaultRoot) => state.applyLeave;

export const selectAddAttendance = (state: IDefaultRoot) =>
  state.addAttendance.value;

export const selectAddAttendanceState = (state: IDefaultRoot) =>
  state.addAttendance;

export const selectLoginDetails = (state: IDefaultRoot) =>
  state.loginDetails.value;

export const selectLoginDetailsState = (state: IDefaultRoot) =>
  state.loginDetails;

export const selectDesignationList = (state: IDefaultRoot) =>
  state.designationList.value;

export const selectDesignationListState = (state: IDefaultRoot) =>
  state.designationList;

export const selectUserList = (state: IDefaultRoot) => state.userList.value;

export const selectUserListState = (state: IDefaultRoot) => state.userList;

export const selectRegister = (state: IDefaultRoot) =>
  state.registeration.value;

export const selectRegisterState = (state: IDefaultRoot) => state.registeration;
