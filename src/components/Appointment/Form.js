import React, {useState} from "react";
import classnames from "classnames";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import Show from "./Show";
import Empty from "./Empty";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={() => setName(name)}
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewer={props.interviewer} interviewers={props.interviewers} value={props.interviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={props.onSave} confirm>Save</Button>
    </section>
  </section>
</main>
  );
}