import { Header } from './components/core/AppBar';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/core/Footer';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useState } from 'react';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { AddAttendance } from './components/AddAttendance';
import { ApplyLeave } from './components/ApplyLeave';
import { isValidToken } from './utils';

function App() {
  const [open, setOpen] = useState(false);
  const [openAttendanceDialog, setOpenAttendanceDialog] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleAddAttendance = () => setOpenAttendanceDialog(true);

  const handleApplyLeave = () => setOpenLeaveDialog(true);

  const actions = [
    {
      icon: <MoreTimeIcon />,
      name: 'Add Attendance',
      onAction: handleAddAttendance
    },
    {
      icon: <EventBusyIcon />,
      name: 'Apply Leave',
      onAction: handleApplyLeave
    }
  ];

  return (
    <div className="App">
      <Header />

      <body style={{ margin: ' 20px auto', maxWidth: '1536px' }}>
        <Outlet />
        {isValidToken() && (
          <>
            <SpeedDial
              ariaLabel="All Actions Of Leave Management System"
              sx={{ position: 'absolute', bottom: 35, right: 128 }}
              icon={<SpeedDialIcon />}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
            >
              {actions.map(({ name, icon, onAction }) => (
                <SpeedDialAction
                  key={name}
                  icon={icon}
                  tooltipTitle={name}
                  onClick={onAction}
                />
              ))}
            </SpeedDial>
            <AddAttendance
              open={openAttendanceDialog}
              onClose={() => setOpenAttendanceDialog(false)}
            />
            <ApplyLeave
              open={openLeaveDialog}
              onClose={() => setOpenLeaveDialog(false)}
            />
          </>
        )}
      </body>

      <Footer />
    </div>
  );
}

export default App;
