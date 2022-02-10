import { Dispatch } from 'redux';
import { applyLeaveAPI } from '../../api';
import { ACTIONS, IAttendanceDetailsAPI, INewLeave } from '../../constants';

const setApplyLeaveFailureAction = () => ({
  type: ACTIONS.GET_APPLY_LEAVE_FAILURE
});

const setApplyLeaveLoadingAction = () => ({
  type: ACTIONS.GET_APPLY_LEAVE_LOADING
});

const applyLeaveSuccessAction = (payload: IAttendanceDetailsAPI) => ({
  type: ACTIONS.GET_APPLY_LEAVE_SUCCESS,
  payload
});

export const applyLeaveAction =
  (newLeave: INewLeave) => (dispatch: Dispatch) => {
    dispatch(setApplyLeaveLoadingAction());
    return applyLeaveAPI(newLeave)
      .then(
        (response) => response.json(),
        (error) => console.log('An error occurred.', error)
      )
      .then((json) => {
        const { ok } = json;
        if (!ok) {
          dispatch(setApplyLeaveFailureAction());
        }
        dispatch(applyLeaveSuccessAction(json));
      });
  };
