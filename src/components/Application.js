import React, {useState, useEffect} from "react";
import Appointment from "components/Appointment";
import axios from "axios";


import "components/Application.scss";

import DayList from "./DayList";

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";

// const appointments = [];

// axios.get("http://localhost:8001/api/appointments")
// .then((data) => {
//   console.log(data.data);
// })

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });
  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }));
  let dailyAppointments = [];

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ])
    .then((all) => {
      // setDays(all[0].data)
      setState({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
      console.log(all[1].data)
      
    })
  }, [])

  dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
      />
    );
  })


  function bookInterview(id, interview, callback) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: appointment.interview})
    .then(() => {
      setState({...state, appointments: {...appointments}});
      callback("SHOW");
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const interview = dailyAppointments.map((appointment) => {
    return getInterview(state, appointment.interview);
  })
  return (
    <main className="layout">
      <section className="sidebar">
        {<div>
          <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered"></hr>
  <nav className="sidebar__menu">{<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>}</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
</div>}
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
