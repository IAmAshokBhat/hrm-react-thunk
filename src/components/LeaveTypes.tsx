import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILeaveBalance } from '../constants';
import { fetchLeaveBalanceAction } from '../redux/actions';
import { selectLeaveBalance } from '../redux/selectors';
import { getUserId } from '../utils';

export const LeaveTypes = () => {
  const dispatch = useDispatch();
  const leaveBalance: ILeaveBalance[] = useSelector(selectLeaveBalance);
  const loggedInUser = getUserId();

  useEffect(() => {
    dispatch(fetchLeaveBalanceAction(loggedInUser));
  }, [dispatch, loggedInUser]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Leave Type</TableCell>
            <TableCell align="right">Balance</TableCell>
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
  );
};
