import React from "react";
import "./Grade.css"

export default function Grade(props) {
    return (
      <div>
          <input placeholder="Name" 
            type="text">
          </input>
          <input placeholder="Weight" 
            type="number">
          </input>
          <input placeholder="Score" 
            type="number">
          </input>
          <button onClick={() => props.deleteGrade(props.classID, props.gradeID)}>Delete</button>
      </div>
    )
}