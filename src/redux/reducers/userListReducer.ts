import { ACTIONS, IUserListAction } from '../../constants';

const initialState = {
  loading: false,
  value: [],
  error: null
};

export const userListReducer = (
  state = initialState,
  action: IUserListAction = { type: '', payload: null }
) => {
  switch (action.type) {
    case ACTIONS.GET_USERS_LOADING:
      return { ...state, loading: true };
    case ACTIONS.GET_USERS_SUCCESS:
      return { ...state, loading: false, value: action.payload || [] };
    case ACTIONS.GET_USERS_FAILURE:
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};
