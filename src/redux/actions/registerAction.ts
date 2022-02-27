import { Dispatch } from 'redux';
import { registerAPI } from '../../api';
import { ACTIONS } from '../../constants';
import { IRegisterAPI } from '../../contracts';
import { generateAction } from './utils';

export const registerAction = (newUser: IRegisterAPI) => (dispatch: Dispatch) =>
  generateAction(ACTIONS.REGISTER, dispatch, registerAPI, newUser, true);
