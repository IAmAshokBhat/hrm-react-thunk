import { AnyAction, Dispatch } from 'redux';
import { TAny, TAnyObject } from './constants';

export type TFPromise = (params: TAny) => Promise<TAnyObject>;

export type TFPromiseAPI = (params?: TAny | TAnyObject) => Promise<TAnyObject>;

export type TFAction = (dispatch: Dispatch<AnyAction>) => Promise<void>;

/*
()
(1,2,3)
({key:value})
**
*/
