import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addAttendanceAPI } from '../../api';
import { TAnyObject } from '../../contracts';
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

const addAttendanceFailedResponse = {
  ok: true,
  body: { data: [], message: 'Failed', status: 0 }
};

// TODO: Merge with Add Attendance TC
describe('Add Attendance Error case', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<AddAttendance open={true} onClose={mockOnClose} />, {
      initialStoreState
    });

  it('should show error if add attendance fails', async () => {
    mockAPICall(addAttendanceAPI, addAttendanceFailedResponse);
    const addAttendanceActionSpy = jest.spyOn(Actions, 'addAttendanceAction');
    generateNode();

    const dateField = screen.getByTestId('attendance-date-input');
    const inTimeField = screen.getByTestId('in-time-input');
    const outTimeField = screen.getByTestId('out-time-input');

    userEvent.clear(dateField);
    userEvent.type(dateField, '12/03/2022');

    await waitFor(() => userEvent.click(inTimeField));
    await waitFor(() => userEvent.click(screen.getByText(/6:00 AM/i)));

    await waitFor(() => userEvent.click(outTimeField));
    await waitFor(() => userEvent.click(screen.getByText(/8:30 AM/i)));

    expect(inTimeField).toHaveValue('6:00 AM');
    expect(outTimeField).toHaveValue('8:30 AM');

    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    );

    await waitFor(() =>
      expect(addAttendanceActionSpy).toHaveBeenCalledWith({
        date: '2022-12-03',
        inTime: ' 06:00:00',
        outTime: ' 08:30:00',
        userId: 5
      })
    );

    await waitFor(() =>
      expect(addAttendanceAPI).toHaveBeenCalledWith({
        date: '2022-12-03',
        inTime: ' 06:00:00',
        outTime: ' 08:30:00',
        userId: 5
      })
    );

    expect(mockEnqueue).toHaveBeenCalled();
  });
});
