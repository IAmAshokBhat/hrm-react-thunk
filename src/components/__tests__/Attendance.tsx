// import { screen, waitFor, within } from '@testing-library/react';
import { getAttendanceDetailsAPI, getEventDetailsAPI } from '../../api';
import { TAnyObject } from '../../constants';
import { mockAPICall, renderWithProvider } from '../../testUtils';
import { Attendance } from '../Attendance';
import { evenDetailsAPI } from '../shared/__tests__/__ignore_tests__/fixtures';
import { attendanceDetailsAPIResponse, defaultState } from './fixtures';

jest.mock('../../api', () => ({
  getAttendanceDetailsAPI: jest.fn(),
  getEventDetailsAPI: jest.fn()
}));

const attendanceDetailsResponse = {
  ok: true,
  body: attendanceDetailsAPIResponse
};

const eventDetailsResponse = {
  ok: true,
  body: evenDetailsAPI
};

describe('Attendance component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<Attendance />, {
      initialStoreState
    });

  beforeEach(() => {
    mockAPICall(getAttendanceDetailsAPI, attendanceDetailsResponse);
    mockAPICall(getEventDetailsAPI, eventDetailsResponse);
  });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });
});
