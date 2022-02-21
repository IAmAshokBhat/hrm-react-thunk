import moment from 'moment';
import {
  ACTIONS,
  DATE_FORMAT_CALENDAR,
  defaultAction,
  EventType,
  IEvent,
  IEventDetailsAction
} from '../../constants';

const initialState = {
  loading: false,
  value: [],
  error: null
};

export const eventReducer = (
  state = initialState,
  action: IEventDetailsAction = defaultAction
) => {
  switch (action.type) {
    case `${ACTIONS.GET_EVENT_DETAILS}_LOADING`:
      return { ...state, loading: true };
    case `${ACTIONS.GET_EVENT_DETAILS}_SUCCESS`:
      let value: IEvent[] = [];

      action.payload?.forEach(
        ({ attendance_date, leave_type, from_date, to_date }) => {
          // if event type is leave, add each day of leave from and to dates
          if (leave_type) {
            value.push({
              title: EventType.LEAVE,
              start: moment(from_date).format(DATE_FORMAT_CALENDAR),
              end: moment(to_date).format(DATE_FORMAT_CALENDAR),
              allDay: true
            });
          } else {
            value.push({
              title: EventType.WORKING,
              start: moment(attendance_date).format(DATE_FORMAT_CALENDAR),
              end: moment(attendance_date).format(DATE_FORMAT_CALENDAR),
              allDay: true
            });
          }
        }
      );

      return { ...state, loading: false, value };
    case `${ACTIONS.GET_EVENT_DETAILS}_FAILURE`:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
