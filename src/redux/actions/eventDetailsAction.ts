import { Dispatch } from 'redux';
import { getEventDetailsAPI } from '../../api';
import { ACTIONS, IEventDetailsAPI } from '../../constants';

const setEventDetailsFailureAction = () => ({
  type: ACTIONS.GET_EVENT_DETAILS_FAILURE
});

const setEventDetailsLoadingAction = () => ({
  type: ACTIONS.GET_EVENT_DETAILS_LOADING
});

const fetchEventDetailsSuccessAction = (payload: IEventDetailsAPI) => ({
  type: ACTIONS.GET_EVENT_DETAILS_SUCCESS,
  payload: payload.data
});

export const fetchEventDetailsAction =
  (id: number, from: string, to: string) => (dispatch: Dispatch) => {
    dispatch(setEventDetailsLoadingAction());
    return getEventDetailsAPI(id, from, to)
      .then(
        (response) => response.json(),
        (error) => console.log('An error occurred.', error)
      )
      .then((json) => {
        const { ok } = json;
        if (!ok) {
          dispatch(setEventDetailsFailureAction());
        }
        dispatch(fetchEventDetailsSuccessAction(json));
      });
  };
