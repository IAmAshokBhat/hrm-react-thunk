import { Dispatch } from 'redux';
import { TAny, TAnyObject } from '../../constants';
import { TFPromise } from '../../contracts';

const setLoadingAction = (actionName: string) => ({
  type: `${actionName}_LOADING`
});

const fetchSuccessAction = (actionName: string, payload: TAnyObject) => ({
  type: `${actionName}_SUCCESS`,
  payload: payload.data
});

export const generateAction = (
  actionName: string,
  dispatch: Dispatch,
  api: TFPromise,
  payload?: TAny
) => {
  dispatch(setLoadingAction(actionName));
  return api(payload)
    .then(
      (response) => response.json(),
      (error) => console.log('An error occurred.', error)
    )
    .then((json) => {
      dispatch(fetchSuccessAction(actionName, json));
    });
};
