# hrm-react-thunk
This is a HR management project
It is built using *React 17.0.2* , *Redux 4.1.2*,  *thunk 2.4.1* and *material UI 5.0*.  
It consumes data from one of my other project  developed using Node.js and MySQL

**Scripts Available:**
1) To install dependencies: **`yarn`**
2) To run the project: **`yarn start`**
3) To run unti test cases and get coverage report: **`yarn test:coverage`**

Test Coverage Report:

File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   98.27 |    79.08 |   96.51 |   98.38 |                   
 src                        |     100 |      100 |     100 |     100 |                   
  App.tsx                   |     100 |      100 |     100 |     100 |                   
  api.ts                    |     100 |      100 |     100 |     100 |                   
 src/components             |   99.33 |    78.84 |     100 |   99.33 |                   
  AddAttendance.tsx         |     100 |       75 |     100 |     100 | 51-54             
  ApplyLeave.tsx            |     100 |    84.61 |     100 |     100 | 65,80             
  Attendance.tsx            |     100 |      100 |     100 |     100 |                   
  Dashboard.tsx             |     100 |      100 |     100 |     100 |                   
  LeaveTypes.tsx            |     100 |      100 |     100 |     100 |                   
  Leaves.tsx                |     100 |      100 |     100 |     100 |                   
  Login.tsx                 |   94.11 |     62.5 |     100 |   94.11 | 40                
  RegistrationPage.tsx      |     100 |    88.23 |     100 |     100 | 49-65             
  UserInfo.tsx              |     100 |       50 |     100 |     100 | 24                
 src/components/core        |   81.81 |    77.77 |    62.5 |   84.37 |                   
  AppBar.tsx                |   78.57 |    81.25 |   57.14 |   81.48 | 31,34,46,102,128  
  Auth.tsx                  |     100 |       50 |     100 |     100 | 8                 
  Footer.tsx                |     100 |      100 |     100 |     100 |                   
 src/components/shared      |     100 |      100 |     100 |     100 |                   
  CalendarComponent.tsx     |     100 |      100 |     100 |     100 |                   
  HolidayList.tsx           |     100 |      100 |     100 |     100 |                   
  WeeklyAttendance.tsx      |     100 |      100 |     100 |     100 |                   
 src/redux                  |     100 |      100 |     100 |     100 |                   
  selectors.ts              |     100 |      100 |     100 |     100 |                   
 src/redux/actions          |     100 |      100 |     100 |     100 |                   
  addAttendanceAction.ts    |     100 |      100 |     100 |     100 |                   
  applyLeaveAction.ts       |     100 |      100 |     100 |     100 |                   
  attedanceDetailsAction.ts |     100 |      100 |     100 |     100 |                   
  designationListAction.ts  |     100 |      100 |     100 |     100 |                   
  eventDetailsAction.ts     |     100 |      100 |     100 |     100 |                   
  index.ts                  |       0 |        0 |       0 |       0 |                   
  leaveBalanceAction.ts     |     100 |      100 |     100 |     100 |                   
  loginAction.ts            |     100 |      100 |     100 |     100 |                   
  registerAction.ts         |     100 |      100 |     100 |     100 |                   
  userInfoAction.ts         |     100 |      100 |     100 |     100 |                   
  usersActions.ts           |     100 |      100 |     100 |     100 |                   
  utils.ts                  |     100 |      100 |     100 |     100 |                   
 src/redux/reducers         |   99.11 |    76.38 |     100 |   99.11 |                   
  addAttendanceReducer.ts   |     100 |       50 |     100 |     100 | 13                
  allLeavesReducer.ts       |     100 |       80 |     100 |     100 | 17,23             
  applyLeaveReducer.ts      |     100 |       50 |     100 |     100 | 13                
  attendanceReducer.ts      |   88.88 |     62.5 |     100 |   88.88 | 35                
  designationListReducer.ts |     100 |       50 |     100 |     100 | 13                
  eventReducer.ts           |     100 |     87.5 |     100 |     100 | 19                
  index.ts                  |     100 |      100 |     100 |     100 |                   
  leaveBalanceReducer.ts    |     100 |       75 |     100 |     100 | 16,23             
  leaveCountByMonth.ts      |     100 |    83.33 |     100 |     100 | 18,49             
  loginReducer.ts           |     100 |       50 |     100 |     100 | 13                
  registerReducer.ts        |     100 |       50 |     100 |     100 | 13                
  userInfoReducer.ts        |     100 |     87.5 |     100 |     100 | 11                
  userListReducer.ts        |     100 |       50 |     100 |     100 | 13                
  utils.ts                  |     100 |      100 |     100 |     100 |                   

