import {
  Autocomplete,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
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
  ILeaveBalance,
  INewLeave,
  ISelectLeaveType,
  NotificationType
} from '../constants';
import { applyLeaveAction, fetchLeaveBalanceAction } from '../redux/actions';
import {
  selectApplyLeave,
  selectLeaveBalance,
  selectLoginDetails
} from '../redux/selectors';
import { useSnackbar } from 'notistack';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const ApplyLeave = ({ open, onClose }: IProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const today = new Date();
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  const dayAfter = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 2
  );
  const leaveBalance: ILeaveBalance[] = useSelector(selectLeaveBalance);
  const applyLeaveStatus = useSelector(selectApplyLeave);
  const loginDetails = useSelector(selectLoginDetails);

  const options: ISelectLeaveType[] = leaveBalance.map(
    ({ leaveType, leaveTypeId, balance }) => ({
      label: leaveType,
      value: leaveTypeId,
      balance
    })
  );

  const [startDate, setStartDate] = useState<Date | null>(tomorrow);
  const [endDate, setEndDate] = useState<Date | null>(dayAfter);
  const [selectedLeaveType, setLeaveType] = useState<ISelectLeaveType | null>(
    null
  );

  const onSubmit = async () => {
    if (selectedLeaveType) {
      const newLeave: INewLeave = {
        userId: 5,
        leaveTypeId: selectedLeaveType.value,
        fromDate: moment(startDate).format(DATE_FORMAT_CALENDAR),
        toDate: moment(endDate).format(DATE_FORMAT_CALENDAR)
      };
      dispatch(applyLeaveAction(newLeave));
    }
  };

  useEffect(() => {
    dispatch(fetchLeaveBalanceAction(loginDetails.userId));
    if (applyLeaveStatus.message) {
      enqueueSnackbar(applyLeaveStatus.message, {
        variant: applyLeaveStatus.status
          ? NotificationType.SUCCESS
          : NotificationType.ERROR
      });
    }
  }, [dispatch, applyLeaveStatus, enqueueSnackbar, loginDetails]);

  const isFormInvalid =
    !selectedLeaveType ||
    moment(endDate).isBefore(moment(startDate)) ||
    !selectedLeaveType.balance;
  return (
    <Dialog
      open={open}
      title="Apply Leave"
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      disableEscapeKeyDown={false}
    >
      <DialogTitle>Apply Leave</DialogTitle>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl sx={{ width: '100%' }}>
                      <FormLabel>From Date</FormLabel>
                      <Field name="fromDate" placeholder="Date" width="100%">
                        {(props) => (
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            withPortal
                            customInput={
                              <TextField
                                inputProps={{
                                  'data-testid': 'start-date-text'
                                }}
                              />
                            }
                          />
                        )}
                      </Field>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl sx={{ width: '100%' }}>
                      <FormLabel>To Date</FormLabel>
                      <Field name="toDate" placeholder="Date">
                        {(props) => (
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={moment(startDate).add(1, 'day').toDate()}
                            withPortal
                            customInput={
                              <TextField
                                inputProps={{
                                  'data-testid': 'end-date-text'
                                }}
                              />
                            }
                          />
                        )}
                      </Field>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Field name="category" placeholder="Category">
                      {(props) => (
                        <FormControl sx={{ width: '100%' }}>
                          {leaveBalance && (
                            <Autocomplete
                              id="leave-type"
                              value={selectedLeaveType}
                              options={options}
                              isOptionEqualToValue={(option, value) =>
                                option.value === value.value
                              }
                              onChange={(
                                _event,
                                newValue: ISelectLeaveType | null
                              ) => setLeaveType(newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Leave Type"
                                  variant="outlined"
                                />
                              )}
                            />
                          )}

                          {selectedLeaveType && (
                            <FormHelperText>
                              {`Balance: ${selectedLeaveType?.balance}`}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    </Field>
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
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
          </>
        )}
      />
    </Dialog>
  );
};
