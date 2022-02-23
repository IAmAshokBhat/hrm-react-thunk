import { Dispatch } from 'redux';
import { loginAPI } from '../../api';
import { ACTIONS, ILoginAPI, ILoginData } from '../../constants';

const setLoginFailureAction = () => ({
  type: ACTIONS.LOGIN_FAILURE
});

const setLoginLoadingAction = () => ({
  type: ACTIONS.LOGIN_LOADING
});

const loginSuccessAction = (payload: ILoginAPI) => ({
  type: ACTIONS.LOGIN_SUCCESS,
  payload
});

export const loginAction = (userInfo: ILoginData) => (dispatch: Dispatch) => {
  dispatch(setLoginLoadingAction());
  return loginAPI(userInfo)
    .then((response) => {
      if (response.status !== 200) {
        dispatch(setLoginFailureAction());
      } else {
        return response.json();
      }
    })
    .then((json: ILoginAPI) => {
      if (json) {
        const { token, expires } = json;

        localStorage.setItem('userToken', token);
        localStorage.setItem('expires', expires + '');
        localStorage.setItem('userId', userInfo.userId + '');
        dispatch(loginSuccessAction(json));
      }
    });
};
