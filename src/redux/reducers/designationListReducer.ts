import { ACTIONS, IDesignationListAction } from '../../constants';

const initialState = {
  loading: false,
  value: [],
  error: null
};

export const designationListReducer = (
  state = initialState,
  action: IDesignationListAction = { type: '', payload: null }
) => {
  switch (action.type) {
    case ACTIONS.GET_DESIGNATION_LIST_LOADING:
      return { ...state, loading: true };
    case ACTIONS.GET_DESIGNATION_LIST_SUCCESS:
      return { ...state, loading: false, value: action.payload };
    case ACTIONS.GET_DESIGNATION_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
