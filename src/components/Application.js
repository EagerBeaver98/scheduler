import React from "react";
import Appointment from "components/Appointment";
import useApplicationData from "../hooks/useApplicationData";

import "components/Application.scss";

import DayList from "./DayList";

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";


export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

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
