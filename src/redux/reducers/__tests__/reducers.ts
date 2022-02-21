import { ACTIONS } from '../../../constants';
import { generateReducerTests } from '../../../testUtils';
import {
  selectDesignationListState,
  selectAddAttendanceState,
  selectRegisterState,
  selectUserInfoState,
  selectAllLeavesState,
  selectApplyLeaveState,
  selectLeaveBalanceState,
  selectMonthlyEventsState,
  selectUserListState,
  selectLoginDetailsState,
  selectLeaveCountsByMonthState
} from '../../selectors';
import { designationListReducer } from '../designationListReducer';
import { addAttendanceReducer } from '../addAttendanceReducer';
import { allLeavesReducer } from '../allLeavesReducer';
import { applyLeaveReducer } from '../applyLeaveReducer';
import { eventReducer } from '../eventReducer';
import { leaveBalanceReducer } from '../leaveBalanceReducer';
import { leaveCountByMonthReducer } from '../leaveCountByMonth';
import { loginReducer } from '../loginReducer';
import { registerReducer } from '../registerReducer';
import { userInfoReducer } from '../userInfoReducer';
import { userListReducer } from '../userListReducer';

describe('Reducer tests', () => {
  generateReducerTests(
    'designationList',
    designationListReducer,
    selectDesignationListState,
    ACTIONS.GET_DESIGNATION_LIST,
    [{ label: 'Test', value: 1 }]
  );

  generateReducerTests(
    'addAttendanceReducer',
    addAttendanceReducer,
    selectAddAttendanceState,
    ACTIONS.ADD_ATTENDANCE,
    null,
    null
  );

  generateReducerTests(
    'allLeavesReducer',
    allLeavesReducer,
    selectAllLeavesState,
    ACTIONS.GET_ALL_LEAVES,
    []
  );

  generateReducerTests(
    'applyLeaveReducer',
    applyLeaveReducer,
    selectApplyLeaveState,
    ACTIONS.APPLY_LEAVE,
    null,
    null
  );

  generateReducerTests(
    'eventReducer',
    eventReducer,
    selectMonthlyEventsState,
    ACTIONS.GET_EVENT_DETAILS,
    [],
    undefined,
    undefined,
    'evetDetails'
  );

  generateReducerTests(
    'leaveBalanceReducer',
    leaveBalanceReducer,
    selectLeaveBalanceState,
    ACTIONS.GET_LEAVE_BALANCE,
    []
  );

  generateReducerTests(
    'leaveCountByMonthReducer',
    leaveCountByMonthReducer,
    selectLeaveCountsByMonthState,
    ACTIONS.GET_ALL_LEAVES,
    [{ from_date: '2022-01-01', to_date: '2022-01-02' }],
    undefined,
    {
      Jan: 2,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0
    }
  );

  generateReducerTests(
    'loginReducer',
    loginReducer,
    selectLoginDetailsState,
    ACTIONS.GET_LOGIN,
    null,
    null,
    undefined,
    'loginDetails'
  );

  generateReducerTests(
    'registerReducer',
    registerReducer,
    selectRegisterState,
    ACTIONS.REGISTER,
    null,
    null,
    undefined,
    'registeration'
  );

  generateReducerTests(
    'userInfoReducer',
    userInfoReducer,
    selectUserInfoState,
    ACTIONS.GET_USER_DETAILS,
    null,
    null
  );

  generateReducerTests(
    'userListReducer',
    userListReducer,
    selectUserListState,
    ACTIONS.GET_USERS,
    [],
    []
  );
});
