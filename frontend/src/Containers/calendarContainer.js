import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import googleAPI from  "../utils/googleAPI"

const localizer = BigCalendar.momentLocalizer(moment)

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

export default class Calendar extends Component {
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
        style={{ height: "100vh" }} />
    </div>
}
