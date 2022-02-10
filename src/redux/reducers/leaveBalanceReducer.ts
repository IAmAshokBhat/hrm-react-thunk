import { ACTIONS, ILeaveBalance, ILeaveBalanceAction } from '../../constants';

const initialState = {
  loading: false,
  value: [],
  error: null
};

export const leaveBalanceReducer = (
  state = initialState,
  action: ILeaveBalanceAction = { type: '', payload: null }
) => {
  switch (action.type) {
    case ACTIONS.GET_LEAVE_BALANCE_LOADING:
      return { ...state, loading: true };
    case ACTIONS.GET_LEAVE_BALANCE_SUCCESS:
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
    case ACTIONS.GET_LEAVE_BALANCE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
