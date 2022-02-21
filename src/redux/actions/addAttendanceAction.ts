import { Dispatch } from 'redux';
import { addAttendanceAPI } from '../../api';
import {
  ACTIONS,
  IAttendanceDetailsAPI,
  INewAttendance
} from '../../constants';

const setAddAttendanceFailureAction = () => ({
  type: `${ACTIONS.ADD_ATTENDANCE}_FAILURE`
});

const setAddAttendanceLoadingAction = () => ({
  type: `${ACTIONS.ADD_ATTENDANCE}_LOADING`
});

const addAttendanceSuccessAction = (payload: IAttendanceDetailsAPI) => ({
  type: `${ACTIONS.ADD_ATTENDANCE}_SUCCESS`,
  payload
});

export const addAttendanceAction =
  (newAttendance: INewAttendance) => (dispatch: Dispatch) => {
    dispatch(setAddAttendanceLoadingAction());
    return addAttendanceAPI(newAttendance)
      .then(
        (response) => response.json(),
        (error) => console.log('An error occurred.', error)
      )
      .then((json) => {
        const { ok } = json;
        if (!ok) {
          dispatch(setAddAttendanceFailureAction());
        }
        dispatch(addAttendanceSuccessAction(json));
      });
  };
