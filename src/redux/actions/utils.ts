import { Dispatch } from 'redux';
import { TAnyObject } from '../../constants';
import { TFPromise } from '../../contracts';

const setLoadingAction = (actionName: string) => ({
  type: `${actionName}_LOADING`
});

const fetchSuccessAction = (
  actionName: string,
  payload: TAnyObject,
  reqCmpltPayload: boolean = false
) => ({
  type: `${actionName}_SUCCESS`,
  payload: reqCmpltPayload ? payload : payload.data
});

export const generateAction = (
  actionName: string,
  dispatch: Dispatch,
  api: TFPromise,
  payload?: TAnyObject,
  reqCmpltPayload?: boolean
) => {
  dispatch(setLoadingAction(actionName));
  return api(payload)
    .then(
      (response) => response.json(),
      (error) => console.log('An error occurred.', error)
    )
    .then((json) => {
      dispatch(fetchSuccessAction(actionName, json, reqCmpltPayload));
    });
};
