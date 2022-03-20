import {
  IAllLeavesAPI,
  IAttendanceDetailsAPI,
  IDefaultRoot,
  IDesignationListAPI,
  ILabelValue,
  ILeaveBalanceAPI,
  IUserInfoDataAPI,
  IUserListAPI
} from '../../contracts';

export const defaultState: IDefaultRoot = {
  userList: { error: null, loading: false, value: [] },
  userInfo: {
    error: null,
    loading: false,
    value: {
      designation: 'Software Engineer',
      email: 'noemail@email.com',
      manager: 'XYZ',
      name: 'ABC',
      userId: 1
    }
  },
  attendanceDetails: {
    error: null,
    loading: false,
    value: [
      {
        attendanceDate: '31-01-2022',
        startTime: '08:30:00',
        endTime: '17:30:00',
        noOfHours: 9,
        name: 'ABC'
      },
      {
        attendanceDate: '01-02-2022',
        startTime: '08:30:00',
        endTime: '17:30:00',
        noOfHours: 9,
        name: 'ABC'
      },
      {
        attendanceDate: '02-02-2022',
        startTime: '08:30:00',
        endTime: '17:30:00',
        noOfHours: 9,
        name: 'ABC'
      },
      {
        attendanceDate: '03-02-2022',
        startTime: '08:30:00',
        endTime: '17:30:00',
        noOfHours: 9,
        name: 'ABC'
      }
    ]
  },
  leaveBalance: {
    error: null,
    loading: false,
    value: []
  },
  evetDetails: {
    error: null,
    loading: false,
    value: [
      {
        title: 'WORKING',
        start: '2022-02-01',
        end: '2022-02-01',
        allDay: true
      },
      {
        title: 'WORKING',
        start: '2022-02-02',
        end: '2022-02-02',
        allDay: true
      },
      {
        title: 'WORKING',
        start: '2022-02-03',
        end: '2022-02-03',
        allDay: true
      },
      {
        title: 'WORKING',
        start: '2022-02-09',
        end: '2022-02-09',
        allDay: true
      },
      {
        title: 'LEAVE',
        start: '2022-02-02',
        end: '2022-02-07',
        allDay: true
      },
      {
        title: 'LEAVE',
        start: '2022-02-10',
        end: '2022-02-12',
        allDay: true
      },
      {
        title: 'LEAVE',
        start: '2022-02-22',
        end: '2022-02-23',
        allDay: true
      }
    ]
  },
  allLeaves: {
    error: null,
    loading: false,
    value: []
  },
  leaveCountByMonth: {
    error: null,
    loading: false,
    value: []
  },
  applyLeave: {
    error: null,
    loading: false,
    value: { data: [], status: 1, message: '' }
  },
  addAttendance: {
    error: null,
    loading: false,
    value: { data: [], status: 1, message: '' }
  },
  loginDetails: {
    error: null,
    loading: false,
    value: {
      token: '',
      issued: 0,
      expires: 0,
      loginStatus: 1,
      message: 'success',
      userId: 1
    }
  },
  designationList: {
    error: null,
    loading: false,
    value: []
  },
  registeration: {
    error: null,
    loading: false,
    value: { data: [], status: 1, message: '' }
  }
};

export const userListAPIResponse: IUserListAPI = {
  data: [{ name: 'x', user_id: 1 }]
};

export const attendanceDetailsAPIResponse: IAttendanceDetailsAPI = {
  data: [
    {
      attendance_date: '31-01-2022',
      start_time: '08:30:00',
      end_time: '17:30:00',
      name: 'ABC'
    },
    {
      attendance_date: '01-02-2022',
      start_time: '08:30:00',
      end_time: '17:30:00',
      name: 'ABC'
    },
    {
      attendance_date: '02-02-2022',
      start_time: '08:30:00',
      end_time: '17:30:00',
      name: 'ABC'
    },
    {
      attendance_date: '03-02-2022',
      start_time: '08:30:00',
      end_time: '17:30:00',
      name: 'ABC'
    }
  ]
};

export const userInfoAPIResponse: IUserInfoDataAPI = {
  designation: 'Software Engineer',
  email: 'noemail@email.com',
  manager: 'XYZ',
  name: 'ABC',
  user_id: 1
};

export const leaveBalanceAPIResponse: ILeaveBalanceAPI = {
  data: [
    { leave_type_id: 1, leave_type: 'Earned Leave', balance: 25 },
    { leave_type_id: 2, leave_type: 'Casual- Sick Leave', balance: 12 },
    { leave_type_id: 3, leave_type: 'Paternity Leave', balance: 5 },
    { leave_type_id: 4, leave_type: 'Adoption Leave', balance: 10 },
    { leave_type_id: 5, leave_type: 'Compensatory Off', balance: 0 },
    { leave_type_id: 6, leave_type: 'Bereavement Leave', balance: 10 },
    { leave_type_id: 7, leave_type: 'Loss of Pay', balance: 0 },
    { leave_type_id: 8, leave_type: 'COVID Medical Leave', balance: 10 },
    { leave_type_id: 9, leave_type: 'Tenure Leave', balance: 2 },
    { leave_type_id: 10, leave_type: 'Vaccination Leave', balance: 0 }
  ]
};

export const allLeavesAPIResponse: IAllLeavesAPI = {
  data: [
    {
      from_date: '2022-01-31',
      to_date: '2022-02-07',
      leave_type: 'Earned Leave',
      status: 0
    },
    {
      from_date: '2022-02-10',
      to_date: '2022-02-12',
      leave_type: 'Earned Leave',
      status: 0
    },
    {
      from_date: '2022-02-22',
      to_date: '2022-02-23',
      leave_type: 'Earned Leave',
      status: 1
    }
  ]
};

export const designationListAPIResponse: IDesignationListAPI = {
  data: [
    { value: 1, label: 'Associate Software Engineer' },
    { value: 2, label: 'Software Engineer I' },
    { value: 3, label: 'Software Engineer II' },
    { value: 4, label: 'Senior Software Engineer I' },
    { value: 5, label: 'Senior Software Engineer II' },
    { value: 6, label: 'Technical Lead I' },
    { value: 7, label: 'Technical Lead II' },
    { value: 8, label: 'Architech I' },
    { value: 9, label: 'Architech II' },
    { value: 10, label: 'Engineering Manager' },
    { value: 11, label: 'Vice Manager' },
    { value: 12, label: 'Associate Director' },
    { value: 13, label: 'Director' },
    { value: 14, label: 'Vice President' },
    { value: 15, label: 'Senior Vice President' },
    { value: 16, label: 'Chief Technology Officer' },
    { value: 17, label: 'Chief People Officer' },
    { value: 18, label: 'Chief Operations Officer' },
    { value: 19, label: 'Chief Executive Officer' }
  ]
};

export const userListState: ILabelValue[] = [{ label: 'x', value: 1 }];
