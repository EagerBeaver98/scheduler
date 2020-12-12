import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const STATUS = "STATUS";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview, transition)
  }
  function remove() {
    transition(STATUS);
    props.onDelete(props.id, transition);
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
    {mode === SAVING && <Status />}
    {mode === STATUS && <Status />}
    {mode === CREATE && <Form interviewers={props.interviewers} name={props.student} onSave={save} onCancel={back}/>}
    {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} onCancel={back}/>}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === CONFIRM && <Confirm onConfirm={remove} message="Are you sure you want to delete?"/>}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={() => transition("CONFIRM")}
    onEdit={(() => transition("EDIT"))}
  />
)}
    </article>
  );
}