import React, {useState} from 'react'
import Calendar from 'react_google_calendar'

const calendar_configuration = {
    api_key: 'AIzaSyDLXd3SqI-pVmPdcfOE9I1_vCqQfXwP-4o',
    calendars: [
      {
        name: 'Mars College', // whatever you want to name it
        url: '01dbbn57set8ltg4pbl95f4d80@group.calendar.google.com' // your calendar URL
      }
    ],
    dailyRecurrence: 600,
    weeklyRecurrence: 100,
    monthlyRecurrence: 100
}

const CalendarComponent  = () => {
   const { events } = useState([])
   console.log('events', events)
    return (
        <Calendar
        events={events}
        config={calendar_configuration} />
    )
}

export default CalendarComponent;
