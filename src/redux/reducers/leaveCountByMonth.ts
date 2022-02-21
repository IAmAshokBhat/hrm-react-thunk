import moment from 'moment';
import {
  ACTIONS,
  defaultAction,
  IAllLeavesAction,
  IKeyValue,
  ILeaveCountByMonth
} from '../../constants';

const initialState = {
  loading: false,
  value: {},
  error: null
};

export const leaveCountByMonthReducer = (
  state = initialState,
  action: IAllLeavesAction = defaultAction
) => {
  switch (action.type) {
    case `${ACTIONS.GET_ALL_LEAVES}_LOADING`:
      return { ...state, loading: true };
    case `${ACTIONS.GET_ALL_LEAVES}_SUCCESS`:
      const leavesByMonth: IKeyValue = {
        Jan: 0,
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
      };
      action.payload?.forEach(({ from_date, to_date }) => {
        const fromDate = moment(from_date);
        const fromMonth = fromDate.get('month');
        const toMonth = moment(to_date).get('month');
        const fromMonthName = fromDate.format('MMM');
        const currentYear = fromDate.get('year');
        let diff = moment(to_date).diff(fromDate, 'days') + 1;

        // both from and to are in same month
        if (toMonth === fromMonth) {
          leavesByMonth[fromMonthName] += diff;
        } else if (toMonth > fromMonth) {
          // to date month is grater than from
          const endOfStartMonth = fromDate.endOf('month');
          const diffDaysStartMonth = fromDate.diff(endOfStartMonth, 'days') + 1;
          leavesByMonth[fromMonthName] += diffDaysStartMonth;

          diff -= diffDaysStartMonth;

          let nextMonthNumber = fromDate.get('month') + 2;

          while (diff) {
            const nextMonthLeadingZero = `0${nextMonthNumber}`.slice(-2);
            const currentMonthStartDate = moment(
              `${currentYear}-${nextMonthLeadingZero}-01`
            );
            const currentLastDay = currentMonthStartDate
              .endOf('month')
              .get('date');
            const currentMonthName = moment(currentMonthStartDate).format(
              'MMM'
            );
            if (diff > currentLastDay) {
              leavesByMonth[currentMonthName] = currentLastDay;
              nextMonthNumber += 1;
              diff -= currentLastDay;
            } else {
              leavesByMonth[currentMonthName] += diff;
              diff = 0;
            }
          }
        }
      });
      const value: ILeaveCountByMonth[] = Object.keys(leavesByMonth).map(
        (key) => ({ days: leavesByMonth[key], month: key })
      );
      return { ...state, loading: false, value };
    case `${ACTIONS.GET_ALL_LEAVES}_FAILURE`:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
