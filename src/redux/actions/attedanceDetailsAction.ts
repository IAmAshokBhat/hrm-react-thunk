import { Dispatch } from 'redux';
import { getAllLeavesAPI, getAttendanceDetailsAPI } from '../../api';
import { ACTIONS } from '../../constants';
import { generateAction } from './utils';

export const fetchAttendanceDetailsAction =
  (id: number, from: string, to: string) => (dispatch: Dispatch) =>
    generateAction(
      ACTIONS.GET_ATTENDANCE_DETAILS,
      dispatch,
      getAttendanceDetailsAPI,
      { id, from, to }
    );

export const fetchAllLeavesAction = (id: number) => (dispatch: Dispatch) =>
  generateAction(ACTIONS.GET_ALL_LEAVES, dispatch, getAllLeavesAPI, { id });
