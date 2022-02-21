import { AnyAction, Dispatch } from 'redux';
import { IError, TAny, TAnyObject } from './constants';

export type TFPromise = (params: TAny) => Promise<TAnyObject>;

export type TFPromiseAPI = (params?: TAny | TAnyObject) => Promise<TAnyObject>;

export type TFAction = (dispatch: Dispatch<AnyAction>) => Promise<void>;

export interface IGenericAction<T = TAny> {
  type: string;
  payload: T;
}
export interface IDefaultState {
  loading: boolean;
  value: TAny;
  error: IError | null;
}

export type TFReducer = (
  state: IDefaultState,
  action: IGenericAction
) => TAnyObject;

export type TFGenerateReducer = (
  state: IDefaultState,
  action: IGenericAction,
  actionName: string
) => TAnyObject;
