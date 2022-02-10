import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { loginAPI } from '../../api';
import { TAnyObject } from '../../constants';
import { mockAPICall, renderWithProvider } from '../../testUtils';
import { LoginPage } from '../Login';
import { defaultState } from './fixtures';
import * as loginAction from '../../redux/actions/loginAction';

jest.mock('../../api', () => ({
  loginAPI: jest.fn()
}));

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

  it.only('should login when valid username and password is passed', async () => {
    const loginActionSpy = jest.spyOn(loginAction, 'loginAction');

    mockAPICall(loginAPI, {
      ok: true,
      body: {
        token: 'token',
        issued: 1644407868611,
        expires: 1644408768611,
        userId: '5',
        loginStatus: 1
      }
    });

    generateNode();

    userEvent.type(screen.getByPlaceholderText(/User Id/i), '5');
    userEvent.type(screen.getByPlaceholderText(/Password/i), 'I@mCrazy');
    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    // await waitFor(() =>
    //   expect(loginActionSpy).toHaveBeenCalledWith({
    //     password: 'I@mCrazy',
    //     userId: '5'
    //   })
    // );

    expect(loginAPI).toHaveBeenCalledWith({
      password: 'I@mCrazy',
      userId: '5'
    });
    // expect(screen.findByText('Login')).not.toBeInTheDocument();
  });
});
