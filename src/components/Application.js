import React, {useEffect} from "react";
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

export default function Application() {
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
      setState({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
    })
  }, [state.appointments])

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, state.appointments[appointment].interview);
    return (
      <Appointment
        key={state.appointments[appointment].id}
        id={state.appointments[appointment].id}
        time={state.appointments[appointment].time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        onDelete={cancelInterview}
      />
    );
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
        {<Appointment id="last" time="5pm" />}
      </section>
    </main>
  );
}
