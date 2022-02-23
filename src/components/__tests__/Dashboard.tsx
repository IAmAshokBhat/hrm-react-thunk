import {
  getUserListAPI,
  getUserDetailsAPI,
  getAttendanceDetailsAPI,
  getEventDetailsAPI
} from '../../api';
import { TAnyObject } from '../../constants';
import { mockAPICall, renderWithProvider } from '../../testUtils';
import { Dashboard } from '../Dashboard';
import {
  defaultState,
  userListAPIResponse,
  userInfoAPIResponse,
  attendanceDetailsAPIResponse
} from './fixtures';
import { evenDetailsAPI } from '../shared/__tests__/__ignore_tests__/fixtures';

jest.mock('../../api', () => ({
  getUserListAPI: jest.fn(),
  getUserDetailsAPI: jest.fn(),
  getAttendanceDetailsAPI: jest.fn(),
  getEventDetailsAPI: jest.fn()
}));

const userListResponse = {
  ok: true,
  body: userListAPIResponse
};

const userInfoResponse = {
  ok: true,
  body: userInfoAPIResponse
};
const attendanceDetailsResponse = {
  ok: true,
  body: attendanceDetailsAPIResponse
};

const eventDetailsResponse = {
  ok: true,
  body: evenDetailsAPI
};

describe('Dashboard page', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<Dashboard />, {
      route: `/dashboard`,
      path: '/dashboard',
      initialStoreState
    });

  beforeEach(() => {
    mockAPICall(getUserListAPI, userListResponse);
    mockAPICall(getUserDetailsAPI, userInfoResponse);
    mockAPICall(getAttendanceDetailsAPI, attendanceDetailsResponse);
    mockAPICall(getEventDetailsAPI, eventDetailsResponse);
  });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });
});
