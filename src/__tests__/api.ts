import * as Apis from '../api';
import { API_URL } from '../constants';
import * as util from '../utils';

jest.mock('../utils', () => ({
  fetchWithToken: jest.fn(),
  getToken: jest.fn()
}));

describe('API testcases', () => {
  it('should fetch user list', () => {
    Apis.getUserListAPI();

    expect(util.fetchWithToken).toHaveBeenCalledWith(`${API_URL}user/list`);
  });

  it('should fetch designation list', () => {
    Apis.getDesignationListAPI();

    expect(util.fetchWithToken).toHaveBeenCalledWith(`${API_URL}designation`);
  });

  it('should fetch user details', () => {
    Apis.getUserDetailsAPI({ id: 1 });

    expect(util.fetchWithToken).toHaveBeenCalledWith(`${API_URL}api/users/1`);
  });

  it('should fetch attendance details', () => {
    const id = 1;
    const from = '01-01-2022';
    const to = '31-01-2022';

    Apis.getAttendanceDetailsAPI({ id, from, to });

    expect(util.fetchWithToken).toHaveBeenCalledWith(
      `${API_URL}api/attendance/${id}?from=${from}&to=${to}`
    );
  });

  it('should fetch event details', () => {
    const id = 1;
    const from = '01-01-2022';
    const to = '31-01-2022';

    Apis.getEventDetailsAPI({ id, from, to });

    expect(util.fetchWithToken).toHaveBeenCalledWith(
      `${API_URL}api/events/${id}?from=${from}&to=${to}`
    );
  });

  it('should fetch leave balance', () => {
    Apis.getLeaveBalanceAPI({ id: 1 });

    expect(util.fetchWithToken).toHaveBeenCalledWith(`${API_URL}api/leaves/1`);
  });

  it('should fetch all leave', () => {
    Apis.getAllLeavesAPI({ id: 1 });

    expect(util.fetchWithToken).toHaveBeenCalledWith(
      `${API_URL}api/all-leaves/1`
    );
  });

  it('should be able to apply leave', () => {
    const leaveData = {
      fromDate: '01-01-2022',
      toDate: '31-01-2022',
      userId: 1,
      leaveTypeId: 1
    };

    Apis.applyLeaveAPI(leaveData);

    expect(util.fetchWithToken).toHaveBeenCalledWith(
      `${API_URL}api/apply-leave`,
      {
        method: 'POST',
        body: JSON.stringify(leaveData)
      }
    );
  });

  it('should be able to add attendance', () => {
    const attendanceData = {
      date: '01-01-2022',
      inTime: '8:30:00',
      outTime: '17:30:00',
      userId: 1
    };

    Apis.addAttendanceAPI(attendanceData);

    expect(util.fetchWithToken).toHaveBeenCalledWith(
      `${API_URL}api/attendance`,
      {
        method: 'POST',
        body: JSON.stringify(attendanceData)
      }
    );
  });

  it('should be able to login', () => {
    const loginData = {
      password: 'password',
      userId: 1
    };

    Apis.loginAPI(loginData);

    expect(util.fetchWithToken).toHaveBeenCalledWith(`${API_URL}login`, {
      method: 'POST',
      body: JSON.stringify(loginData)
    });
  });

  it('should be able to register', () => {
    const registrationData = {
      password: 'password',
      name: 'name',
      designation: 1,
      email: 'email',
      manager: 1
    };

    Apis.registerAPI(registrationData);

    expect(util.fetchWithToken).toHaveBeenCalledWith(`${API_URL}user`, {
      method: 'POST',
      body: JSON.stringify(registrationData)
    });
  });
});
