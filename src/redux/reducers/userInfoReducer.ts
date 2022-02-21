import { ACTIONS, defaultAction, IUserInfoAction } from '../../constants';

const initialState = {
  loading: false,
  value: {},
  error: null
};

export const userInfoReducer = (
  state = initialState,
  action: IUserInfoAction = defaultAction
) => {
  switch (action.type) {
    case `${ACTIONS.GET_USER_DETAILS}_LOADING`:
      return { ...state, loading: true };
    case `${ACTIONS.GET_USER_DETAILS}_SUCCESS`:
      let value = {};
      if (action.payload) {
        // eslint-disable-next-line
        const { user_id, name, designation, manager, email } = action.payload;
        value = { userId: user_id, name, designation, manager, email };
      }

      return { loading: false, value };
    case `${ACTIONS.GET_USER_DETAILS}_FAILURE`:
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};
