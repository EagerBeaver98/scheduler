const getAppointmentsForDay = (state, stateDay) => {
  const filteredInterviews = [];
  const singleDay = state.days.find((day) => day.name === stateDay)
  
  if (singleDay) {
    const singleDayAppointments = singleDay.appointments;
    const stateAppointments = Object.keys(state.appointments);
    for (let singleAppointment of singleDayAppointments) {
      filteredInterviews.push(stateAppointments.find((appointment) => appointment == singleAppointment))
    }
  }
  return filteredInterviews;
  
}

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    // console.log("get interview state", state)
    for (let key in state.interviewers) {
      if (state.interviewers[key].id === interview.interviewer) {
        return {student: interview.student, interviewer: {
          id: state.interviewers[key].id,
          name: state.interviewers[key].name,
          avatar: state.interviewers[key].avatar
        }}
      }
    }
  }

}

const getInterviewersForDay = (state, interview) => {
  let filteredInterviews = getAppointmentsForDay(state, interview);
  if (filteredInterviews.length) {
    const returnInterviewers = [];
    const interviewerKeys = Object.keys(state.interviewers);
    for (let interviewer of filteredInterviews) {
      returnInterviewers.push(state.interviewers[interviewerKeys.find((interviewerKey) => interviewerKey == interviewer)])
      return returnInterviewers;
    }
  }
}
export {getAppointmentsForDay, getInterview, getInterviewersForDay};