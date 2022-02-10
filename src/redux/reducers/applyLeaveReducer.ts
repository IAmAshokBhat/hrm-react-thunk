import { ACTIONS, IGenericAction } from '../../constants';

const initialState = {
  loading: false,
  value: {},
  error: null
};

export const applyLeaveReducer = (
  state = initialState,
  action: IGenericAction = { type: '', payload: null }
) => {
  switch (action.type) {
    case ACTIONS.GET_APPLY_LEAVE_LOADING:
      return { ...state, loading: true };
    case ACTIONS.GET_APPLY_LEAVE_SUCCESS:
      return { ...state, loading: false, value: action.payload || null };
    case ACTIONS.GET_APPLY_LEAVE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
