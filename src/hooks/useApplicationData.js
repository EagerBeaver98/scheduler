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

  const countInterviews = (appointments) => {
    let count = 0;
    for (let appointment of appointments) {
      if (state.appointments[appointment].interview) {
        count += 1;
      }
    }
    console.log("Count interviews", count)
    return count;
  }

  function setSpots() {
    const count = getAppointmentsForDay(state, state.day).
    length - countInterviews(getAppointmentsForDay(state, state.day));
    const updatedDays = state.days.map((day) => {
      if (day.name === state.day) {
        return day = {...day, spots: count}; 
      } else {
        return day;
      }
    })
    console.log(updatedDays)
    return updatedDays;
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
    axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: appointment.interview})
    .then(() => {
      setState({...state, appointments: {...appointments}});
      return;
    })
    .then(() => {
      setSpots()
      callback("SHOW");
      return;
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
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
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