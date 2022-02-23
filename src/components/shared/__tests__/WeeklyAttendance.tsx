import { getAttendanceDetailsAPI } from '../../../api';
import { TAnyObject } from '../../../constants';
import { mockAPICall, renderWithProvider } from '../../../testUtils';
import { WeeklyAttendance } from '../WeeklyAttendance';
import { attendanceDetailsAPI } from './__ignore_tests__/fixtures';
import { defaultState } from '../../__tests__/fixtures';

jest.mock('../../../api', () => ({
  getAttendanceDetailsAPI: jest.fn()
}));

const attendanceDetailsResponse = {
  ok: true,
  body: attendanceDetailsAPI
};

describe('Weekly Attendance component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<WeeklyAttendance />, {
      route: `/dashboard`,
      path: '/dashboard',
      initialStoreState
    });

  beforeEach(() => {
    mockAPICall(getAttendanceDetailsAPI, attendanceDetailsResponse);
  });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });
});
