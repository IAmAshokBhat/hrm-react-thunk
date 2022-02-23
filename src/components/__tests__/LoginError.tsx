import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { loginAPI } from '../../api';
import { TAnyObject } from '../../constants';
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

const errorLoginResponse = {
  ok: false,
  body: {
    loginStatus: 0,
    message: 'Invalid username/password',
    status: 400
  },
  status: 400
};

describe('Login Page error', () => {
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

  it('should throw error when invalid username/password is entered', async () => {
    const loginActionSpy = jest.spyOn(Actions, 'loginAction');

    mockAPICall(loginAPI, errorLoginResponse);

    generateNode();

    userEvent.type(screen.getByPlaceholderText(/User Id/i), '5');
    userEvent.type(
      screen.getByPlaceholderText(/Password/i),
      'invalid-password'
    );
    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: 'Login' }))
    );

    await waitFor(() =>
      expect(loginActionSpy).toHaveBeenCalledWith({
        password: 'invalid-password',
        userId: '5'
      })
    );

    await waitFor(() =>
      expect(loginAPI).toHaveBeenCalledWith({
        password: 'invalid-password',
        userId: '5'
      })
    );
    expect(mockEnqueue).toHaveBeenCalled();
  });
});
