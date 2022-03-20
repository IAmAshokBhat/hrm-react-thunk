import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { getDesignationListAPI, getUserListAPI, registerAPI } from '../../api';
import { TAnyObject } from '../../contracts';
import * as Actions from '../../redux/actions/registerAction';
import { mockAPICall, renderWithProvider } from '../../testUtils';
import { RegistrationPage } from '../RegistrationPage';
import {
  defaultState,
  designationListAPIResponse,
  userListState
} from './fixtures';

jest.mock('../../api', () => ({
  registerAPI: jest.fn(),
  getDesignationListAPI: jest.fn(),
  getUserListAPI: jest.fn()
}));

const mockEnqueue = jest.fn();

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue
    };
  }
}));

describe('Registration Page', () => {
  beforeEach(() => {
    mockAPICall(registerAPI, {
      ok: true,
      body: { data: [], message: 'success', status: 200 }
    });
    mockAPICall(getDesignationListAPI, {
      ok: true,
      body: designationListAPIResponse
    });
    mockAPICall(getUserListAPI, {
      ok: true,
      body: userListState
    });
  });

  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(
      <SnackbarProvider>
        <RegistrationPage />
      </SnackbarProvider>,
      {
        route: `/register`,
        path: '/register',
        initialStoreState
      }
    );

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });

  it('should be able to register', async () => {
    const registerActionSpy = jest.spyOn(Actions, 'registerAction');
    generateNode({
      ...defaultState,
      designationList: {
        error: null,
        loading: false,
        value: designationListAPIResponse.data
      },
      userList: { error: null, loading: false, value: userListState }
    });
    const registerBtn = screen.getByRole('button', { name: 'Register' });

    expect(registerBtn).toBeDisabled();
    userEvent.type(screen.getByPlaceholderText(/User Name/i), 'test name');
    userEvent.type(screen.getByPlaceholderText(/Email/i), 'test email');
    userEvent.click(
      screen.getByRole('textbox', {
        name: /designation/i
      })
    );
    userEvent.click(screen.getByRole('option', { name: 'Vice President' }));
    userEvent.click(
      screen.getByRole('textbox', {
        name: /manager/i
      })
    );
    userEvent.click(screen.getByRole('option', { name: 'x' }));
    const passwordEl = screen.getByTestId('password');
    await waitFor(() => userEvent.type(passwordEl, 'p'));
    expect(passwordEl).toHaveValue('p');
    const confirmPasswordEl = screen.getByLabelText(/confirm password/i);
    userEvent.type(confirmPasswordEl, 'd');
    expect(confirmPasswordEl).toHaveAttribute('aria-invalid', 'true');
    await waitFor(() => userEvent.clear(confirmPasswordEl));
    await waitFor(() => userEvent.type(confirmPasswordEl, 'p'));
    expect(confirmPasswordEl).toHaveValue('p');
    expect(confirmPasswordEl).toHaveAttribute('aria-invalid', 'false');

    await waitFor(() => userEvent.click(registerBtn));

    await waitFor(() =>
      expect(registerActionSpy).toHaveBeenCalledWith({
        designation: 14,
        email: 'test email',
        manager: 1,
        name: 'test name',
        password: 'p'
      })
    );

    await waitFor(() =>
      expect(registerAPI).toHaveBeenCalledWith({
        designation: 14,
        email: 'test email',
        manager: 1,
        name: 'test name',
        password: 'p'
      })
    );

    expect(mockEnqueue).toHaveBeenCalled();
  });
});
