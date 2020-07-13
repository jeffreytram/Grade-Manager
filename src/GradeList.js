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
              deleteGrade={props.deleteGrade}
              gradeID={grade.id}
            />
          })}
        </ul>
      </div>
    )
}