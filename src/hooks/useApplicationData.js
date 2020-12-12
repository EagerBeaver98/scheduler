import { useState } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},})

  const setDay = day => setState({...state, day});

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
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then (() => {
      setState({...state, appointments: {...appointments}});
      callback("EMPTY");
    })
    .catch((err) => {
      callback("ERROR_DELETE");
    })

  }

  return {state, setDay, bookInterview, cancelInterview, setState};
}