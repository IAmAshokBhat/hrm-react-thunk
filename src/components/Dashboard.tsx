import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsersAction } from '../redux/actions';
import { CalendarComponent } from './shared/CalendarComponent';
import { HolidayList } from './shared/HolidayList';
import { UserInfo } from './UserInfo';
import { WeeklyAttendance } from './shared/WeeklyAttendance';

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {/* Bar Chart  */}
      <Grid item xs={9}>
        <WeeklyAttendance />
      </Grid>
      {/* User Details  */}
      <Grid item xs={3} textAlign="center">
        <UserInfo />
      </Grid>
      {/* Calendar */}
      <Grid item xs={9}>
        <CalendarComponent />
      </Grid>
      {/* Holiday List  */}
      <Grid item xs={3}>
        <HolidayList />
      </Grid>
    </Grid>
  );
};
