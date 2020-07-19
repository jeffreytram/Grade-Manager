import React from "react";
import "./Grade.css"

export default function Grade(props) {
  const { name, score, id } = props.data
  return (
    <div>
      <input
        className="component-grade-input text"
        name="name"
        placeholder="Name"
        type="text"
        value={name}
        onChange={(event) => props.handleChange(event, props.sectionID, id)}
      />
      <input
        className="component-grade-input num"
        name="score"
        placeholder="Grade"
        type="number"
        value={score}
        onChange={(event) => props.handleChange(event, props.sectionID, id)}
      />
      <button className="component-delete-grade-btn" onClick={() => props.deleteGrade(props.sectionID, id)}>Delete</button>
    </div>
  )
}