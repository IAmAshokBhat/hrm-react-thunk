import { getLeaveBalanceAPI } from '../../api';
import { TAnyObject } from '../../contracts';
import { mockAPICall, renderWithProvider } from '../../testUtils';
import { LeaveTypes } from '../LeaveTypes';
import { defaultState, leaveBalanceAPIResponse } from './fixtures';

jest.mock('../../api', () => ({
  getAllLeavesAPI: jest.fn(),
  getLeaveBalanceAPI: jest.fn()
}));

const LeaveBalanceResponse = {
  ok: true,
  body: leaveBalanceAPIResponse
};

describe('Leaves Page', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<LeaveTypes />, {
      initialStoreState
    });

  beforeEach(() => {
    mockAPICall(getLeaveBalanceAPI, LeaveBalanceResponse);
  });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });
});
