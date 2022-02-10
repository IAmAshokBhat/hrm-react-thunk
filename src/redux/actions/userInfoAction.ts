import { Dispatch } from 'redux';
import { getUserDetailsAPI } from '../../api';
import { ACTIONS, IError, IUserInfoAPI } from '../../constants';

const setUserDetailsLoadingAction = () => ({
  type: ACTIONS.GET_USER_DETAILS_LOADING
});

const fetchUserDetailsSuccessAction = (payload: IUserInfoAPI) => ({
  type: ACTIONS.GET_USER_DETAILS_SUCCESS,
  payload: payload.data[0]
});

const fetchUsersDetailsFailureAction = (payload: IError) => ({
  type: ACTIONS.GET_USER_DETAILS_FAILURE,
  payload
});

export const fetchUserDetailsAction = (id: number) => (dispatch: Dispatch) => {
  dispatch(setUserDetailsLoadingAction());
  return getUserDetailsAPI(id)
    .then(
      (response) => response.json(),
      (error) => console.log('An error occurred.', error)
    )
    .then((json) => {
      const { ok } = json;
      if (!ok) {
        dispatch(fetchUsersDetailsFailureAction(json));
      }
      dispatch(fetchUserDetailsSuccessAction(json));
    });
};

// export const fetchUserDetailsAction = (id: number) => (dispatch: Dispatch) =>
//   generateAction(ACTIONS.GET_USER_DETAILS, dispatch, getUserDetailsAPI, id);
