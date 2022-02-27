import { Dispatch } from 'redux';
import { addAttendanceAPI } from '../../api';
import { ACTIONS } from '../../constants';
import { INewAttendance } from '../../contracts';
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
