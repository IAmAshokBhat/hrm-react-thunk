import { ACTIONS, IUserInfoAction } from '../../constants';

const initialState = {
  loading: false,
  value: {},
  error: null
};

export const userInfoReducer = (
  state = initialState,
  action: IUserInfoAction = { type: '', payload: null }
) => {
  switch (action.type) {
    case ACTIONS.GET_USER_DETAILS_LOADING:
      return { ...state, loading: true };
    case ACTIONS.GET_USER_DETAILS_SUCCESS:
      let value = {};
      if (action.payload) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { user_id, name, designation, manager, email } = action.payload;
        value = { userId: user_id, name, designation, manager, email };
      }

      return { loading: false, value };
    case ACTIONS.GET_USER_DETAILS_FAILURE:
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};
