import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';

import App from '../App';
import {
  defaultState,
  leaveBalanceAPIResponse
} from '../components/__tests__/fixtures';
import { TAnyObject } from '../constants';
import { mockAPICall, renderWithProvider } from '../testUtils';
import * as utils from '../utils';
import { getLeaveBalanceAPI } from '../api';

jest.mock('../api', () => ({
  getLeaveBalanceAPI: jest.fn()
}));

const leaveBalanceResponse = {
  ok: true,
  body: leaveBalanceAPIResponse
};

describe('App Component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(
      <SnackbarProvider>
        <App />
      </SnackbarProvider>,
      {
        route: `/dashboard`,
        path: '/dashboard',
        initialStoreState
      }
    );

  beforeEach(() => {
    mockAPICall(getLeaveBalanceAPI, leaveBalanceResponse);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });

  it('should open apply leave dialog', async () => {
    //@ts-ignore
    utils.isValidToken = jest.fn().mockReturnValue(true);
    generateNode();

    const actionButton = screen.getByRole('button', {
      name: /all actions of leave management system/i
    });

    await waitFor(() => userEvent.click(actionButton));

    await waitFor(() =>
      userEvent.click(
        screen.getByRole('menuitem', {
          name: /apply leave/i
        })
      )
    );
    expect(
      screen.getByRole('heading', {
        name: /apply leave/i
      })
    ).toBeVisible();

    userEvent.click(
      screen.getByRole('button', {
        name: /cancel/i
      })
    );
    expect(
      screen.queryByRole('heading', {
        name: /apply leave/i
      })
    ).not.toBeVisible();
  });

  it('should open add attendance dialog', async () => {
    //@ts-ignore
    utils.isValidToken = jest.fn().mockReturnValue(true);
    generateNode();

    const actionButton = screen.getByRole('button', {
      name: /all actions of leave management system/i
    });

    await waitFor(() => userEvent.click(actionButton));

    await waitFor(() =>
      userEvent.click(
        screen.getByRole('menuitem', {
          name: /add attendance/i
        })
      )
    );
    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          name: /add attendance/i
        })
      ).toBeVisible()
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /cancel/i
      })
    );
    expect(
      screen.queryByRole('heading', {
        name: /add attendance/i
      })
    ).not.toBeVisible();
  });
});
