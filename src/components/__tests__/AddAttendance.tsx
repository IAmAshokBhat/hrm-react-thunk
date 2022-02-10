import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';
import { addAttendanceAPI } from '../../api';
import { TAnyObject } from '../../constants';
import * as Actions from '../../redux/actions/addAttendanceAction';
import { mockAPICall, renderWithProvider } from '../../testUtils';
import { AddAttendance } from '../AddAttendance';
import { defaultState } from './fixtures';

const mockOnClose = jest.fn();

jest.mock('../../api', () => ({
  addAttendanceAPI: jest.fn()
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

const addAttendanceResponse = {
  ok: true,
  body: { data: [], message: 'success', status: 1 }
};

describe('Add Attendance component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<AddAttendance open={true} onClose={mockOnClose} />, {
      initialStoreState
    });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });

  it('should be able to add attendance', async () => {
    mockAPICall(addAttendanceAPI, addAttendanceResponse);
    const addAttendanceActionSpy = jest.spyOn(Actions, 'addAttendanceAction');
    generateNode();

    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    );

    await waitFor(() =>
      expect(addAttendanceActionSpy).toHaveBeenCalledWith({
        date: moment().format('YYYY-MM-DD'),
        inTime: ' 08:30:00',
        outTime: ' 17:30:00',
        userId: 5
      })
    );

    await waitFor(() =>
      expect(addAttendanceAPI).toHaveBeenCalledWith({
        date: moment().format('YYYY-MM-DD'),
        inTime: ' 08:30:00',
        outTime: ' 17:30:00',
        userId: 5
      })
    );
  });

  it('should be able to close attendance', () => {
    generateNode();

    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
