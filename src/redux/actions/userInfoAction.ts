import { Dispatch } from 'redux';
import { getUserDetailsAPI } from '../../api';
import { ACTIONS } from '../../constants';
import { generateAction } from './utils';

export const fetchUserDetailsAction = (id: number) => (dispatch: Dispatch) =>
  generateAction(ACTIONS.GET_USER_DETAILS, dispatch, getUserDetailsAPI, { id });
