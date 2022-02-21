import moment from 'moment';
import {
  ACTIONS,
  DATE_FORMAT,
  defaultAction,
  IAllLeavesAction
} from '../../constants';

const initialState = {
  loading: false,
  value: [],
  error: null
};

export const allLeavesReducer = (
  state = initialState,
  action: IAllLeavesAction = defaultAction
) => {
  switch (action.type) {
    case `${ACTIONS.GET_ALL_LEAVES}_LOADING`:
      return { ...state, loading: true };
    case `${ACTIONS.GET_ALL_LEAVES}_SUCCESS`:
      const value = action.payload
        ? action.payload.map(({ from_date, to_date, leave_type, status }) => ({
            from: moment(from_date).format(DATE_FORMAT),
            to: moment(to_date).format(DATE_FORMAT),
            noOfDays: moment(to_date).diff(moment(from_date), 'days') + 1,
            leaveType: leave_type,
            status: status === 0 ? 'Pending' : 'Approved'
          }))
        : [];
      return { ...state, loading: false, value };
    case `${ACTIONS.GET_ALL_LEAVES}_FAILURE`:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
