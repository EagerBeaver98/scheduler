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
    console.log(newAppointments)
    console.log(state.appointments)
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
    console.log("revised appointments", appointments)
    axios.put(`/api/appointments/${id}`, {interview: appointment.interview})
    .then(() => {
      setState({...state, appointments: appointments});
      setSpots(appointments)
      callback("SHOW");
    })
    .catch(() => {
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
      setState({...state, appointments: {...appointments}});
      callback("EMPTY");
    })
    .catch(() => {
      callback("ERROR_DELETE");
    })

  }

  return {state, setDay, bookInterview, cancelInterview, setState};
}