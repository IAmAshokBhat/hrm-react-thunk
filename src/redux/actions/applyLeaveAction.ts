import { Dispatch } from 'redux';
import { applyLeaveAPI } from '../../api';
import { ACTIONS, INewLeave } from '../../constants';
import { generateAction } from './utils';

export const applyLeaveAction = (newLeave: INewLeave) => (dispatch: Dispatch) =>
  generateAction(ACTIONS.APPLY_LEAVE, dispatch, applyLeaveAPI, newLeave, true);
