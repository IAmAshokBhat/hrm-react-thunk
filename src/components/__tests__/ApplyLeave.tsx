import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { applyLeaveAPI, getLeaveBalanceAPI } from '../../api';
import { TAnyObject } from '../../constants';
import { mockAPICall, renderWithProvider } from '../../testUtils';
import { ApplyLeave } from '../ApplyLeave';
import { defaultState, leaveBalanceAPIResponse } from './fixtures';
import * as utils from '../../utils';

jest.mock('../../api', () => ({
  applyLeaveAPI: jest.fn(),
  getLeaveBalanceAPI: jest.fn()
}));

const mockOnClose = jest.fn();

const applyLeaveResponse = {
  ok: true,
  body: { data: [], message: 'success', status: 1 }
};
const leaveBalanceResponse = {
  ok: true,
  body: leaveBalanceAPIResponse
};

describe('Apply Leave component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(
      <SnackbarProvider>
        <ApplyLeave open onClose={mockOnClose} />
      </SnackbarProvider>,
      {
        route: `/dashboard`,
        path: '/dashboard',
        initialStoreState: {
          ...initialStoreState,
          leaveBalance: {
            ...initialStoreState.leaveBalance,
            value: [{ leaveTypeId: 1, balance: 25, leaveType: 'Earned Leave' }]
          }
        }
      }
    );

  beforeEach(() => {
    //@ts-ignore
    utils.getUserId = jest.fn().mockReturnValue(5);
    mockAPICall(applyLeaveAPI, applyLeaveResponse);
    mockAPICall(getLeaveBalanceAPI, leaveBalanceResponse);
  });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });

  it('should be able to apply leave', () => {
    generateNode();

    const addBtn = screen.getByRole('button', { name: 'Add' });

    expect(addBtn).toBeDisabled();

    userEvent.click(screen.getByRole('textbox', { name: /leave type/i }));

    userEvent.click(screen.getByText(/Earned Leave/i));

    userEvent.clear(screen.getByTestId('start-date-text'));
    userEvent.type(screen.getByTestId('start-date-text'), '01/01/2022');
    userEvent.clear(screen.getByTestId('end-date-text'));
    userEvent.type(screen.getByTestId('end-date-text'), '01/02/2022');

    waitFor(() => userEvent.click(addBtn));

    expect(applyLeaveAPI).toHaveBeenCalledWith({
      fromDate: '2022-01-01',
      leaveTypeId: 1,
      toDate: '2022-01-02',
      userId: 5
    });
  });

  it('should be able to close leave dialog', () => {
    generateNode();

    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();

    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
