import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  let interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  let imageClass = classnames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  })
  
  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer()}>
  <img
    className={imageClass}
    src={props.avatar}
    alt={props.name}
  />
  {props.name}
</li>
  );
};
