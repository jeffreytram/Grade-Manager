import React from "react";
import GradeList from "./GradeList"
import "./Class.css"

export default function Section(props) {
  const { id, name} = props.data
  return (
    <div className="">
      <p>{name}</p>
      <button className="component-add-grade-btn" onClick={() => props.addGrade(id)}>Add Grade</button>
      <button onClick={() => props.deleteSection(id)}>Delete section</button>
      <GradeList
        data={props.data}
        deleteGrade={props.deleteGrade}
        handleChange={props.handleChange}
      />
    </div>
  )
}