import * as api from '../../../api';
import { ACTIONS } from '../../../constants';
import { INewAttendance, INewLeave, IRegisterAPI } from '../../../contracts';
import { generateActionTests } from '../../../testUtils';
import * as actions from '../index';

jest.mock('../../../api', () => ({
  getAllLeavesAPI: jest.fn(),
  getAttendanceDetailsAPI: jest.fn(),
  getDesignationListAPI: jest.fn(),
  getEventDetailsAPI: jest.fn(),
  getLeaveBalanceAPI: jest.fn(),
  getUserDetailsAPI: jest.fn(),
  getUserListAPI: jest.fn(),
  loginAPI: jest.fn(),
  registerAPI: jest.fn(),
  addAttendanceAPI: jest.fn(),
  applyLeaveAPI: jest.fn()
}));

describe('Action tests', () => {
  it('Desgination list action test', async () => {
    generateActionTests(
      ACTIONS.GET_DESIGNATION_LIST,
      actions.fetchDesignationListAction(),
      api.getDesignationListAPI
    );
  });

  it('All leaves action test', async () => {
    generateActionTests(
      ACTIONS.GET_ALL_LEAVES,
      actions.fetchAllLeavesAction(1),
      api.getAllLeavesAPI({ id: 1 })
    );
  });

  it('Attendance details action test', async () => {
    generateActionTests(
      ACTIONS.GET_ATTENDANCE_DETAILS,
      actions.fetchAttendanceDetailsAction(1, '01-01-2022', '31-01-2022'),
      api.getAttendanceDetailsAPI({
        id: 1,
        from: '01-01-2022',
        to: '31-01-2022'
      })
    );
  });

  it('Event details action test', async () => {
    generateActionTests(
      ACTIONS.GET_EVENT_DETAILS,
      actions.fetchEventDetailsAction(1, '01-01-2022', '31-01-2022'),
      api.getEventDetailsAPI({
        id: 1,
        from: '01-01-2022',
        to: '31-01-2022'
      })
    );
  });

  it('Leave balance action test', async () => {
    generateActionTests(
      ACTIONS.GET_LEAVE_BALANCE,
      actions.fetchLeaveBalanceAction(1),
      api.getLeaveBalanceAPI({ id: 1 })
    );
  });

  it('User details action test', async () => {
    generateActionTests(
      ACTIONS.GET_USER_DETAILS,
      actions.fetchUserDetailsAction(1),
      api.getUserDetailsAPI({ id: 1 })
    );
  });

  it('User list action test', async () => {
    generateActionTests(
      ACTIONS.GET_USERS,
      actions.fetchUsersAction(),
      api.getUserListAPI()
    );
  });

  it('Login action test', async () => {
    const userInfo = { userId: 1, password: 'password' };
    const actionPayload = {
      token: 'token',
      issued: 1644407868611,
      expires: 1644408768611,
      userId: '5',
      loginStatus: 1
    };
    generateActionTests(
      ACTIONS.GET_LOGIN,
      actions.loginAction(userInfo),
      api.loginAPI(userInfo),
      actionPayload
    );
  });

  it('Register action test', async () => {
    const newUser: IRegisterAPI = {
      name: 'user',
      password: 'test',
      designation: 1,
      manager: 5,
      email: 'testemail@email'
    };
    const actionPayload = { ok: true };

    generateActionTests(
      ACTIONS.REGISTER,
      actions.registerAction(newUser),
      api.registerAPI(newUser),
      actionPayload
    );
  });

  it('Add Attendance action test', async () => {
    const newAttendance: INewAttendance = {
      date: '30-01-2022',
      inTime: '08:30:00',
      userId: 1,
      outTime: '17:30:00'
    };
    generateActionTests(
      ACTIONS.ADD_ATTENDANCE,
      actions.addAttendanceAction(newAttendance),
      api.addAttendanceAPI(newAttendance)
    );
  });

  it('Apply leave action test', async () => {
    const newLeave: INewLeave = {
      fromDate: '30-01-2022',
      toDate: '10-02-2022',
      userId: 1,
      leaveTypeId: 1
    };
    generateActionTests(
      ACTIONS.APPLY_LEAVE,
      actions.applyLeaveAction(newLeave),
      api.applyLeaveAPI(newLeave)
    );
  });
});
