import React from "react";
import Grade from "./Grade"
import "./GradeList.css"

export default function GradeList(props) {
    return (
      <div>
        <ul>
          {props.gradeList.map(grade => {
            return <Grade 
              classID={props.classID}
              data={grade}
              deleteGrade={props.deleteGrade}
              handleChange={props.handleChange}
              key={grade.id}
            />
          })}
        </ul>
      </div>
    )
}