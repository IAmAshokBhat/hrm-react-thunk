import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetailsAction } from '../redux/actions';
import { useEffect } from 'react';
import { selectUserInfo } from '../redux/selectors';
import { getUserId } from '../utils';

export const UserInfo = () => {
  const dispatch = useDispatch();
  const loggedInUser = getUserId();
  const userInfo = useSelector(selectUserInfo);

  let userDetails = {
    name: '',
    userId: -1,
    designation: '',
    manager: '',
    email: ''
  };

  if (userInfo) {
    const { name, userId, designation, manager, email } = userInfo;
    userDetails = {
      name,
      userId,
      designation,
      manager,
      email
    };
  }

  useEffect(() => {
    dispatch(fetchUserDetailsAction(loggedInUser));
  }, [dispatch, loggedInUser]);

  return (
    <Card style={{ padding: 15 }}>
      <Grid container>
        <Avatar
          alt={userDetails.name}
          sx={{ width: 156, height: 156, bgcolor: '#2976d2' }}
          style={{ left: 100 }}
        />
        <Grid item xs={12}>
          <Typography variant="h5">{userDetails.name}</Typography>
          <div>
            <Typography variant="subtitle1" component="span">
              {userDetails.designation}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" component="span" fontWeight={500}>
              Email:
            </Typography>
            <Typography variant="subtitle1" component="span">
              {userDetails.email}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" component="span" fontWeight={500}>
              Manager:
            </Typography>
            <Typography variant="subtitle1" component="span">
              {userDetails.manager}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" component="span" fontWeight={500}>
              Employee ID:
            </Typography>
            <Typography variant="subtitle1" component="span">
              {userDetails.userId}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};
