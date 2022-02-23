import {
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography
} from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ILoginData, NotificationType } from '../constants';
import { loginAction } from '../redux/actions';
import { selectLoginDetails } from '../redux/selectors';
import { isValidToken } from '../utils';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const loginDetails = useSelector(selectLoginDetails);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useLocation();

  const onSubmit = (values: ILoginData) => {
    dispatch(loginAction(values));
  };

  useEffect(() => {
    if (loginDetails && loginDetails.message) {
      enqueueSnackbar(loginDetails.message, {
        variant: NotificationType.ERROR
      });
    }

    if (isValidToken()) {
      // @ts-ignore
      navigate(state?.param || '/dashboard');
    }
  }, [loginDetails, enqueueSnackbar, state, navigate]);

  return (
    <Card style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Typography textAlign="center" variant="h4">
                  HR Management System
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }}>
                  <FormLabel>User ID</FormLabel>
                  <Field name="userId" width="100%">
                    {(props) => (
                      <TextField
                        name={props.input.name}
                        value={props.input.value}
                        onChange={props.input.onChange}
                        placeholder="User Id"
                      />
                    )}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }}>
                  <FormLabel>Password</FormLabel>
                  <Field name="password" width="100%">
                    {(props) => (
                      <TextField
                        name={props.input.name}
                        value={props.input.value}
                        onChange={props.input.onChange}
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button variant="contained" type="submit" fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Card>
  );
};
