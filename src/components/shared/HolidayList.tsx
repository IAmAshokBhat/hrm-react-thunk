import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const HolidayList = () => {
  const data = [
    {
      date: '01/01/2022',
      festivalName: 'New Years day'
    },
    {
      date: '14/01/2022',
      festivalName: 'Sankranthi'
    },
    {
      date: '26/01/2022',
      festivalName: 'Republic Day'
    },
    {
      date: '17/03/2022',
      festivalName: 'Holi'
    },
    {
      date: '15/04/2022',
      festivalName: 'Good Friday'
    },
    {
      date: '03/05/2022',
      festivalName: 'Khutba - E - Ramzan'
    },
    {
      date: '15/08/2022',
      festivalName: 'Independence Day'
    },
    {
      date: '31/08/2022',
      festivalName: 'Ganesha Festival'
    },
    {
      date: '05/10/2022',
      festivalName: 'Dasara / Vijayadashmi'
    }
  ];
  return (
    <TableContainer component={Paper} width="100%">
      <Table sx={{ minWidth: 340 }} aria-label="holiday table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Festival Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ festivalName, date }) => (
            <TableRow
              key={festivalName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {date}
              </TableCell>
              <TableCell component="th" scope="row">
                {festivalName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
