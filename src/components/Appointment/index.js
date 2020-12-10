import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  const interviewCheck = (interview) => {
    if (interview) {
      return <Show student={props.interview.student} interviewer={props.interview.interviewer} />
    } else {
      return <Empty />
    }
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
    {interviewCheck(props.interview)}
    </article>
  );
}