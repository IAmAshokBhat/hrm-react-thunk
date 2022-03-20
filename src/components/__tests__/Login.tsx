import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { loginAPI } from '../../api';
import { TAnyObject } from '../../contracts';
import * as Actions from '../../redux/actions/loginAction';
import { mockAPICall, renderWithProvider } from '../../testUtils';
import { LoginPage } from '../Login';
import { defaultState } from './fixtures';

const mockEnqueue = jest.fn();

jest.mock('../../api', () => ({
  loginAPI: jest.fn()
}));

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue
    };
  }
}));

const loginResponse = {
  ok: true,
  body: {
    token: 'token',
    issued: 1644407868611,
    expires: 1644408768611,
    userId: '5',
    loginStatus: 1,
    message: 'success',
    status: 200
  }
};

describe('Login Page', () => {
  const generateNode = (
    initialStoreState: TAnyObject = defaultState,
    route = '/login'
  ) =>
    renderWithProvider(
      <SnackbarProvider>
        <LoginPage />
      </SnackbarProvider>,
      {
        route,
        path: '/login',
        initialStoreState
      }
    );

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });

  it('should login when valid username and password is entered', async () => {
    const loginActionSpy = jest.spyOn(Actions, 'loginAction');

    mockAPICall(loginAPI, loginResponse);

    generateNode();

    userEvent.type(screen.getByPlaceholderText(/User Id/i), '5');
    userEvent.type(screen.getByPlaceholderText(/Password/i), 'I@mCrazy');
    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: 'Login' }))
    );

    await waitFor(() =>
      expect(loginActionSpy).toHaveBeenCalledWith({
        password: 'I@mCrazy',
        userId: '5'
      })
    );

    await waitFor(() =>
      expect(loginAPI).toHaveBeenCalledWith({
        password: 'I@mCrazy',
        userId: '5'
      })
    );
  });
});
