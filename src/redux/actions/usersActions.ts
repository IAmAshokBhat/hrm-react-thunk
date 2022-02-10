import { Dispatch } from 'redux';
import { getUserListAPI } from '../../api';
import { ACTIONS } from '../../constants';
import { generateAction } from './utils';

export const fetchUsersListAction = () => (dispatch: Dispatch) =>
  generateAction(ACTIONS.GET_USERS, dispatch, getUserListAPI);
