import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  ILabelValue,
  IRegisterAPI,
  IRegistration,
  NotificationType
} from '../constants';
import {
  fetchDesignationListAction,
  fetchUsersAction,
  registerAction
} from '../redux/actions';
import {
  selectDesignationList,
  selectUserList,
  selectRegister
} from '../redux/selectors';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedDesignation, setDesignation] = useState<ILabelValue | null>(
    null
  );
  const [selectedManager, setManger] = useState<ILabelValue | null>(null);

  const designationList = useSelector(selectDesignationList);

  const mangerList = useSelector(selectUserList);

  const registrationResponse = useSelector(selectRegister);

  const onSubmit = (values: IRegistration) => {
    if (selectedManager && selectedDesignation) {
      const { name, password, email } = values;
      const newUser: IRegisterAPI = {
        name,
        password,
        email,
        manager: selectedManager.value,
        designation: selectedDesignation.value
      };
      dispatch(registerAction(newUser));
    }
  };

  useEffect(() => {
    dispatch(fetchDesignationListAction());
    dispatch(fetchUsersAction());
    if (registrationResponse.status) {
      if (registrationResponse.status === 200) {
        enqueueSnackbar('User added successfully!', {
          variant: NotificationType.SUCCESS
        });
        navigate('/login');
      } else {
        enqueueSnackbar(registrationResponse.message, {
          variant: NotificationType.ERROR
        });
      }
    }
  }, [dispatch, registrationResponse, enqueueSnackbar, navigate]);

  return (
    <Card style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values, dirtyFields }) => {
          const isPasswordNotMatching =
            values.password !== values.confirmPassword;
          const isFormValid =
            !isPasswordNotMatching &&
            selectedManager !== null &&
            selectedDesignation !== null;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography textAlign="center" variant="h4">
                    HR Management System
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: '100%' }}>
                    <Field name="name" width="100%">
                      {(props) => (
                        <TextField
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                          label="User Name"
                          variant="outlined"
                          placeholder="User Name"
                        />
                      )}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: '100%' }}>
                    <Field name="email" width="100%">
                      {(props) => (
                        <TextField
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                          label="Email"
                          placeholder="Email"
                          variant="outlined"
                        />
                      )}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: '100%' }}>
                    {designationList && (
                      <Autocomplete
                        id="leave-type"
                        value={selectedDesignation}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        options={designationList}
                        onChange={(_event, newValue: ILabelValue | null) =>
                          setDesignation(newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Designation"
                            variant="outlined"
                            placeholder="Designation"
                          />
                        )}
                      />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: '100%' }}>
                    {mangerList && (
                      <Autocomplete
                        id="manager"
                        value={selectedManager}
                        options={mangerList}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        onChange={(_event, newValue: ILabelValue | null) =>
                          setManger(newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Manager"
                            variant="outlined"
                            placeholder="Manager"
                          />
                        )}
                      />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: '100%' }}>
                    <Field name="password">
                      {(props) => (
                        <TextField
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                          fullWidth
                          label="Password"
                          variant="outlined"
                          type="password"
                          placeholder="Password"
                          inputProps={{ 'data-testid': 'password' }}
                        />
                      )}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: '100%' }}>
                    <Field name="confirmPassword">
                      {(props) => (
                        <TextField
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                          fullWidth
                          label="Confirm Password"
                          variant="outlined"
                          error={
                            dirtyFields.confirmPassword && isPasswordNotMatching
                          }
                          type="password"
                          placeholder="Confirm Password"
                        />
                      )}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12} textAlign="right">
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={!isFormValid}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      />
    </Card>
  );
};
