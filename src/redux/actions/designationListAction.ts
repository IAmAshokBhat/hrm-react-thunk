import { Dispatch } from 'redux';
import { getDesignationListAPI } from '../../api';
import { ACTIONS } from '../../constants';
import { generateAction } from './utils';

export const fetchDesignationListAction = () => (dispatch: Dispatch) =>
  generateAction(ACTIONS.GET_DESIGNATION_LIST, dispatch, getDesignationListAPI);
