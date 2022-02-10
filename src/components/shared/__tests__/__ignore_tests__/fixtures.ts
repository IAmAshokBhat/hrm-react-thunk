import { IAttendanceDetailsAPI, IEventDetailsAPI } from '../../../../constants';

export const evenDetailsAPI: IEventDetailsAPI = {
  data: [
    {
      attendance_date: '2022-01-31T18:30:00.000Z',
      start_time: '08:30:00',
      end_time: '17:30:00'
    },
    {
      attendance_date: '2022-02-01T18:30:00.000Z',
      start_time: '08:30:00',
      end_time: '17:30:00'
    },
    {
      attendance_date: '2022-02-02T18:30:00.000Z',
      start_time: '08:30:00',
      end_time: '17:30:00'
    },
    {
      attendance_date: '2022-02-08T18:30:00.000Z',
      start_time: '08:30:00',
      end_time: '17:30:00'
    },
    {
      from_date: '02-02-2022',
      to_date: '02-07-2022',
      leave_type: 'Earned Leave'
    },
    {
      from_date: '02-10-2022',
      to_date: '02-12-2022',
      leave_type: 'Earned Leave'
    },
    {
      from_date: '02-22-2022',
      to_date: '02-23-2022',
      leave_type: 'Earned Leave'
    }
  ]
};

export const attendanceDetailsAPI: IAttendanceDetailsAPI = {
  data: [
    {
      name: 'Ashok H Bhat',
      attendance_date: '2022-01-30T18:30:00.000Z',
      start_time: '08:30:00',
      end_time: '17:30:00'
    },
    {
      name: 'Ashok H Bhat',
      attendance_date: '2022-01-31T18:30:00.000Z',
      start_time: '08:30:00',
      end_time: '17:30:00'
    },
    {
      name: 'Ashok H Bhat',
      attendance_date: '2022-02-01T18:30:00.000Z',
      start_time: '08:30:00',
      end_time: '17:30:00'
    },
    {
      name: 'Ashok H Bhat',
      attendance_date: '2022-02-02T18:30:00.000Z',
      start_time: '08:30:00',
      end_time: '17:30:00'
    }
  ]
};
