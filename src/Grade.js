import React from "react";
import "./Grade.css"

export default function Grade(props) {
  const { name, weight, score, id } = props.data
  return (
    <div>
      <input
        className="component-input-text"
        name="name"
        placeholder="Name"
        type="text"
        value={name}
        onChange={(event) => props.handleChange(event, props.sectionID, id)}
      />
      <input
        className="component-input-num"
        name="weight"
        placeholder="Weight"
        type="number"
        value={weight}
        onChange={(event) => props.handleChange(event, props.sectionID, id)}
      />
      <input
        className="component-input-num"
        name="score"
        placeholder="Score"
        type="number"
        value={score}
        onChange={(event) => props.handleChange(event, props.sectionID, id)}
      />
      <button className="component-delete-btn" onClick={() => props.deleteGrade(props.sectionID, id)}>Delete</button>
    </div>
  )
}