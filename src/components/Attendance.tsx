import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Grid } from '@mui/material';
import { CalendarComponent } from './shared/CalendarComponent';
import { WeeklyAttendance } from './shared/WeeklyAttendance';
import { useSelector } from 'react-redux';
import { selectWeeklyAttendance } from '../redux/selectors';

export const Attendance = () => {
  const weeklyAttendance = useSelector(selectWeeklyAttendance);

  return (
    <Grid container justifyContent="center" alignItems="center" rowSpacing={4}>
      <Grid item xs={8}>
        <WeeklyAttendance />
      </Grid>
      <Grid item md={4}>
        <Card variant="outlined">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 510 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>In Time</TableCell>
                  <TableCell>Out Time</TableCell>
                  <TableCell>No. Of Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weeklyAttendance.map(
                  ({ startTime, endTime, noOfHours, attendanceDate }) => (
                    <TableRow
                      key={attendanceDate}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {attendanceDate}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {startTime}
                      </TableCell>
                      <TableCell>{endTime}</TableCell>
                      <TableCell align="center">{noOfHours}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item md={12}>
        <CalendarComponent />
      </Grid>
    </Grid>
  );
};
