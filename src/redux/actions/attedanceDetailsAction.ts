import { Dispatch } from 'redux';
import { getAllLeavesAPI, getAttendanceDetailsAPI } from '../../api';
import { ACTIONS, IAttendanceDetailsAPI } from '../../constants';
import { generateAction } from './utils';

const setAttendanceDetailsFailureAction = () => ({
  type: ACTIONS.GET_ATTENDANCE_DETAILS_FAILURE
});

const setAttendanceDetailsLoadingAction = () => ({
  type: ACTIONS.GET_ATTENDANCE_DETAILS_LOADING
});

const fetchAttendanceDetailsSuccessAction = (
  payload: IAttendanceDetailsAPI
) => ({
  type: ACTIONS.GET_ATTENDANCE_DETAILS_SUCCESS,
  payload: payload.data
});

export const fetchAttendanceDetailsAction =
  (id: number, from: string, to: string) => (dispatch: Dispatch) => {
    dispatch(setAttendanceDetailsLoadingAction());
    return getAttendanceDetailsAPI(id, from, to)
      .then(
        (response) => response.json(),
        (error) => console.log('An error occurred.', error)
      )
      .then((json) => {
        const { ok } = json;
        if (!ok) {
          dispatch(setAttendanceDetailsFailureAction());
        }
        dispatch(fetchAttendanceDetailsSuccessAction(json));
      });
  };

export const fetchAllLeavesAction = (id: number) => (dispatch: Dispatch) =>
  generateAction(ACTIONS.GET_ALL_LEAVES, dispatch, getAllLeavesAPI, id);
