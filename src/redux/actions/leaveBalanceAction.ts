import { Dispatch } from 'redux';
import { getLeaveBalanceAPI } from '../../api';
import { ACTIONS } from '../../constants';
import { generateAction } from './utils';

export const fetchLeaveBalanceAction = (id: number) => (dispatch: Dispatch) =>
  generateAction(ACTIONS.GET_LEAVE_BALANCE, dispatch, getLeaveBalanceAPI, {
    id
  });
