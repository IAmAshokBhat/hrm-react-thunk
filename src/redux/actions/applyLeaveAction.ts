import { Dispatch } from 'redux';
import { applyLeaveAPI } from '../../api';
import { ACTIONS } from '../../constants';
import { INewLeave } from '../../contracts';
import { generateAction } from './utils';

export const applyLeaveAction = (newLeave: INewLeave) => (dispatch: Dispatch) =>
  generateAction(ACTIONS.APPLY_LEAVE, dispatch, applyLeaveAPI, newLeave, true);
