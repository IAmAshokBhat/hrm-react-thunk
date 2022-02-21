import { TFGenerateReducer } from '../../contracts';

export const generateReducer: TFGenerateReducer = (
  state,
  action,
  actionName
) => {
  switch (action.type) {
    case `${actionName}_LOADING`:
      return { ...state, loading: true };
    case `${actionName}_SUCCESS`:
      return { ...state, loading: false, value: action.payload || [] };
    case `${actionName}_FAILURE`:
      return { error: action.payload };
    default:
      return state;
  }
};
