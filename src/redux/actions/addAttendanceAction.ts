import { Dispatch } from 'redux';
import { addAttendanceAPI } from '../../api';
import { ACTIONS, INewAttendance } from '../../constants';
import { generateAction } from './utils';

export const addAttendanceAction =
  (newAttendance: INewAttendance) => (dispatch: Dispatch) =>
    generateAction(
      ACTIONS.ADD_ATTENDANCE,
      dispatch,
      addAttendanceAPI,
      newAttendance,
      true
    );
