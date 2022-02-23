import { getAllLeavesAPI, getLeaveBalanceAPI } from '../../api';
import { TAnyObject } from '../../constants';
import { mockAPICall, renderWithProvider } from '../../testUtils';
import { Leaves } from '../Leaves';
import {
  allLeavesAPIResponse,
  defaultState,
  leaveBalanceAPIResponse
} from './fixtures';

jest.mock('../../api', () => ({
  getAllLeavesAPI: jest.fn(),
  getLeaveBalanceAPI: jest.fn()
}));

const LeaveBalanceResponse = {
  ok: true,
  body: leaveBalanceAPIResponse
};

const allLeavesResponse = {
  ok: true,
  body: allLeavesAPIResponse
};

describe('Leaves Page', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<Leaves />, {
      initialStoreState
    });

  beforeEach(() => {
    mockAPICall(getAllLeavesAPI, allLeavesResponse);
    mockAPICall(getLeaveBalanceAPI, LeaveBalanceResponse);
  });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });
});
