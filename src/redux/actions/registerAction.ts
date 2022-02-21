import { Dispatch } from 'redux';
import { registerAPI } from '../../api';
import { ACTIONS, IGenericResponse, IRegisterAPI } from '../../constants';

const setRegisterFailureAction = () => ({
  type: `${ACTIONS.REGISTER}_FAILURE`
});

const setRegisterLoadingAction = () => ({
  type: `${ACTIONS.REGISTER}_LOADING`
});

const registerSuccessAction = (payload: IGenericResponse) => ({
  type: `${ACTIONS.REGISTER}_SUCCESS`,
  payload
});

export const registerAction =
  (newUser: IRegisterAPI) => (dispatch: Dispatch) => {
    dispatch(setRegisterLoadingAction());
    return registerAPI(newUser)
      .then(
        (response) => response.json(),
        (error) => console.log('An error occurred.', error)
      )
      .then((json) => {
        const { ok } = json;
        if (!ok) {
          dispatch(setRegisterFailureAction());
        }
        dispatch(registerSuccessAction(json));
      });
  };
