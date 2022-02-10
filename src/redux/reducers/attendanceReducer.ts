import moment from 'moment';
import { ACTIONS, IAttendanceDetailsAction } from '../../constants';

const initialState = {
  loading: false,
  value: [],
  error: null
};

export const attendanceReducer = (
  state = initialState,
  action: IAttendanceDetailsAction = { type: '', payload: null }
) => {
  switch (action.type) {
    case ACTIONS.GET_ATTENDANCE_DETAILS_LOADING:
      return { ...state, loading: true };
    case ACTIONS.GET_ATTENDANCE_DETAILS_SUCCESS:
      const value = action.payload
        ? action.payload.map(({ attendance_date, start_time, end_time }) => ({
            attendanceDate: moment(attendance_date).format('DD-MM-YYYY'),
            startTime: start_time,
            endTime: end_time,
            noOfHours: moment(`2022-01-01 ${end_time}`).diff(
              `2022-01-01  ${start_time}`,
              'hours'
            )
          }))
        : [];
      return { ...state, loading: false, value };
    case ACTIONS.GET_ATTENDANCE_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
