import React from "react";
import GradeList from "./GradeList"
import "./Class.css"

export default function Class(props) {
    const {id, name, grade, gradeList} = props.data
    return (
      <div>
        <h3>{name}</h3>
        <button onClick={() => props.addGrade(id)}>Add Grade</button>
          <GradeList
            classID={id} 
            gradeList={gradeList}
            deleteGrade={props.deleteGrade}
            handleChange={props.handleChange}
          />
        <p>Grade: {grade}</p>
      </div>
    )
}