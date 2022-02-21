import { ACTIONS, defaultAction } from '../../constants';
import { TFReducer } from '../../contracts';
import { generateReducer } from './utils';

const initialState = {
  loading: false,
  value: {},
  error: null
};

export const applyLeaveReducer: TFReducer = (
  state = initialState,
  action = defaultAction
) => generateReducer(state, action, ACTIONS.APPLY_LEAVE);
