import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  TextField
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  DATE_FORMAT_CALENDAR,
  INewAttendance,
  NotificationType
} from '../constants';
import { addAttendanceAction } from '../redux/actions';
import { selectAddAttendance } from '../redux/selectors';
import { useSnackbar } from 'notistack';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const AddAttendance = ({ open, onClose }: IProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const today = new Date();
  const inTimeDefault = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    8,
    30
  );

  const [inTime, setInTime] = useState<Date | null>(inTimeDefault);
  const [outTime, setOutTime] = useState<Date | null>(
    moment(inTimeDefault).add(9, 'hours').toDate()
  );
  const [inputDate, setInputDate] = useState<Date | null>(today);

  const addAttendanceStatus = useSelector(selectAddAttendance);

  const isFormInvalid = !inTime && !outTime && !inputDate;

  const onSubmit = () => {
    if (inTime && outTime && inputDate) {
      const newAttendance: INewAttendance = {
        inTime: inTime.toLocaleString('en-GB').split(',')[1],
        outTime: outTime.toLocaleString('en-GB').split(',')[1],
        userId: 5,
        date: moment(inputDate).format(DATE_FORMAT_CALENDAR)
      };
      dispatch(addAttendanceAction(newAttendance));
    }
  };

  useEffect(() => {
    if (addAttendanceStatus.message) {
      enqueueSnackbar(addAttendanceStatus.message, {
        variant: addAttendanceStatus.status
          ? NotificationType.SUCCESS
          : NotificationType.ERROR
      });
    }
  }, [addAttendanceStatus, enqueueSnackbar]);

  return (
    <Dialog
      open={open}
      title="Add Attendance"
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      disableEscapeKeyDown={false}
    >
      <DialogTitle data-testid="heading-add-attendance">
        Add Attendance
      </DialogTitle>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Date</FormLabel>
                    <Field name="date" placeholder="Date">
                      {() => (
                        <DatePicker
                          selected={inputDate}
                          onChange={(date) => setInputDate(date)}
                          selectsStart
                          startDate={inputDate}
                          customInput={
                            <TextField
                              fullWidth
                              inputProps={{
                                'data-testid': 'attendance-date-input'
                              }}
                            />
                          }
                          withPortal
                        />
                      )}
                    </Field>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>In Time</FormLabel>
                    <Field name="inTime" placeholder="In Time">
                      {() => (
                        <DatePicker
                          selected={inTime}
                          onChange={(date) => {
                            setInTime(date);
                            setOutTime(moment(date).add(9, 'hours').toDate());
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          customInput={
                            <TextField
                              inputProps={{
                                'data-testid': 'in-time-input'
                              }}
                            />
                          }
                        />
                      )}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Out Time</FormLabel>
                    <Field name="outTime" placeholder="Out Time">
                      {() => (
                        <DatePicker
                          selected={outTime}
                          onChange={(date) => setOutTime(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          wrapperClassName="datePicker"
                          data-test=""
                          customInput={
                            <TextField
                              inputProps={{
                                'data-testid': 'out-time-input'
                              }}
                            />
                          }
                        />
                      )}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12} textAlign="right">
                  <Button
                    onClick={onClose}
                    variant="outlined"
                    style={{ marginRight: 15 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={onClose}
                    type="submit"
                    disabled={isFormInvalid}
                    variant="contained"
                    data-test="add_attendance_button"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        )}
      />
    </Dialog>
  );
};
