import { ACTIONS, IRegisterAction } from '../../constants';

const initialState = {
  loading: false,
  value: {},
  error: null
};

export const registerReducer = (
  state = initialState,
  action: IRegisterAction = { type: '', payload: null }
) => {
  switch (action.type) {
    case ACTIONS.REGISTER_LOADING:
      return { ...state, loading: true };
    case ACTIONS.REGISTER_SUCCESS:
      return { ...state, loading: false, value: action.payload };
    case ACTIONS.REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
