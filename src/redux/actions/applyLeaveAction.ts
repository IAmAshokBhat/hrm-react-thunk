import { Dispatch } from 'redux';
import { applyLeaveAPI } from '../../api';
import { ACTIONS, IAttendanceDetailsAPI, INewLeave } from '../../constants';

const setApplyLeaveFailureAction = () => ({
  type: `${ACTIONS.APPLY_LEAVE}_FAILURE`
});

const setApplyLeaveLoadingAction = () => ({
  type: `${ACTIONS.APPLY_LEAVE}_LOADING`
});

const applyLeaveSuccessAction = (payload: IAttendanceDetailsAPI) => ({
  type: `${ACTIONS.APPLY_LEAVE}_SUCCESS`,
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
