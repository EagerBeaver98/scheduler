const getAppointmentsForDay = (state, days) => {
  const filteredInterviews = [];
  for (let day of state.days) {
    if (day.name === days) {
      for (let dayAppointment of day.appointments) {
        for (let key in state.appointments) {
          if (dayAppointment === state.appointments[key].id) {
            filteredInterviews.push(state.appointments[key])
          }
        }
      }
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
        }}
      }
    }
  }

}

const getInterviewersForDay = (state, interview) => {
  let filteredInterviews = getAppointmentsForDay(state, interview);
  const returnInterviewers = [];
  for (let interview of filteredInterviews) {
    for (let key in state.interviewers) {
      if (interview.interview) {
        if (interview.interview.interviewer === state.interviewers[key].id) {
          returnInterviewers.push(state.interviewers[key]);
          for (let x = 0; returnInterviewers.length > 1 && x < returnInterviewers.length; x++) {
            if (returnInterviewers[x] === returnInterviewers[returnInterviewers.length - 1]) {
              returnInterviewers.pop();
            }
          }
        }
      }
    }
  }
  return returnInterviewers;
}

export {getAppointmentsForDay, getInterview, getInterviewersForDay};