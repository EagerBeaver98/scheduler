import React, {useState, useEffect} from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import useApplicationData from "../hooks/useApplicationData";

import "components/Application.scss";

import DayList from "./DayList";

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";

// const appointments = [];

// axios.get("http://localhost:8001/api/appointments")
// .then((data) => {
//   console.log(data.data);
// })

export default function Application(props) {
  const {
    state,
    setDay,
    setState,
    bookInterview,
    cancelInterview
  } = useApplicationData();

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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
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
        onDelete={cancelInterview}
      />
    );
  })

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
