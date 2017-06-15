import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import CustomToolbar from './Toolbar';
import './styles.less';

BigCalendar.momentLocalizer(moment);

/**
 *
 * @param event Object
 * @param start Date
 * @param end Date
 * @param isSelected Boolean
 */
function eventPropGetter(event) {
  return {
    style: {
      backgroundColor: `#${event.color}`,
    }
  };
}


function Event({ event }) {
  return (
    <span>
      {event.title}
    </span>
  );
}

const Calendar = props => (
  <BigCalendar
    style={{ minHeight: 800 }}
    events={events}
    views={['month', 'week', 'agenda']}
    defaultDate={new Date(2017, 4, 1)}
    eventPropGetter={eventPropGetter}
    components={{
      event: Event,
      toolbar: CustomToolbar,
    }}
    {...props}
  />
);


export default Calendar;
