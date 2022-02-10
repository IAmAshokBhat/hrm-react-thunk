import Card from '@mui/material/Card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { fetchAttendanceDetailsAction } from '../../redux/actions';
import moment from 'moment';
import { selectWeeklyAttendance } from '../../redux/selectors';

export const WeeklyAttendance = () => {
  const dispatch = useDispatch();

  const startOfWeek = moment().startOf('isoWeek').format('yyyy-MM-DD');
  const endOfWeek = moment().endOf('week').format('yyyy-MM-DD');

  useEffect(() => {
    dispatch(fetchAttendanceDetailsAction(5, startOfWeek, endOfWeek));
  }, [dispatch, startOfWeek, endOfWeek]);

  const weeklyAttendance = useSelector(selectWeeklyAttendance);

  return (
    <Card>
      <BarChart width={1000} height={350} data={weeklyAttendance} barSize={30}>
        <XAxis dataKey="attendanceDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="noOfHours" fill="#2976d2" />
      </BarChart>
    </Card>
  );
};
