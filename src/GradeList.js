import React from "react";
import Grade from "./Grade"
import "./GradeList.css"

export default class GradeList extends React.Component {
  render(){
    return (
      <div>
        <ul>
          {this.props.gradeList.map(grade => {
            return <Grade 
              deleteGrade={this.props.deleteGrade}
              id={grade.id}
            />
          })}
        </ul>
      </div>
    )
  }
}