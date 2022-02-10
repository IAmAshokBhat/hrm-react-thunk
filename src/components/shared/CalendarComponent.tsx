import Card from '@mui/material/Card';
import { Calendar, EventPropGetter, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchEventDetailsAction } from '../../redux/actions';
import { DATE_FORMAT_CALENDAR, EventType, IEvent } from '../../constants';
import { selectLoginDetails, selectMonthlyEvents } from '../../redux/selectors';

export const CalendarComponent = () => {
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const startOfMonth = moment().startOf('month').format(DATE_FORMAT_CALENDAR);
  const endOfMonth = moment().endOf('month').format(DATE_FORMAT_CALENDAR);
  const loginDetails = useSelector(selectLoginDetails);

  useEffect(() => {
    dispatch(
      fetchEventDetailsAction(loginDetails.userId, startOfMonth, endOfMonth)
    );
  }, [dispatch, startOfMonth, endOfMonth, loginDetails]);

  const eventList = useSelector(selectMonthlyEvents);

  const eventStyleGenerator: EventPropGetter<IEvent> = (
    event,
    _start,
    _end,
    _isSelected
  ) => ({
    style: {
      background: event.title === EventType.LEAVE ? '#0b9102' : '#2976d2',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
  });

  return (
    <Card style={{ height: '367px' }}>
      {/* @ts-ignore */}
      <Calendar
        localizer={localizer}
        events={eventList}
        step={60}
        eventPropGetter={eventStyleGenerator}
      />
    </Card>
  );
};
