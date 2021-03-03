import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import googleAPI from  "../utils/calendar/googleAPI"

const localizer = BigCalendar.momentLocalizer(moment)

const calendar_configuration = {
    api_key: process.env.REACT_APP_GOOGLE_API_KEY,
    calendars: [
      {
        name: 'Mars College', // whatever you want to name it
        url: process.env.REACT_APP_URL_MARS_CALENDAR // your calendar URL
      }
    ], 
    dailyRecurrence: 600, 
    weeklyRecurrence: 100,
    monthlyRecurrence: 100
}

export class CalendarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }
  
  componentDidMount = () => {
    if (calendar_configuration) {
      this.getGoogleCalendarEvents()
    } else {
      console.log("React Google Calendar requires you pass a configuration object")
    }
  }

  getGoogleCalendarEvents = () => {
    googleAPI.getAllCalendars(calendar_configuration)
      .then(events => {
        this.setState({ events })
      })
      .catch(err => { throw new Error(err) })
  }

  render = () =>
    <div>
      <BigCalendar
        localizer={localizer}
        events={this.state.events}
        defaultView="agenda"
        style={{ height: "75vh" }} 
        />
    </div>
}