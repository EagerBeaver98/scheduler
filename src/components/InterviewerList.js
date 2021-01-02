import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  
  
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {props.interviewers.map((interviewer) => {
      console.log(interviewer)
      return (<InterviewerListItem setInterviewer={() => props.setInterviewer(interviewer.id)} name={interviewer.name} avatar={interviewer.avatar} selected={interviewer.id === props.interviewer}/>)
    })}
  </ul>
</section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};