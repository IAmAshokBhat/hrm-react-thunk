import { ACTIONS, defaultAction } from '../../constants';
import { ILeaveBalance, ILeaveBalanceAction } from '../../contracts';

const initialState = {
  loading: false,
  value: [],
  error: null
};

export const leaveBalanceReducer = (
  state = initialState,
  action: ILeaveBalanceAction = defaultAction
) => {
  switch (action.type) {
    case `${ACTIONS.GET_LEAVE_BALANCE}_LOADING`:
      return { ...state, loading: true };
    case `${ACTIONS.GET_LEAVE_BALANCE}_SUCCESS`:
      let value: ILeaveBalance[] = [];
      if (action.payload) {
        value = action.payload.map(
          ({ leave_type_id, balance, leave_type }) => ({
            leaveTypeId: leave_type_id,
            balance,
            leaveType: leave_type
          })
        );
      }
      return { ...state, loading: false, value };
    case `${ACTIONS.GET_LEAVE_BALANCE}_FAILURE`:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
