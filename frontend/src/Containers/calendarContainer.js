import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import googleAPI from  "../utils/calendar/googleAPI"
import { Button } from 'antd';

const localizer = BigCalendar.momentLocalizer(moment)

const calendar_configuration = {
    api_key: process.env.REACT_APP_GOOGLE_API_KEY,
    calendars: [
      {
        name: 'Mars College',
        url: process.env.REACT_APP_URL_MARS_CALENDAR
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
      .catch(err => { console.log(err)})
  }

  render = () =>
    <div>
      <BigCalendar
        localizer={localizer}
        events={this.state.events}
        defaultView="agenda"
        style={{ height: "75vh" }} 
        toolbar={false} />
    </div>
}

export class CalendarToolbar extends React.PureComponent {
  handleChange = (event) => {
    this.props.onView(event.target.value);
  };

  render() {
    const { view, views, onNavigate, label } = this.props;
    console.log(this.props);
    console.log()
    return (
      <Toolbar>
        <Typography variant="headline" style={{ textTransform: 'capitalize', width: '100%' }}>{label}</Typography>
        <div style={{ width: '100%', textAlign: 'right' }}>
          <IconButton onClick={() => onNavigate('PREV')}><Button /></IconButton>
          <IconButton><Button onClick={() => onNavigate('NEXT')} /></IconButton>
          <FormControl style={{ marginLeft: 16 }}>
            <Select
              value={view}
              onChange={this.handleChange}
            >
              {views.map((value) => <MenuItem value={value}> {value}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      </Toolbar>
    );
  }
}