import { ACTIONS, IGenericAction } from '../../constants';

const initialState = {
  loading: false,
  value: {},
  error: null
};

export const addAttendanceReducer = (
  state = initialState,
  action: IGenericAction = { type: '', payload: null }
) => {
  switch (action.type) {
    case ACTIONS.GET_ADD_ATTENDANCE_LOADING:
      return { ...state, loading: true };
    case ACTIONS.GET_ADD_ATTENDANCE_SUCCESS:
      return { ...state, loading: false, value: action.payload || null };
    case ACTIONS.GET_ADD_ATTENDANCE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
