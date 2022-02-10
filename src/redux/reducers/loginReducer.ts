import { ACTIONS, ILoginAction } from '../../constants';

const initialState = {
  loading: false,
  value: {},
  error: null
};

export const loginReducer = (
  state = initialState,
  action: ILoginAction = { type: '', payload: null }
) => {
  switch (action.type) {
    case ACTIONS.LOGIN_LOADING:
      return { ...state, loading: true };
    case ACTIONS.LOGIN_SUCCESS:
      return { loading: false, value: action.payload };
    case ACTIONS.LOGIN_FAILURE:
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};
