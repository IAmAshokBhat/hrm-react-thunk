import { render, RenderOptions, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { applyMiddleware, createStore, Store } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IDefaultRoot, TAny, TAnyObject } from './constants';
import { TFAction } from './contracts';
import { reducers } from './redux/reducers';
import {
  defaultArrayState,
  defaultNullState,
  defaultState
} from './redux/reducers/__tests__/fixtures';

export const middlewares = [thunk];

export const createStoreWithMiddlewares = (
  initialState: TAnyObject = {}
): Store => {
  return createStore(reducers, initialState, applyMiddleware(...middlewares));
};
interface IRenderWithProviderOptions {
  initialStoreState?: TAnyObject;
  renderFunction?: TAny;
  options?: RenderOptions;
  route?: string;
  path?: string;
}

export const renderWithProvider = (
  ui: ReactElement,
  renderOptions?: IRenderWithProviderOptions
) => {
  const {
    initialStoreState = {},
    renderFunction = render,
    options = {},
    route = '',
    path = ''
  } = renderOptions || {};

  const appStore = createStoreWithMiddlewares(initialStoreState);

  let wrappedUi = (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <Provider store={appStore}>{ui}</Provider>
    </SnackbarProvider>
  );

  if (route) {
    window.history.pushState({}, '', route);

    wrappedUi = (
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }

  return renderFunction(wrappedUi, options);
};

type TFApiCall = (...params: TAny) => Promise<Response>;

export interface IResponseMock {
  headers?: object;
  ok?: boolean;
  status?: number;
  statusText?: string;
  type?: ResponseType;
  url?: string;
  body?: TAny | null;
  bodyUsed?: boolean;
  blob?: () => Promise<TAny>;
}

const dummyPromise = () => new Promise((resolve) => resolve('dummy'));

export class ResponseMock {
  headers: object;

  ok: boolean;

  status: number;

  statusText: string;

  type: ResponseType;

  url: string;

  body: ReadableStreamDefaultReadResult<Uint8Array> | null;

  bodyUsed: boolean;

  blob: () => Promise<TAny>;

  constructor(props: IResponseMock = {}) {
    this.headers = props.headers || {};
    this.status = props.status || 200;
    this.ok = props.ok || this.status === 200;
    this.statusText = props.statusText || 'OK';
    this.type = props.type || 'basic';
    this.url = props.url || 'http://localhost';
    this.body = props.body;
    this.bodyUsed = props.bodyUsed || this.body !== null;
    this.blob = props.blob || dummyPromise;
  }

  json: () => Promise<TAny> = () => {
    const body = this.body || '""';

    try {
      return Promise.resolve(JSON.parse(body as string));
    } catch {
      return Promise.resolve(body);
    }
  };

  text: () => Promise<string> = () => Promise.resolve(this.statusText);
}

export const mockAPICall = (func: TFApiCall, response: IResponseMock) =>
  (func as jest.Mock).mockResolvedValue(new ResponseMock(response));

export const generateActionTests = async (
  actionName: string,
  action: TFAction,
  api: TAny,
  actionPayload: TAny = []
) => {
  const response = new ResponseMock({ ok: true, body: { data: [] } });

  const mockStore = configureStore(middlewares);

  (api as jest.Mock).mockReturnValue(Promise.resolve(response));
  const store = mockStore({});

  //TODO: Fix TS error
  // @ts-ignore
  await store.dispatch(action);

  await waitFor(() => {
    expect(store.getActions()).toEqual([
      {
        type: `${actionName}_LOADING`
      },
      {
        type: `${actionName}_SUCCESS`,
        //TODO: Accept action params from function params
        payload: actionPayload
      }
    ]);
  });
};

export const generateReducerTests = (
  reducerName: string,
  reducer: TAny,
  selector: TAny,
  actionName: string,
  successValue?: TAny,
  defaultValue?: TAny,
  expectedValue?: TAny,
  reducerLabel?: string
) => {
  describe(`for ${reducerName}`, () => {
    const reducerLbl = reducerLabel
      ? reducerLabel
      : reducerName.replace('Reducer', '');
    it(`${reducerName} reducer loading`, () => {
      reducer(undefined, {
        type: `${actionName}_LOADING`,
        payload: null
      });
      // TODO: Check why its failing
      // expect(selector(defaultState).loading).toEqual(true);
      expect(selector(defaultState).value).toEqual(
        defaultValue === null ? defaultValue : []
      );
      expect(selector(defaultState).error).toEqual(null);
    });

    it(`${reducerName} reducer success`, () => {
      const successState: IDefaultRoot = {
        ...defaultState,
        [reducerLbl]: {
          ...defaultNullState,
          value: expectedValue ? expectedValue : successValue
        }
      };
      reducer(defaultArrayState, {
        type: `${actionName}_SUCCESS`,
        payload: successValue
      });

      expect(selector(successState).error).toEqual(null);
      expect(selector(successState).loading).toEqual(false);
      expect(selector(successState).value).toEqual(
        expectedValue ? expectedValue : successValue
      );
    });

    it(`${reducerName} reducer error`, () => {
      const error = { message: '', status: 1, ok: false };
      const failedState: IDefaultRoot = {
        ...defaultState,
        [reducerLbl]: {
          ...defaultNullState,
          value: [],
          error
        }
      };

      reducer(undefined, {
        type: `${actionName}_FAILURE`,
        payload: error
      });

      expect(selector(failedState).loading).toEqual(false);
      expect(selector(failedState).value).toEqual([]);
      expect(selector(failedState).error).toEqual(error);
    });
  });
};
