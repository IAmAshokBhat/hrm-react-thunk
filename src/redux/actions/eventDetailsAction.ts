import { Dispatch } from 'redux';
import { getEventDetailsAPI } from '../../api';
import { ACTIONS } from '../../constants';
import { generateAction } from './utils';

export const fetchEventDetailsAction =
  (id: number, from: string, to: string) => (dispatch: Dispatch) =>
    generateAction(ACTIONS.GET_EVENT_DETAILS, dispatch, getEventDetailsAPI, {
      id,
      from,
      to
    });
