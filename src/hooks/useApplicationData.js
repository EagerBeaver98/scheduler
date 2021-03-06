import { useState, useEffect } from "react";
import axios from "axios";
import {getAppointmentsForDay, setNewAppointments} from "../helpers/selectors";

export default function useApplicationData () {
  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},})
  
  const [errorText, setError] = useState();

  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
    .then((all) => {
      setState({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
    })
  }, [])

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
    const newAppointments = setNewAppointments(id, state, interview)

    axios.put(`/api/appointments/${id}`, {interview: newAppointments[0].interview})
    .then(() => {
      setState({...state, appointments: newAppointments[1], days: setSpots(newAppointments[1])});
      callback("SHOW");
    })
    .catch((err) => {
      setError(`${err.response.status}: ${err.response.statusText}   Please try again.`);
      callback("ERROR_DELETE")
    })
  }
  function cancelInterview(id, callback) {
    const newAppointments = setNewAppointments(id, state)
    axios.delete(`/api/appointments/${id}`)
    .then (() => {
      setState({...state, appointments: {...newAppointments[1]}, days: setSpots(newAppointments[1])});
      callback("EMPTY");
    })
    .catch((err) => {
      setError(`${err.response.status}: ${err.response.statusText}   Please try again.`);
      callback("ERROR_DELETE");
    })

  }
  return {state, setDay, bookInterview, cancelInterview, setState, errorText};
}