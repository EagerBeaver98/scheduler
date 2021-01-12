import { useState } from "react";
import axios from "axios";
import {getAppointmentsForDay} from "../helpers/selectors";

export default function useApplicationData () {
  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},})

  const setDay = day => setState({...state, day});

  function setSpots(newAppointments) {
    const dayAppointments = getAppointmentsForDay(state, state.day);
    let spots = 5;
    for (const index of dayAppointments) {
      if (newAppointments[index].interview) {
        spots -= 1;
      }
    }
    const stateDays = [...state.days];
    const dayIndex = stateDays.findIndex(({ name } ) => name === state.day)
    stateDays[dayIndex].spots = spots;
    return stateDays;
  }

  function bookInterview(id, interview, callback) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.put(`/api/appointments/${id}`, {interview: appointment.interview})
    .then(() => {
      setState({...state, appointments: appointments, days: setSpots(appointments)});
      callback("SHOW");
    })
    .catch((err) => {
      console.log(err)
      callback("ERROR_SAVE")
    })
  }
  function cancelInterview(id, callback) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.delete(`/api/appointments/${id}`)
    .then (() => {
      setState({...state, appointments: {...appointments}, days: setSpots(appointments)});
      callback("EMPTY");
    })
    .catch(() => {
      callback("ERROR_DELETE");
    })

  }

  return {state, setDay, bookInterview, cancelInterview, setState};
}