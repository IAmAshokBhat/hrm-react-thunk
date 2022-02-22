import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import {
  fetchAllLeavesAction,
  fetchLeaveBalanceAction
} from '../redux/actions';
import {
  selectAllLeaves,
  selectLeaveBalance,
  selectLeaveCountsByMonth
} from '../redux/selectors';
import { getUserId } from '../utils';

export const Leaves = () => {
  const dispatch = useDispatch();
  const loggedInUser = getUserId();
  const holidayTaken = useSelector(selectLeaveCountsByMonth);
  const leaveData = useSelector(selectAllLeaves);
  const leaveBalance = useSelector(selectLeaveBalance);

  useEffect(() => {
    dispatch(fetchAllLeavesAction(loggedInUser));
    dispatch(fetchLeaveBalanceAction(loggedInUser));
  }, [dispatch, loggedInUser]);

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Card>
          <BarChart width={1500} height={350} data={holidayTaken} barSize={30}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="days" fill="#2976d2" />
          </BarChart>
        </Card>
      </Grid>
      <Grid item md={8}>
        <Card variant="outlined">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 490 }} aria-label="Leave details">
              <TableHead>
                <TableRow>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>No. Of Days</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveData.map(({ leaveType, from, to, status, noOfDays }) => (
                  <TableRow
                    key={from.toString()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {leaveType}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {noOfDays}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {from}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {to}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card variant="outlined">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 490 }}
              aria-label="Leave balance"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveBalance.map(({ leaveType, balance }) => (
                  <TableRow
                    key={leaveType}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {leaveType}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {balance}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  );
};
