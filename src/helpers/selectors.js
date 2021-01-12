const getAppointmentsForDay = (state, stateDay) => {
  const filteredInterviews = [];
  const singleDay = state.days.find((day) => day.name === stateDay)
  
  if (singleDay) {
    const singleDayAppointments = singleDay.appointments;
    const stateAppointments = Object.keys(state.appointments);
    for (let singleAppointment of singleDayAppointments) {
      filteredInterviews.push(stateAppointments.find((appointment) => appointment == singleAppointment));
    }
  }
  return filteredInterviews;
  
}

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    for (let key in state.interviewers) {
      if (state.interviewers[key].id === interview.interviewer) {
        return {student: interview.student, interviewer: {
          id: state.interviewers[key].id,
          name: state.interviewers[key].name,
          avatar: state.interviewers[key].avatar
        }};
      }
    }
  }

}

const getInterviewersForDay = (state, day) => {
  let foundDay = state.days.find((d) => {
    if (d.name === day) {
      return true;
    }
  })
  if (!foundDay) {
    return [];
  }
  return foundDay.interviewers.map((id) => state.interviewers[id])
}

const setNewAppointments = (id, state, interview) => {
  let appointment;
  if (interview) {
    appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  } else {
    appointment = {
      ...state.appointments[id],
      interview: null
    };
  }
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return [appointment, appointments];
}


export {getAppointmentsForDay, getInterview, getInterviewersForDay, setNewAppointments};